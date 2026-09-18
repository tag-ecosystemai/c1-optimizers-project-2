from concurrent.futures import ThreadPoolExecutor, as_completed

from ..schemas import ComparedArticle, CompareResponse, FailedArticle
from .entity_comparison import compare_entities
from .fetcher import fetch_article
from .newsapi_client import search_articles
from .pipeline_client import run_article_pipeline


class NoArticlesFoundError(Exception):
    """Raised when NewsAPI returns nothing for the topic, or nothing could be processed."""


def compute_tone(bias_ratio: float) -> str:
    if bias_ratio >= 0.5:
        return "Highly Opinionated"
    elif bias_ratio >= 0.25:
        return "Somewhat Opinionated"
    else:
        return "Mostly Neutral"


def top_category(article: ComparedArticle) -> str | None:
    counts = {}
    for s in article.bias_flags.sentences:
        for c in s.categories:
            counts[c] = counts.get(c, 0) + 1
    return max(counts, key=counts.get) if counts else None


def generate_divergences(articles: list[ComparedArticle]) -> list[dict]:
    divergences = []

    if len(articles) < 2:
        return divergences

    a, b = articles[0], articles[1]

    if a.tone != b.tone:
        divergences.append({
            "category": "Tone",
            "title": "Different overall tone",
            "sourceA": f"{a.source or 'This source'} reads as {a.tone.lower()} "
                       f"({round(a.bias_flags.bias_ratio * 100)}% of sentences flagged).",
            "sourceB": f"{b.source or 'This source'} reads as {b.tone.lower()} "
                       f"({round(b.bias_flags.bias_ratio * 100)}% of sentences flagged).",
        })

    top_a, top_b = top_category(a), top_category(b)
    if top_a and top_b and top_a != top_b:
        divergences.append({
            "category": "Emphasis",
            "title": "Different dominant language pattern",
            "sourceA": f"Most common pattern: {top_a}.",
            "sourceB": f"Most common pattern: {top_b}.",
        })

    return divergences


def _process_one(url: str, title_hint: str | None = None, source_hint: str | None = None,
                  published_hint: str | None = None) -> ComparedArticle:
    fetched = fetch_article(url)
    pipeline_result = run_article_pipeline(fetched.text)
    return ComparedArticle(
        title=title_hint or fetched.title,
        url=url,
        source=source_hint,
        published_at=published_hint or fetched.publish_date,
        summary=pipeline_result.summary,
        bias_flags=pipeline_result.bias_flags,
        entities=pipeline_result.entities,
        tone=compute_tone(pipeline_result.bias_flags.bias_ratio),
    )


def _run_concurrent(url_infos: list[dict]) -> tuple[list[ComparedArticle], list[FailedArticle]]:
    """url_infos: list of dicts with keys url, title, source, published_at (last three optional)."""
    articles: list[ComparedArticle] = []
    failed_articles: list[FailedArticle] = []

    with ThreadPoolExecutor(max_workers=len(url_infos)) as executor:
        futures = {
            executor.submit(
                _process_one, info["url"], info.get("title"), info.get("source"), info.get("published_at")
            ): info["url"]
            for info in url_infos
        }
        for future in as_completed(futures):
            url = futures[future]
            try:
                articles.append(future.result())
            except Exception as e:
                print(f"FAILED on {url}: {type(e).__name__}: {e}")
                failed_articles.append(FailedArticle(url=url, reason=str(e)))

    return articles, failed_articles


def compare_topic(topic: str, max_articles: int = 2) -> CompareResponse:
    search_results = search_articles(topic, page_size=max_articles)
    if not search_results:
        raise NoArticlesFoundError(f"No articles found for topic '{topic}'")

    url_infos = [
        {"url": r["url"], "title": r.get("title"), "source": r.get("source"), "published_at": r.get("published_at")}
        for r in search_results
    ]

    articles, failed_articles = _run_concurrent(url_infos)

    if not articles:
        raise NoArticlesFoundError(f"Could not process any articles for topic '{topic}'")

    entity_comparison = compare_entities([a.entities for a in articles])
    divergences = generate_divergences(articles)

    return CompareResponse(
        topic=topic,
        articles=articles,
        entity_comparison=entity_comparison,
        divergences=divergences,
        failed_articles=failed_articles,
    )


def compare_urls(url_a: str, url_b: str) -> CompareResponse:
    url_infos = [{"url": url_a}, {"url": url_b}]

    articles, failed_articles = _run_concurrent(url_infos)

    if not articles:
        raise NoArticlesFoundError("Could not process either article")

    entity_comparison = compare_entities([a.entities for a in articles])
    divergences = generate_divergences(articles)

    return CompareResponse(
        topic="Direct comparison",
        articles=articles,
        entity_comparison=entity_comparison,
        divergences=divergences,
        failed_articles=failed_articles,
    )
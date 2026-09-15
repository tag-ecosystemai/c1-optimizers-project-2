from ..schemas import ComparedArticle, CompareResponse
from .entity_comparison import compare_entities
from .fetcher import fetch_article
from .newsapi_client import search_articles
from .pipeline_client import run_article_pipeline


class NoArticlesFoundError(Exception):
    """Raised when NewsAPI returns nothing for the topic, or nothing could be processed."""


def compare_topic(topic: str, max_articles: int = 4) -> CompareResponse:
    search_results = search_articles(topic, page_size=max_articles)
    if not search_results:
        raise NoArticlesFoundError(f"No articles found for topic '{topic}'")

    articles: list[ComparedArticle] = []
    failed_articles: list[str] = []

    for result in search_results:
        url = result["url"]
        try:
            fetched = fetch_article(url)
            pipeline_result = run_article_pipeline(fetched.text)
        except Exception:
            # Fetching/pipeline failures are expected at this boundary (paywalls,
            # scraper-blocking sites, summarizer downtime) — skip that one
            # article rather than failing the whole comparison.
            failed_articles.append(url)
            continue

        articles.append(ComparedArticle(
            title=result.get("title") or fetched.title,
            url=url,
            source=result.get("source"),
            published_at=result.get("published_at"),
            summary=pipeline_result.summary,
            bias_flags=pipeline_result.bias_flags,
            entities=pipeline_result.entities,
        ))

    if not articles:
        raise NoArticlesFoundError(f"Could not process any articles for topic '{topic}'")

    entity_comparison = compare_entities([a.entities for a in articles])

    return CompareResponse(
        topic=topic,
        articles=articles,
        entity_comparison=entity_comparison,
        failed_articles=failed_articles,
    )

from datetime import datetime

from newspaper import Article
from newspaper.article import ArticleException

from ..schemas import FetchedArticle


class ArticleFetchError(Exception):
    """Raised when a URL can't be downloaded, parsed, or yields no article text."""


def fetch_article(url: str) -> FetchedArticle:
    article = Article(url)
    try:
        article.download()
        article.parse()
    except ArticleException as e:
        raise ArticleFetchError(f"Could not fetch article from {url}: {e}") from e

    if not article.text.strip():
        raise ArticleFetchError(f"No article text could be extracted from {url}")

    publish_date = article.publish_date
    return FetchedArticle(
        url=url,
        title=article.title or None,
        authors=list(article.authors),
        publish_date=publish_date.isoformat() if isinstance(publish_date, datetime) else None,
        text=article.text,
        top_image=article.top_image or None,
    )

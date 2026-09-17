# from datetime import datetime

# from newspaper import Article, Config
# from newspaper.article import ArticleException

import trafilatura
from ..schemas import FetchedArticle


class ArticleFetchError(Exception):
    """Raised when a URL can't be downloaded, parsed, or yields no article text."""


def fetch_article(url: str) -> FetchedArticle:
    downloaded = trafilatura.fetch_url(url)
    if downloaded is None:
        raise ArticleFetchError(f"Could not download content from {url}")

    text = trafilatura.extract(downloaded)
    if not text or not text.strip():
        raise ArticleFetchError(f"No article text could be extracted from {url}")

    metadata = trafilatura.extract_metadata(downloaded)

    return FetchedArticle(
        url=url,
        title=metadata.title if metadata and metadata.title else None,
        authors=[metadata.author] if metadata and metadata.author else [],
        publish_date=metadata.date if metadata and metadata.date else None,
        text=text,
        top_image=metadata.image if metadata and metadata.image else None,
    )
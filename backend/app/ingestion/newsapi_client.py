import os

import httpx

NEWSAPI_URL = "https://newsapi.org/v2/everything"


class NewsApiError(Exception):
    """Raised when NewsAPI is unreachable, unconfigured, or returns an error."""


def search_articles(topic: str, page_size: int = 4) -> list[dict]:
    api_key = os.environ.get("NEWSAPI_KEY")
    if not api_key:
        raise NewsApiError("NEWSAPI_KEY is not configured")

    # NewsAPI's pageSize parameter behaves unreliably at small values
    # (e.g. pageSize=2 sometimes returns only 1 result even when far more
    # exist) — request a safely larger batch and truncate ourselves.
    request_size = max(page_size, 5)

    try:
        response = httpx.get(
            NEWSAPI_URL,
            params={
                "q": topic,
                "pageSize": request_size,
                "sortBy": "relevancy",
                "language": "en",
                "apiKey": api_key,
            },
            timeout=15.0,
        )
        response.raise_for_status()
    except httpx.HTTPError as e:
        raise NewsApiError(f"NewsAPI request failed: {e}") from e

    payload = response.json()
    results = [
        {
            "title": a.get("title"),
            "url": a.get("url"),
            "source": (a.get("source") or {}).get("name"),
            "published_at": a.get("publishedAt"),
        }
        for a in payload.get("articles", [])
        if a.get("url")
    ]

    return results[:page_size]
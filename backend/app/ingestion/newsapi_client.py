import os

import httpx

NEWSAPI_URL = "https://newsapi.org/v2/everything"


class NewsApiError(Exception):
    """Raised when NewsAPI is unreachable, unconfigured, or returns an error."""


def search_articles(topic: str, page_size: int = 4) -> list[dict]:
    api_key = os.environ.get("NEWSAPI_KEY")
    if not api_key:
        raise NewsApiError("NEWSAPI_KEY is not configured")

    try:
        response = httpx.get(
            NEWSAPI_URL,
            params={
                "q": topic,
                "pageSize": page_size,
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
    return [
        {
            "title": a.get("title"),
            "url": a.get("url"),
            "source": (a.get("source") or {}).get("name"),
            "published_at": a.get("publishedAt"),
        }
        for a in payload.get("articles", [])
        if a.get("url")
    ]

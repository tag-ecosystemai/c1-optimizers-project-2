from fastapi import APIRouter, HTTPException

from ..schemas import FetchRequest, FetchedArticle
from ..ingestion.fetcher import fetch_article, ArticleFetchError

router = APIRouter()


@router.post("/fetch", response_model=FetchedArticle)
def fetch_article_endpoint(request: FetchRequest):
    try:
        return fetch_article(request.url)
    except ArticleFetchError as e:
        raise HTTPException(status_code=422, detail=str(e))

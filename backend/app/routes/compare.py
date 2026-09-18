from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..schemas import CompareResponse
from ..ingestion.compare_service import compare_topic, compare_urls, NoArticlesFoundError

router = APIRouter()


class CompareUrlsRequest(BaseModel):
    url_a: str
    url_b: str


@router.get("/compare", response_model=CompareResponse)
def compare_endpoint(topic: str, max_articles: int = 2):
    try:
        return compare_topic(topic, max_articles=max_articles)
    except NoArticlesFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/compare/urls", response_model=CompareResponse)
def compare_urls_endpoint(request: CompareUrlsRequest):
    try:
        return compare_urls(request.url_a, request.url_b)
    except NoArticlesFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
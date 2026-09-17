from fastapi import APIRouter, HTTPException, Query
from ..schemas import CompareResponse
from ..ingestion.compare_service import compare_topic, NoArticlesFoundError

router = APIRouter()


@router.get("/compare", response_model=CompareResponse)
def compare_endpoint(
    topic: str,
    max_articles: int = Query(default=2, ge=1, le=2)
):
    try:
        return compare_topic(topic, max_articles=max_articles)
    except NoArticlesFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
from fastapi import APIRouter, HTTPException

from ..ingestion.compare_service import NoArticlesFoundError, compare_topic
from ..ingestion.newsapi_client import NewsApiError
from ..schemas import CompareRequest, CompareResponse

router = APIRouter()


@router.post("/compare", response_model=CompareResponse)
def compare_articles(request: CompareRequest):
    try:
        return compare_topic(request.topic, max_articles=request.max_articles)
    except NewsApiError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except NoArticlesFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

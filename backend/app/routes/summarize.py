import os
import httpx
from fastapi import APIRouter, HTTPException
from ..schemas import ArticleRequest, SummarizeResponse
from ..bias_pipeline.summarizer import check_summary_consistency, DISCLAIMER_BASE

router = APIRouter()

MODAL_SUMMARIZE_URL = os.environ.get("MODAL_SUMMARIZE_URL")

@router.post("/summarize", response_model=SummarizeResponse)
def summarize_article(request: ArticleRequest):
    try:
        response = httpx.post(
            MODAL_SUMMARIZE_URL,
            json={"article_text": request.text},
            timeout=180.0,
            follow_redirects=True
        )
        response.raise_for_status()
        summary = response.json()["summary"]
    except (httpx.HTTPError, KeyError) as e:
        raise HTTPException(status_code=502, detail=f"Summarization service unavailable: {e}")

    consistency = check_summary_consistency(request.text, summary)
    disclaimer = DISCLAIMER_BASE
    if consistency["flag"]:
        disclaimer += (
            f" Note: the following names/entities in this summary could not be verified "
            f"against the source article: {', '.join(consistency['unverified_entities'])}."
        )

    return SummarizeResponse(
        summary=summary,
        disclaimer=disclaimer,
        flagged=consistency["flag"],
        unverified_entities=consistency["unverified_entities"]
    )
# Reuses Part 1's actual route handlers directly rather than re-implementing
# their logic here — they're plain functions under the FastAPI decorator, so
# calling them in-process works the same as hitting /analyze and /summarize.
from ..routes.analyze_bias import analyze_article
from ..routes.summarize import summarize_article
from ..schemas import ArticlePipelineResult, ArticleRequest, Entity


def _mock_entities(text: str) -> list[Entity]:
    """STUB pending Part 1: AnalyzeResponse has no entities field yet — see the
    note on ArticlePipelineResult in schemas.py. Replace this with the real
    field (e.g. `bias_flags.entities`) once Hannah/Victor add NER extraction
    to /analyze.
    """
    return []


def run_article_pipeline(text: str) -> ArticlePipelineResult:
    """Runs Part 1's per-article pipeline (bias flags + neutral summary) and
    attaches entities (currently mocked, see _mock_entities)."""
    request = ArticleRequest(text=text)
    bias_flags = analyze_article(request)
    summary_result = summarize_article(request)

    return ArticlePipelineResult(
        summary=summary_result.summary,
        bias_flags=bias_flags,
        entities=_mock_entities(text),
    )

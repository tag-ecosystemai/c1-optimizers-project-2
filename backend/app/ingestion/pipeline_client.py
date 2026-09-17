from ..routes.analyze_bias import analyze_article
from ..routes.summarize import summarize_article
from ..bias_pipeline.categories import nlp
from ..schemas import ArticlePipelineResult, ArticleRequest, Entity

RELEVANT_ENTITY_LABELS = {"PERSON", "ORG", "GPE", "NORP"}


def extract_entities(text: str) -> list[Entity]:
    doc = nlp(text)
    seen = set()
    entities = []
    for ent in doc.ents:
        if ent.label_ not in RELEVANT_ENTITY_LABELS:
            continue
        key = (ent.text.strip().lower(), ent.label_)
        if key in seen:
            continue
        seen.add(key)
        entities.append(Entity(text=ent.text.strip(), label=ent.label_))
    return entities


def run_article_pipeline(text: str) -> ArticlePipelineResult:
    """Runs Part 1's per-article pipeline (bias flags + neutral summary) and
    attaches real entities extracted via spaCy NER."""
    request = ArticleRequest(text=text)
    bias_flags = analyze_article(request)
    summary_result = summarize_article(request)

    return ArticlePipelineResult(
        summary=summary_result.summary,
        bias_flags=bias_flags,
        entities=extract_entities(text),
    )
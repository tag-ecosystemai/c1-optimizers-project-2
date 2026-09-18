from pydantic import BaseModel, Field


class ArticleRequest(BaseModel):
    text: str


class SentenceAnalysis(BaseModel):
    text: str
    is_biased: bool
    confidence: float
    categories: list[str]
    explanations: list[str]


class AnalyzeResponse(BaseModel):
    sentences: list[SentenceAnalysis]
    bias_ratio: float  # fraction of sentences flagged biased


class SummarizeResponse(BaseModel):
    summary: str
    disclaimer: str
    flagged: bool
    unverified_entities: list[str]


# --- Part 2: fetching & comparison ---

class FetchRequest(BaseModel):
    url: str


class FetchedArticle(BaseModel):
    url: str
    title: str | None = None
    authors: list[str] = []
    publish_date: str | None = None  # ISO 8601, if newspaper3k could parse one
    text: str
    top_image: str | None = None


class Entity(BaseModel):
    text: str
    label: str  # spaCy entity label, e.g. PERSON, ORG, GPE


class ArticlePipelineResult(BaseModel):
    """Part 1's per-article output, as agreed with Hannah/Victor: {summary, bias_flags, entities}.

    `entities` is currently mocked — see ingestion/pipeline_client.py — because
    AnalyzeResponse doesn't carry one yet. Swap the mock out once Part 1 adds it.
    """
    summary: str
    bias_flags: AnalyzeResponse
    entities: list[Entity]


class ComparedArticle(BaseModel):
    title: str | None = None
    url: str
    source: str | None = None
    published_at: str | None = None
    summary: str
    bias_flags: AnalyzeResponse
    entities: list[Entity]


class EntityComparisonItem(BaseModel):
    text: str
    label: str
    article_indices: list[int]  # indices into CompareResponse.articles
    mentioned_in_count: int


class EntityComparison(BaseModel):
    shared: list[EntityComparisonItem]     # mentioned in every successfully processed article
    divergent: list[EntityComparisonItem]  # mentioned in only some of them


class CompareRequest(BaseModel):
    topic: str = Field(min_length=1)
    max_articles: int = Field(default=2, ge=1, le=2)

class ComparedArticle(BaseModel):
    title: str | None = None
    url: str
    source: str | None = None
    published_at: str | None = None
    summary: str
    bias_flags: AnalyzeResponse
    entities: list[Entity]
    tone: str  # new

class FailedArticle(BaseModel):
    url: str
    reason: str


class CompareResponse(BaseModel):
    topic: str
    articles: list[ComparedArticle]
    entity_comparison: EntityComparison
    divergences: list[dict] = []
    failed_articles: list[FailedArticle] = []
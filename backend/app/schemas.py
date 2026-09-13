from pydantic import BaseModel


class ArticleRequest(BaseModel):
    text: str


class CompareRequest(BaseModel):
    text_a: str
    text_b: str


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
from fastapi import APIRouter
from ..schemas import ArticleRequest, AnalyzeResponse, SentenceAnalysis
from ..bias_pipeline.sentence_split import split_sentences
from ..bias_pipeline.mpqa_features import get_mpqa_features
from ..bias_pipeline.classifier import predict_bias
from ..bias_pipeline.categories import assign_categories
from ..bias_pipeline.explanations import generate_explanation

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_article(request: ArticleRequest):
    sentences = split_sentences(request.text)
    results = []
    biased_count = 0

    for sentence in sentences:
        mpqa_feats = get_mpqa_features(sentence)
        prediction = predict_bias(sentence, mpqa_feats)

        categories, explanations = [], []
        if prediction["is_biased"]:
            biased_count += 1
            category_map = assign_categories(sentence)
            for cat_name, evidence in category_map.items():
                categories.append(cat_name)
                explanations.append(generate_explanation(cat_name, evidence))

        results.append(SentenceAnalysis(
            text=sentence,
            is_biased=prediction["is_biased"],
            confidence=prediction["confidence"],
            categories=categories,
            explanations=explanations
        ))

    bias_ratio = biased_count / len(sentences) if sentences else 0.0

    return AnalyzeResponse(sentences=results, bias_ratio=bias_ratio)
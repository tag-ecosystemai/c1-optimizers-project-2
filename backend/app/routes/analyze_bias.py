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

        # Run rules independently, regardless of what the classifier says
        category_map = assign_categories(sentence)

        # Drop the catch-all if it's the ONLY thing found and the classifier
        # also disagrees — avoids labeling every neutral sentence as
        # "General Subjective Language" just because rules always return something
        rule_found_specific_category = any(
            cat != "General Subjective Language" for cat in category_map
        )

        is_biased = prediction["is_biased"] or rule_found_specific_category

        categories, explanations = [], []
        if is_biased:
            biased_count += 1
            # if classifier says biased but rules found nothing specific,
            # fall back to the catch-all explanation
            if not category_map or (not rule_found_specific_category and not prediction["is_biased"]):
                pass  # sentence isn't actually biased by either signal, skip
            else:
                effective_categories = category_map if rule_found_specific_category else {
                    "General Subjective Language": []
                }
                for cat_name, evidence in effective_categories.items():
                    categories.append(cat_name)
                    explanations.append(generate_explanation(cat_name, evidence))

        results.append(SentenceAnalysis(
            text=sentence,
            is_biased=is_biased,
            confidence=prediction["confidence"],
            categories=categories,
            explanations=explanations
        ))

    bias_ratio = biased_count / len(sentences) if sentences else 0.0

    return AnalyzeResponse(sentences=results, bias_ratio=bias_ratio)
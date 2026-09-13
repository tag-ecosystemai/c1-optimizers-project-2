from collections import Counter
from fastapi import APIRouter
from ..schemas import CompareRequest, ArticleRequest
from .analyze_bias import analyze_article

router = APIRouter()


def category_breakdown(sentence_results) -> dict[str, int]:
    counts = Counter()
    for s in sentence_results:
        for cat in s.categories:
            counts[cat] += 1
    return dict(counts)


@router.post("/compare")
def compare_articles(request: CompareRequest):
    result_a = analyze_article(ArticleRequest(text=request.text_a))
    result_b = analyze_article(ArticleRequest(text=request.text_b))

    categories_a = category_breakdown(result_a.sentences)
    categories_b = category_breakdown(result_b.sentences)

    if result_a.bias_ratio > result_b.bias_ratio:
        more_biased = "article_a"
    elif result_b.bias_ratio > result_a.bias_ratio:
        more_biased = "article_b"
    else:
        more_biased = "equal"

    all_categories = set(categories_a) | set(categories_b)
    category_comparison = {
        cat: {
            "article_a": categories_a.get(cat, 0),
            "article_b": categories_b.get(cat, 0),
        }
        for cat in sorted(all_categories)
    }

    return {
        "article_a": {
            "sentences": result_a.sentences,
            "bias_ratio": round(result_a.bias_ratio, 3),
            "total_sentences": len(result_a.sentences),
            "biased_sentence_count": sum(1 for s in result_a.sentences if s.is_biased),
        },
        "article_b": {
            "sentences": result_b.sentences,
            "bias_ratio": round(result_b.bias_ratio, 3),
            "total_sentences": len(result_b.sentences),
            "biased_sentence_count": sum(1 for s in result_b.sentences if s.is_biased),
        },
        "bias_ratio_diff": round(abs(result_a.bias_ratio - result_b.bias_ratio), 3),
        "more_biased": more_biased,
        "category_comparison": category_comparison,
    }
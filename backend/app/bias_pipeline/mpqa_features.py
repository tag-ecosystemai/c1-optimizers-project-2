import re
import pickle
from pathlib import Path

MODEL_DIR = Path(__file__).resolve().parents[3] / "models"

with open(MODEL_DIR / "mpqa_lexicon.pkl", "rb") as f:
    MPQA_LEXICON = pickle.load(f)


def get_mpqa_features(text: str) -> dict:
    words = re.findall(r"[a-zA-Z']+", text.lower())
    total = len(words) if words else 1

    strongsubj = sum(1 for w in words if MPQA_LEXICON.get(w, (None, None))[0] == 'strongsubj')
    weaksubj = sum(1 for w in words if MPQA_LEXICON.get(w, (None, None))[0] == 'weaksubj')
    negative = sum(1 for w in words if MPQA_LEXICON.get(w, (None, None))[1] == 'negative')
    positive = sum(1 for w in words if MPQA_LEXICON.get(w, (None, None))[1] == 'positive')

    return {
        'strongsubj_ratio': strongsubj / total,
        'weaksubj_ratio': weaksubj / total,
        'negative_ratio': negative / total,
        'positive_ratio': positive / total,
        'subj_word_count': strongsubj + weaksubj,
    }
import pickle
from pathlib import Path
from scipy.sparse import hstack, csr_matrix

MODEL_DIR = Path(__file__).resolve().parents[3] / "models"

with open(MODEL_DIR / "bias_classifier.pkl", "rb") as f:
    _clf = pickle.load(f)

with open(MODEL_DIR / "tfidf_vectorizer.pkl", "rb") as f:
    _vectorizer = pickle.load(f)


def predict_bias(sentence: str, mpqa_features: dict) -> dict:
    """
    Predict whether a sentence is biased.
    mpqa_features must be a dict with keys:
    strongsubj_ratio, weaksubj_ratio, negative_ratio, positive_ratio, subj_word_count
    (see mpqa_features.py for how to generate this)
    """
    tfidf_vec = _vectorizer.transform([sentence])
    feature_order = ['strongsubj_ratio', 'weaksubj_ratio', 'negative_ratio', 'positive_ratio', 'subj_word_count']
    mpqa_vec = csr_matrix([[mpqa_features[k] for k in feature_order]])

    combined = hstack([tfidf_vec, mpqa_vec])
    label = int(_clf.predict(combined)[0])
    confidence = float(_clf.predict_proba(combined)[0][label])

    return {
        "is_biased": bool(label),
        "confidence": confidence
    }
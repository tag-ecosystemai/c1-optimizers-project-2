import spacy
from .mpqa_features import MPQA_LEXICON

nlp = spacy.load("en_core_web_sm")

HEDGE_WORDS = {"may", "might", "could", "possibly", "reportedly", "allegedly", "seemingly", "apparently"}
CERTAINTY_WORDS = {"definitely", "certainly", "undoubtedly", "clearly", "obviously", "always", "never"}
REPORTING_VERBS = {"say", "said", "claim", "claimed", "argue", "argued", "believe", "believed"}

DEHUMANISING_WORDS = {
    "wasteland", "infestation", "flood", "swarm", "invasion", "plague",
    "vermin", "cockroaches", "cancer", "disease", "barren", "dictator",
    "regime", "thugs", "mob"
}
GLORIFYING_WORDS = {
    "hero", "heroic", "champion", "savior", "visionary", "trailblazer",
    "legend", "icon", "crusader", "warrior"
}

SELECTIVE_EMPHASIS_SIGNALS = {
    "every", "all", "none", "only", "solely", "entirely", "completely",
    "underscores", "reaffirms"
}
SELECTIVE_EMPHASIS_PHRASES = {"the fact that", "proves that"}

import re


def classify_categories(text: str) -> list[tuple[str, list[str]]]:
    doc = nlp(text)
    words_lower = [t.text.lower() for t in doc]
    categories = []

    strong_hits = []
    for t in doc:
        if t.pos_ == "PROPN":
            continue
        entry = MPQA_LEXICON.get(t.text.lower(), (None, None))
        if entry[0] == 'strongsubj':
            strong_hits.append(t.text)
    strong_hits = list(dict.fromkeys(strong_hits))
    if len(strong_hits) >= 2:
        categories.append(('Emotional Amplification', strong_hits))

    for tok in doc:
        if tok.lemma_.lower() in REPORTING_VERBS:
            window_start = max(0, tok.i - 3)
            nearby_ents = [e for e in doc.ents if e.label_ in ("PERSON", "ORG") and window_start <= e.start < tok.i]
            if not nearby_ents:
                categories.append(('Weasel Attribution', [tok.text]))
                break

    hedges_found = [w for w in words_lower if w in HEDGE_WORDS]
    certainty_found = [w for w in words_lower if w in CERTAINTY_WORDS]
    if hedges_found or certainty_found:
        categories.append(('Certainty Distortion', hedges_found + certainty_found))

    if any(tok.dep_ in ("nsubjpass", "auxpass") for tok in doc):
        categories.append(('Implicit Judgment', ['passive construction']))

    return categories


def check_dehumanising_glorifying(text: str) -> tuple[bool, list[str]]:
    words_lower = [t.lower() for t in text.split()]
    dehuman_hits = [w for w in words_lower if w.strip('.,!?"\'') in DEHUMANISING_WORDS]
    glorify_hits = [w for w in words_lower if w.strip('.,!?"\'') in GLORIFYING_WORDS]
    if dehuman_hits or glorify_hits:
        return True, dehuman_hits + glorify_hits
    return False, []


def check_selective_emphasis(text: str) -> tuple[bool, list[str]]:
    text_lower = text.lower()
    hits = [w for w in SELECTIVE_EMPHASIS_SIGNALS if re.search(r'\b' + re.escape(w) + r'\b', text_lower)]
    hits += [p for p in SELECTIVE_EMPHASIS_PHRASES if p in text_lower]
    return (len(hits) > 0), hits


def assign_categories(text: str) -> dict[str, list[str]]:
    categories = {}

    for cat_name, evidence in classify_categories(text):
        categories[cat_name] = evidence

    dehuman_flag, dehuman_evidence = check_dehumanising_glorifying(text)
    if dehuman_flag:
        categories['Dehumanising/Glorifying Framing'] = dehuman_evidence

    selective_flag, selective_evidence = check_selective_emphasis(text)
    if selective_flag:
        categories['Selective Emphasis'] = selective_evidence

    if not categories:
        categories['General Subjective Language'] = []

    return categories
from .categories import nlp  # reuse the same loaded spaCy model, avoid loading it twice

DISCLAIMER_BASE = "⚠️ Summaries are AI-generated and may contain errors. Please verify important facts against the original article."


def get_target_length(text: str) -> str:
    word_count = len(text.split())
    if word_count < 300:
        return "2-3 sentences (one short paragraph)"
    elif word_count < 800:
        return "1-2 paragraphs"
    else:
        return "2-3 paragraphs"


def summarize_article(text: str, llm, max_chars: int = 6000) -> str:
    truncated = text[:max_chars]
    target_length = get_target_length(text)

    system_prompt = (
        f"You are a neutral news summarizer. Summarize the article in {target_length}, "
        "focusing on the key facts. Do not add opinions, editorializing, or loaded language. "
        "Do not add information not present in the article. Cover the main points "
        "proportionally — don't skip significant parts of a long article just to stay short."
    )

    response = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Article:\n{truncated}"}
        ],
        max_tokens=500,
        temperature=0.3
    )
    return response['choices'][0]['message']['content'].strip()


def extract_entities(text: str) -> set[str]:
    doc = nlp(text)
    return {ent.text.lower().strip() for ent in doc.ents if ent.label_ in ("PERSON", "ORG", "GPE", "NORP")}


def check_summary_consistency(source_text: str, summary_text: str) -> dict:
    source_entities = extract_entities(source_text)
    summary_entities = extract_entities(summary_text)

    unverified = []
    for ent in summary_entities:
        found = any(ent in src_ent or src_ent in ent for src_ent in source_entities) or (ent in source_text.lower())
        if not found:
            unverified.append(ent)

    return {"unverified_entities": unverified, "flag": len(unverified) > 0}


def generate_summary_with_safeguard(article_text: str, llm) -> dict:
    summary = summarize_article(article_text, llm)
    consistency = check_summary_consistency(article_text, summary)

    disclaimer = DISCLAIMER_BASE
    if consistency["flag"]:
        disclaimer += (
            f" Note: the following names/entities in this summary could not be verified "
            f"against the source article: {', '.join(consistency['unverified_entities'])}."
        )

    return {
        "summary": summary,
        "disclaimer": disclaimer,
        "flagged": consistency["flag"],
        "unverified_entities": consistency["unverified_entities"],
    }
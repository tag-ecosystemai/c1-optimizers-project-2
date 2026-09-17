const CATEGORY_MAP = {
  "Emotional Amplification": "emotional_language",
  "Weasel Attribution": "loaded_language",
  "Certainty Distortion": "absolutist_language",
  "Implicit Judgment": "framing",
  "Selective Emphasis": "framing",
  "Dehumanising/Glorifying Framing": "loaded_language",
  "General Subjective Language": "generalisation",
};

export function buildHighlights(fullText, sentences) {
  const highlights = [];
  let searchFrom = 0;

  for (const sentence of sentences) {
    if (!sentence.is_biased || sentence.categories.length === 0) {
      continue;
    }

    const start = fullText.indexOf(sentence.text, searchFrom);
    if (start === -1) {
      // Sentence text didn't match exactly (whitespace/quote differences
      // from spaCy's tokenization vs. the raw string) — skip highlighting
      // this one rather than crash or misplace a highlight.
      continue;
    }
    const end = start + sentence.text.length;

    // Use the first category for the highlight color/label; explanations
    // for all categories are still preserved in `explanations`
    const primaryCategory = CATEGORY_MAP[sentence.categories[0]] || "framing";

    highlights.push({
      text: sentence.text,
      category: primaryCategory,
      start,
      end,
      allCategories: sentence.categories,
      explanations: sentence.explanations,
    });

    searchFrom = end;
  }

  return highlights;
}
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
    if (start === -1) continue;
    const end = start + sentence.text.length;

    const primaryCategory = sentence.categories[0];
    const cssClass = "cat" + primaryCategory.replace(/[^a-zA-Z]/g, "");

    highlights.push({
      text: sentence.text,
      category: cssClass,
      categoryLabel: primaryCategory,
      start,
      end,
      allCategories: sentence.categories,
      explanations: sentence.explanations,
    });

    searchFrom = end;
  }

  return highlights;
}
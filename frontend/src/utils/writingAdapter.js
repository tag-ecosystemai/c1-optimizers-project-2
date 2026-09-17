const CATEGORY_GUIDANCE = {
  "Emotional Amplification": "Try replacing emotionally charged words with more neutral, descriptive language.",
  "Weasel Attribution": "Consider naming a specific source instead of an unnamed group like 'critics' or 'many people'.",
  "Certainty Distortion": "Check whether your certainty matches the evidence — avoid absolutes if the claim isn't fully settled.",
  "Implicit Judgment": "Consider stating your point directly instead of implying it through word choice or sentence structure.",
  "Selective Emphasis": "Check whether you're giving disproportionate weight to one side or detail — consider adding relevant context.",
  "Dehumanising/Glorifying Framing": "Avoid metaphors or labels that strip individuality or overstate heroism — describe actions plainly.",
  "General Subjective Language": "This passage reads as subjective — consider whether a more neutral phrasing better serves your point.",
};

export function buildWritingAnalysis(analysisResponse) {
  const { sentences, bias_ratio } = analysisResponse;

  const score = Math.round((1 - bias_ratio) * 100);

  const suggestions = [];
  for (const sentence of sentences) {
    if (!sentence.is_biased || sentence.categories.length === 0) {
      continue;
    }

    sentence.categories.forEach((category, i) => {
      suggestions.push({
        category,
        original: sentence.text,
        message: sentence.explanations[i] || "This passage may read as subjective.",
        alternative: CATEGORY_GUIDANCE[category] || "Consider rephrasing for neutrality.",
      });
    });
  }

  return { score, suggestions };
}
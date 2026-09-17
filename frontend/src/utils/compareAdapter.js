export function adaptCompareResponse(response) {
  const articles = response.articles.map((article) => ({
    source: article.source || "Unknown source",
    title: article.title || "Untitled",
    author: null, // not returned by the backend currently
    published: article.published_at
      ? new Date(article.published_at).toLocaleDateString()
      : null,
    tone: article.tone,
    summary: article.summary,
  }));

  return {
    articles,
    divergences: response.divergences || [],
    entityComparison: response.entity_comparison,
    failedArticles: response.failed_articles || [],
  };
}
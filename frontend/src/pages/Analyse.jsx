import { useState } from "react";

import ArticleInput from "../components/analyse/ArticleInput";
import SummaryCard from "../components/analyse/SummaryCard";
import HighlightedText from "../components/analyse/HighlightedText";
import HighlightLegend from "../components/analyse/HighlightLegend";

import { fetchArticle, analyzeArticle, summarizeArticle } from "../api/client";
import { buildHighlights } from "../utils/highlightAdapter";

function Analyse() {

  const [articleText, setArticleText] = useState("");
  const [articleUrl, setArticleUrl] = useState("");

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullArticle, setShowFullArticle] = useState(false);

  const handleAnalyse = async () => {
    if (!articleText.trim() && !articleUrl.trim()) return;

    setIsLoading(true);
    setError(null);
    setShowFullArticle(false);

    try {
      let text = articleText.trim();
      let articleMeta = null;

      if (!text && articleUrl.trim()) {
        const fetched = await fetchArticle(articleUrl.trim());
        text = fetched.text;
        articleMeta = fetched;
      }

      const [analysis, summaryResult] = await Promise.all([
        analyzeArticle(text),
        summarizeArticle(text),
      ]);

      setResult({
        article: {
          title: articleMeta?.title || "Pasted article",
          source: articleMeta?.url ? new URL(articleMeta.url).hostname : "Direct input",
          author: articleMeta?.authors?.join(", ") || null,
          published: articleMeta?.publish_date || null,
          text,
        },
        summary: summaryResult.summary,
        disclaimer: summaryResult.disclaimer,
        highlights: buildHighlights(text, analysis.sentences),
        biasRatio: analysis.bias_ratio,
      });

    } catch (err) {
      setError(err.message || "Something went wrong analysing this article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">

      <ArticleInput
        articleText={articleText}
        setArticleText={setArticleText}
        articleUrl={articleUrl}
        setArticleUrl={setArticleUrl}
        onAnalyse={handleAnalyse}
        isLoading={isLoading}
      />

      {error && <div className="error-banner">{error}</div>}

      {result && (
        <section className="results-section">

          <div className="results-header">
            <div>
              <span className="eyebrow">ANALYSIS RESULTS</span>
              <h2>Here's what RawSignal found.</h2>
            </div>
            <div className="analysis-count">
              <strong>{result.highlights.length}</strong>
              <span>signals detected</span>
            </div>
          </div>

          <SummaryCard summary={result.summary} disclaimer={result.disclaimer} />

          <div className="show-more-toggle">
            <button className="analyse-button" onClick={() => setShowFullArticle(true)}>
              See full article with highlights →
            </button>
          </div>

        </section>
      )}

      {!result && !isLoading && (
        <section className="empty-analysis">
          <div className="empty-icon">✦</div>
          <h3>Your analysis will appear here</h3>
          <p>Add an article above to see a neutral summary and language analysis.</p>
        </section>
      )}

      {showFullArticle && result && (
        <div className="full-article-overlay" onClick={() => setShowFullArticle(false)}>
          <div className="full-article-panel" onClick={(e) => e.stopPropagation()}>
            <button className="full-article-close" onClick={() => setShowFullArticle(false)}>
              ← Close
            </button>

            <span className="article-label">Title</span>
            <h2>{result.article.title}</h2>

            {(result.article.author || result.article.published) && (
              <div className="article-meta">
                {result.article.author && <span>{result.article.author}</span>}
                {result.article.author && result.article.published && <span>•</span>}
                {result.article.published && <span>{result.article.published}</span>}
              </div>
            )}

            <HighlightLegend />

            <span className="article-label">Article</span>
            <div className="article-content">
              <HighlightedText text={result.article.text} highlights={result.highlights} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Analyse;
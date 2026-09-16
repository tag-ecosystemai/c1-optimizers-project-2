import { useState } from "react";

import ArticleInput from "../components/analyse/ArticleInput";
import SummaryCard from "../components/analyse/SummaryCard";
import HighlightedText from "../components/analyse/HighlightedText";
import HighlightLegend from "../components/analyse/HighlightLegend";

import mockAnalysis from "../data/mockAnalysis";

function Analyse() {

  const [articleText, setArticleText] = useState("");
  const [articleUrl, setArticleUrl] = useState("");

  const [result, setResult] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyse = () => {

    if (!articleText.trim() && !articleUrl.trim()) {
      return;
    }

    setIsLoading(true);

    // Temporary mock API simulation
    setTimeout(() => {
      setResult(mockAnalysis);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="page">

      {/* Hero / Input */}
      <ArticleInput
        articleText={articleText}
        setArticleText={setArticleText}
        articleUrl={articleUrl}
        setArticleUrl={setArticleUrl}
        onAnalyse={handleAnalyse}
        isLoading={isLoading}
      />

      {/* Results */}
      {result && (
        <section className="results-section">

          <div className="results-header">

            <div>
              <span className="eyebrow">
                ANALYSIS RESULTS
              </span>

              <h2>
                Here's what RawSignal found.
              </h2>
            </div>

            <div className="analysis-count">
              <strong>
                {result.analysis.totalHighlights}
              </strong>

              <span>
                signals detected
              </span>
            </div>

          </div>

          {/* Summary */}
          <SummaryCard
            summary={result.summary}
          />

          {/* Article */}
          <section className="article-card">

            <div className="article-header">

              <div>

                <span className="article-source">
                  {result.article.source}
                </span>

                <h2>
                  {result.article.title}
                </h2>

                <div className="article-meta">
                  <span>
                    {result.article.author}
                  </span>

                  <span>•</span>

                  <span>
                    {result.article.published}
                  </span>
                </div>

              </div>

            </div>

            <HighlightLegend />

            <div className="article-content">

              <HighlightedText
                text={result.article.text}
                highlights={result.highlights}
              />

            </div>

          </section>

        </section>
      )}

      {/* Empty state */}
      {!result && !isLoading && (
        <section className="empty-analysis">

          <div className="empty-icon">
            ✦
          </div>

          <h3>
            Your analysis will appear here
          </h3>

          <p>
            Add an article above to see a neutral summary and
            language analysis.
          </p>

        </section>
      )}

    </div>
  );
}

export default Analyse;
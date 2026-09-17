import { useState } from "react";

import CompareInput from "../components/compare/CompareInput";
import SourceSummary from "../components/compare/SourceSummary";
import DivergencePanel from "../components/compare/DivergencePanel";

import { compareTopic } from "../api/client";
import { adaptCompareResponse } from "../utils/compareAdapter";

function Compare() {

  const [topic, setTopic] = useState("");

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async () => {

    if (!topic.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await compareTopic(topic.trim(), 2);
      setResult(adaptCompareResponse(response));
    } catch (err) {
      setError(err.message || "Something went wrong comparing coverage.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page compare-page">

      <CompareInput
        topic={topic}
        setTopic={setTopic}
        onCompare={handleCompare}
        isLoading={isLoading}
      />

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {result && (
        <section className="comparison-results">

          <div className="results-header">
            <div>
              <span className="eyebrow">COMPARISON RESULTS</span>
              <h2>Same story, different signals.</h2>
            </div>
          </div>

          {result.failedArticles.length > 0 && (
            <p className="compare-note">
              Note: {result.failedArticles.length} article(s) could not be processed and were skipped.
            </p>
          )}

          <div className="source-summary-grid">
            {result.articles.map((article, index) => (
              <SourceSummary
                key={article.source + index}
                article={article}
                sourceNumber={index + 1}
              />
            ))}
          </div>

          {result.divergences.length > 0 && (
            <DivergencePanel divergences={result.divergences} />
          )}

        </section>
      )}

    </div>
  );
}

export default Compare;
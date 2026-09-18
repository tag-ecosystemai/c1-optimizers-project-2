import { useState } from "react";

import CompareInput from "../components/compare/CompareInput";
import SourceSummary from "../components/compare/SourceSummary";
import DivergencePanel from "../components/compare/DivergencePanel";

import { compareTopic, compareUrls } from "../api/client";
import { adaptCompareResponse } from "../utils/compareAdapter";

function Compare() {

  const [mode, setMode] = useState("topic");
  const [topic, setTopic] = useState("");
  const [urlA, setUrlA] = useState("");
  const [urlB, setUrlB] = useState("");

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async () => {

    setIsLoading(true);
    setError(null);

    try {
      const response = mode === "topic"
        ? await compareTopic(topic.trim(), 2)
        : await compareUrls(urlA.trim(), urlB.trim());

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
        mode={mode}
        setMode={setMode}
        topic={topic}
        setTopic={setTopic}
        urlA={urlA}
        setUrlA={setUrlA}
        urlB={urlB}
        setUrlB={setUrlB}
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
            <div className="compare-note">
              <p><strong>Some sources couldn't be processed:</strong></p>
              <ul>
                {result.failedArticles.map((f, i) => (
                  <li key={i}>{f.url} — {f.reason}</li>
                ))}
              </ul>
              <p>Try sources known to work well: BBC News, Reuters, Associated Press, The Guardian.</p>
            </div>
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
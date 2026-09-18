import { useState } from "react";

import CompareInput from "../components/compare/CompareInput";
import SourceSummary from "../components/compare/SourceSummary";
import DivergencePanel from "../components/compare/DivergencePanel";

import { compareTopic, compareUrls } from "../api/client";
import { adaptCompareResponse } from "../utils/compareAdapter";

function Compare() {

  const [mode, setMode] = useState("urls");
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
        mode={mode} setMode={setMode}
        topic={topic} setTopic={setTopic}
        urlA={urlA} setUrlA={setUrlA}
        urlB={urlB} setUrlB={setUrlB}
        onCompare={handleCompare}
        isLoading={isLoading}
      />

      {error && <div className="error-banner">{error}</div>}

      {!result && !isLoading && (
        <div className="compare-preview-empty">
          <h3>Awaiting input</h3>
          <p>Enter two articles or search for a topic to see how different news outlets are framing the same story. RawSignal identifies influential language, tone shifts, and omitted context.</p>
        </div>
      )}

      {result && (
        <section className="comparison-results">

          <div className="results-header">
            <div>
              <span className="eyebrow">COMPARISON RESULTS</span>
              <h2>Coverage comparison.</h2>
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
              <SourceSummary key={article.source + index} article={article} sourceNumber={index + 1} />
            ))}
          </div>

          {result.divergences.length > 0 && (
            <DivergencePanel divergences={result.divergences} />
          )}

        </section>
      )}

      <div className="compare-info-panel">
        <h3>How to interpret results?</h3>
        <p>RawSignal doesn't tell you who is "right". Instead, it highlights the structural differences in how information is presented.</p>
        <div className="compare-info-grid">
          <div>
            <h5>Linguistic Framing</h5>
            <p>Detection of emotionally charged verbs, adjectives, and terms that carry unnecessary emotional weight.</p>
          </div>
          <div>
            <h5>Information Salience</h5>
            <p>Analysis of which facts are prioritized in the lead versus which are buried or omitted.</p>
          </div>
          <div>
            <h5>Narrative Tone</h5>
            <p>Overall sentiment scoring focused on detecting underlying cynicism, optimism, or alarmism.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Compare;
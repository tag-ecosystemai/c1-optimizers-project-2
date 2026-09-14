import { useState } from "react";

import CompareInput from "../components/compare/CompareInput";
import SourceSummary from "../components/compare/SourceSummary";
import DivergencePanel from "../components/compare/DivergencePanel";

import { mockComparison } from "../data/mockAnalysis";

function Compare() {

  const [firstUrl, setFirstUrl] = useState("");
  const [secondUrl, setSecondUrl] = useState("");

  const [result, setResult] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = () => {

    if (!firstUrl.trim() || !secondUrl.trim()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setResult(mockComparison);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="page compare-page">

      <CompareInput
        firstUrl={firstUrl}
        setFirstUrl={setFirstUrl}
        secondUrl={secondUrl}
        setSecondUrl={setSecondUrl}
        onCompare={handleCompare}
        isLoading={isLoading}
      />

      {result && (
        <section className="comparison-results">

          <div className="results-header">

            <div>
              <span className="eyebrow">
                COMPARISON RESULTS
              </span>

              <h2>
                Same story, different signals.
              </h2>
            </div>

          </div>

          <div className="source-summary-grid">

            {result.articles.map((article, index) => (
              <SourceSummary
                key={article.source}
                article={article}
                sourceNumber={index + 1}
              />
            ))}

          </div>

          <DivergencePanel
            divergences={result.divergences}
          />

        </section>
      )}

    </div>
  );
}

export default Compare;
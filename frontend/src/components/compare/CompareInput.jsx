import { Link2, RefreshCw } from "lucide-react";

function CompareInput({
  mode, setMode,
  topic, setTopic,
  urlA, setUrlA,
  urlB, setUrlB,
  onCompare, isLoading
}) {
  const handleSwap = () => {
    const temp = urlA;
    setUrlA(urlB);
    setUrlB(temp);
  };

  return (
    <section className="compare-input-section">

      <div className="compare-hero">
        <span className="compare-eyebrow-badge">COMPARE COVERAGE</span>
        <h1 className="compare-h1">See the story from two sides.</h1>
        <p className="compare-subtitle">
          Identify bias, framing differences, and linguistic influence by comparing news sources
          side-by-side. Our AI models help you spot the 'signal' behind the narrative.
        </p>
      </div>

      <div className="compare-mode-toggle">
        <button
          className={mode === "topic" ? "compare-mode-btn active" : "compare-mode-btn"}
          onClick={() => setMode("topic")}
        >
          SEARCH A TOPIC
        </button>
        <button
          className={mode === "urls" ? "compare-mode-btn active" : "compare-mode-btn"}
          onClick={() => setMode("urls")}
        >
          PASTE TWO LINKS
        </button>
      </div>

      {mode === "topic" && (
        <div className="compare-topic-card">
          <div className="compare-topic-field">
            <label htmlFor="compare-topic">Topic</label>
            <input
              id="compare-topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. AI regulation, climate policy, elections"
            />
          </div>
          <button
            className="compare-topic-btn"
            onClick={onCompare}
            disabled={isLoading || !topic.trim()}
          >
            {isLoading ? "Comparing coverage..." : <>Compare coverage <span>→</span></>}
          </button>
        </div>
      )}

      {mode === "urls" && (
        <>
          <div className="compare-two-col">

            <div className="compare-source-card">
              <div className="compare-source-card-header">
                <span className="compare-source-label">SOURCE A</span>
                <Link2 size={14} color="#9ca3af" />
              </div>
              <h3 className="compare-source-title">Primary Source Article</h3>
              <textarea
                className="compare-source-textarea"
                value={urlA}
                onChange={(e) => setUrlA(e.target.value)}
                placeholder="Paste the first article text here or enter a URL..."
              />
              <div className="compare-char-count">{urlA.length} characters</div>
            </div>

            <div className="compare-swap-col">
              <button className="compare-swap-btn" onClick={handleSwap} title="Swap sources">
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="compare-source-card">
              <div className="compare-source-card-header">
                <span className="compare-source-label">SOURCE B</span>
                <Link2 size={14} color="#9ca3af" />
              </div>
              <h3 className="compare-source-title">Comparison Source</h3>
              <textarea
                className="compare-source-textarea"
                value={urlB}
                onChange={(e) => setUrlB(e.target.value)}
                placeholder="Paste the second article text here or enter a URL..."
              />
              <div className="compare-char-count">{urlB.length} characters</div>
            </div>

          </div>

          <div className="compare-urls-divider" />

          <div className="compare-actions">
            <button
              className="compare-submit-btn"
              onClick={onCompare}
              disabled={isLoading || !urlA.trim() || !urlB.trim()}
            >
              COMPARE COVERAGE <span>→</span>
            </button>
            <button
              className="compare-clear-btn"
              onClick={() => { setUrlA(""); setUrlB(""); }}
            >
              CLEAR INPUTS
            </button>
          </div>

          <p className="compare-timing-note">
            ⊙ Comparative analysis takes ~5–10 seconds to generate deep insights.
          </p>
        </>
      )}

    </section>
  );
}

export default CompareInput;
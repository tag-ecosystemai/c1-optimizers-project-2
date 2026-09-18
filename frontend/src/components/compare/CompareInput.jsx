function CompareInput({
    mode,
    setMode,
    topic,
    setTopic,
    urlA,
    setUrlA,
    urlB,
    setUrlB,
    onCompare,
    isLoading
  }) {
    return (
      <section className="compare-input-section">

        <div className="compare-hero">
          <span className="eyebrow">COMPARE COVERAGE</span>
          <h1>See the story from two sides.</h1>
          <p>
            Search a topic to find recent coverage, or paste two article
            links directly.
          </p>
        </div>

        <div className="compare-mode-toggle">
          <button
            className={mode === "topic" ? "mode-tab active" : "mode-tab"}
            onClick={() => setMode("topic")}
          >
            Search a topic
          </button>
          <button
            className={mode === "urls" ? "mode-tab active" : "mode-tab"}
            onClick={() => setMode("urls")}
          >
            Paste two links
          </button>
        </div>

        <div className="compare-input-card">

          {mode === "topic" ? (
            <div className="field-group">
              <label htmlFor="compare-topic">Topic</label>
              <input
                id="compare-topic"
                type="text"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="e.g. AI regulation, climate policy, elections"
              />
            </div>
          ) : (
            <>
              <div className="compare-source-input">
                <div className="source-number">01</div>
                <div className="field-group">
                  <label htmlFor="url-a">First article</label>
                  <input
                    id="url-a"
                    type="url"
                    value={urlA}
                    onChange={(event) => setUrlA(event.target.value)}
                    placeholder="https://news-site.com/article"
                  />
                </div>
              </div>

              <div className="compare-vs">VS</div>

              <div className="compare-source-input">
                <div className="source-number">02</div>
                <div className="field-group">
                  <label htmlFor="url-b">Second article</label>
                  <input
                    id="url-b"
                    type="url"
                    value={urlB}
                    onChange={(event) => setUrlB(event.target.value)}
                    placeholder="https://another-news-site.com/article"
                  />
                </div>
              </div>
            </>
          )}

          <button
            className="analyse-button"
            onClick={onCompare}
            disabled={isLoading || (mode === "topic" ? !topic.trim() : (!urlA.trim() || !urlB.trim()))}
          >
            {isLoading ? "Comparing coverage..." : "Compare coverage"}
            {!isLoading && <span className="button-arrow">→</span>}
          </button>

        </div>
      </section>
    );
  }

  export default CompareInput;
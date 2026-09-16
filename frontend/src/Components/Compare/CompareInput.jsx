function CompareInput({
    firstUrl,
    setFirstUrl,
    secondUrl,
    setSecondUrl,
    onCompare,
    isLoading
  }) {
    return (
      <section className="compare-input-section">
  
        <div className="compare-hero">
          <span className="eyebrow">COMPARE COVERAGE</span>
  
          <h1>See the story from two sides.</h1>
  
          <p>
            Compare how different news outlets summarize and frame the
            same event.
          </p>
        </div>
  
        <div className="compare-input-card">
  
          <div className="compare-source-input">
            <div className="source-number">01</div>
  
            <div className="field-group">
              <label htmlFor="first-url">
                First article
              </label>
  
              <input
                id="first-url"
                type="url"
                value={firstUrl}
                onChange={(event) =>
                  setFirstUrl(event.target.value)
                }
                placeholder="https://news-site.com/article"
              />
            </div>
          </div>
  
          <div className="compare-vs">
            VS
          </div>
  
          <div className="compare-source-input">
            <div className="source-number">02</div>
  
            <div className="field-group">
              <label htmlFor="second-url">
                Second article
              </label>
  
              <input
                id="second-url"
                type="url"
                value={secondUrl}
                onChange={(event) =>
                  setSecondUrl(event.target.value)
                }
                placeholder="https://another-news-site.com/article"
              />
            </div>
          </div>
  
          <button
            className="analyse-button"
            onClick={onCompare}
            disabled={isLoading}
          >
            {isLoading ? "Comparing coverage..." : "Compare coverage"}
            {!isLoading && <span className="button-arrow">→</span>}
          </button>
  
        </div>
      </section>
    );
  }
  
  export default CompareInput;
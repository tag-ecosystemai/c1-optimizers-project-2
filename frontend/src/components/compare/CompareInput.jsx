function CompareInput({
    topic,
    setTopic,
    onCompare,
    isLoading
  }) {
    return (
      <section className="compare-input-section">

        <div className="compare-hero">
          <span className="eyebrow">COMPARE COVERAGE</span>

          <h1>See the story from two sides.</h1>

          <p>
            Enter a topic and RawSignal will find and compare recent
            coverage from different outlets.
          </p>
        </div>

        <div className="compare-input-card">

          <div className="field-group">
            <label htmlFor="compare-topic">
              Topic
            </label>

            <input
              id="compare-topic"
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="e.g. AI regulation, climate policy, elections"
            />
          </div>

          <button
            className="analyse-button"
            onClick={onCompare}
            disabled={isLoading || !topic.trim()}
          >
            {isLoading ? "Comparing coverage..." : "Compare coverage"}
            {!isLoading && <span className="button-arrow">→</span>}
          </button>

        </div>
      </section>
    );
  }

  export default CompareInput;
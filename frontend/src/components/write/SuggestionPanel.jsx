const CATEGORY_COLORS = {
  "Emotional Amplification": "emotional_language",
  "Weasel Attribution": "loaded_language",
  "Certainty Distortion": "absolutist_language",
  "Implicit Judgment": "framing",
  "Selective Emphasis": "framing",
  "Dehumanising/Glorifying Framing": "loaded_language",
  "General Subjective Language": "generalisation",
};

function SuggestionPanel({ suggestions, onSuggestionClick }) {
  return (
    <aside className="suggestion-panel">

      <div className="suggestion-header">
        <span className="eyebrow">SUGGESTIONS</span>
        <h2>Make your language clearer.</h2>
      </div>

      <div className="suggestion-list">
        {suggestions.map((suggestion, index) => {
          const colorClass = CATEGORY_COLORS[suggestion.category] || "generalisation";
          return (
            <div
              className={`suggestion-item ${colorClass}`}
              key={index}
              onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
              role={onSuggestionClick ? "button" : undefined}
              tabIndex={onSuggestionClick ? 0 : undefined}
            >
              <div className="suggestion-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <span className={`suggestion-category-badge ${colorClass}`}>
                  {suggestion.category}
                </span>

                <h3>"{suggestion.original}"</h3>

                <p>{suggestion.message}</p>

                <div className="suggestion-alternative">
                  <span>Try:</span>
                  {suggestion.alternative}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </aside>
  );
}

export default SuggestionPanel;
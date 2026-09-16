function SuggestionPanel({ suggestions }) {
    return (
      <aside className="suggestion-panel">
  
        <div className="suggestion-header">
  
          <span className="eyebrow">
            SUGGESTIONS
          </span>
  
          <h2>
            Make your language clearer.
          </h2>
  
        </div>
  
        <div className="suggestion-list">
  
          {suggestions.map((suggestion, index) => (
            <div
              className="suggestion-item"
              key={index}
            >
  
              <div className="suggestion-number">
                {String(index + 1).padStart(2, "0")}
              </div>
  
              <div>
  
                <span className="suggestion-category">
                  {suggestion.category}
                </span>
  
                <h3>
                  "{suggestion.original}"
                </h3>
  
                <p>
                  {suggestion.message}
                </p>
  
                <div className="suggestion-alternative">
                  <span>Try:</span>
                  {suggestion.alternative}
                </div>
  
              </div>
  
            </div>
          ))}
  
        </div>
  
      </aside>
    );
  }
  
  export default SuggestionPanel;
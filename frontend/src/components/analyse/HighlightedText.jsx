const categoryLabels = {
    emotional_language: "Emotional language",
    loaded_language: "Loaded language",
    framing: "Framing",
    absolutist_language: "Absolutist language",
    generalisation: "Generalisation"
  };
  
  function HighlightedText({ text, highlights }) {
    if (!text) {
      return null;
    }
  
    if (!highlights || highlights.length === 0) {
      return <p className="article-text">{text}</p>;
    }
  
    const sortedHighlights = [...highlights].sort(
      (a, b) => a.start - b.start
    );
  
    const sections = [];
  
    let currentPosition = 0;
  
    sortedHighlights.forEach((highlight, index) => {
  
      const start = highlight.start;
      const end = highlight.end;
  
      // Normal text before the highlight
      if (start > currentPosition) {
        sections.push(
          <span key={`normal-${index}`}>
            {text.slice(currentPosition, start)}
          </span>
        );
      }
  
      // Highlighted text
      sections.push(
        <mark
          key={`highlight-${index}`}
          className={`highlight ${highlight.category}`}
          title={highlight.categoryLabel || highlight.category}
        >
          {text.slice(start, end)}
        </mark>
      );
  
      currentPosition = end;
    });
  
    // Remaining text
    if (currentPosition < text.length) {
      sections.push(
        <span key="remaining">
          {text.slice(currentPosition)}
        </span>
      );
    }
  
    return (
      <div className="article-text">
        {sections}
      </div>
    );
  }
  
  export default HighlightedText;
const categories = [
  "Emotional Amplification",
  "Weasel Attribution",
  "Certainty Distortion",
  "Implicit Judgment",
  "Selective Emphasis",
  "Dehumanising/Glorifying Framing",
  "General Subjective Language",
];

function HighlightLegend() {
  return (
    <div className="highlight-legend">
      <span className="legend-title">Highlight key</span>
      <div className="legend-items">
        {categories.map((category) => {
          const cssClass = "cat" + category.replace(/[^a-zA-Z]/g, "");
          return (
            <div className="legend-item" key={category}>
              <span className={`legend-dot ${cssClass}`} />
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HighlightLegend;
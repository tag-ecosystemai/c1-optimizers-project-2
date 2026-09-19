const categories = [
  { key: "Emotional Amplification", label: "Emotional Amplification" },
  { key: "Weasel Attribution", label: "Weasel Attribution" },
  { key: "Certainty Distortion", label: "Certainty Distortion" },
  { key: "Implicit Judgment", label: "Implicit Judgment" },
  { key: "Selective Emphasis", label: "Selective Emphasis" },
  { key: "Dehumanising/Glorifying Framing", label: "Dehumanising/Glorifying Framing" },
  { key: "General Subjective Language", label: "General Subjective Language" },
];

function HighlightLegend() {
  return (
    <div className="highlight-legend">
      <span className="legend-title">Highlight key</span>
      <div className="legend-items">
        {categories.map((category) => (
          <div className="legend-item" key={category.key}>
            <span className={`legend-dot cat-${category.key.replace(/[^a-zA-Z]/g, "")}`} />
            {category.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightLegend;
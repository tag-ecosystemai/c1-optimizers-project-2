const categories = [
  { key: "emotional_language", label: "Emotional language" },
  { key: "loaded_language", label: "Loaded language" },
  { key: "framing", label: "Framing" },
  { key: "absolutist_language", label: "Absolutist language" },
  { key: "generalisation", label: "Generalisation" },
];

function HighlightLegend() {
  return (
    <div className="highlight-legend">
      <span className="legend-title">Highlight key</span>
      <div className="legend-items">
        {categories.map((category) => (
          <div className="legend-item" key={category.key}>
            <span className={`legend-dot ${category.key}`} />
            {category.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightLegend;
function EntityComparisonPanel({ entityComparison }) {
  const { shared = [], divergent = [] } = entityComparison || {};

  if (shared.length === 0 && divergent.length === 0) return null;

  return (
    <section className="entity-comparison-panel">
      <h3>Named entities mentioned</h3>

      {shared.length > 0 && (
        <div className="entity-group">
          <span className="entity-group-label">Mentioned in both articles</span>
          <div className="entity-tags">
            {shared.map((e, i) => (
              <span className="entity-tag shared" key={i}>{e.text} <em>({e.label})</em></span>
            ))}
          </div>
        </div>
      )}

      {divergent.length > 0 && (
        <div className="entity-group">
          <span className="entity-group-label">Mentioned in only one article</span>
          <div className="entity-tags">
            {divergent.map((e, i) => (
              <span className="entity-tag divergent" key={i}>{e.text} <em>({e.label})</em></span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default EntityComparisonPanel;
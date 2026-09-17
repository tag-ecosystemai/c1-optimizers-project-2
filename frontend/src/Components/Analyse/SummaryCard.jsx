function SummaryCard({ summary, disclaimer }) {
  return (
    <section className="summary-card">

      <div className="section-label">
        <span className="label-icon">✦</span>
        Neutral summary
      </div>

      <p className="summary-text">
        {summary}
      </p>

      {disclaimer && (
        <p className="summary-disclaimer">
          {disclaimer}
        </p>
      )}

      <div className="summary-footer">
        <span>AI-generated summary</span>
        <span className="summary-badge">
          Neutralized
        </span>
      </div>

    </section>
  );
}

export default SummaryCard;
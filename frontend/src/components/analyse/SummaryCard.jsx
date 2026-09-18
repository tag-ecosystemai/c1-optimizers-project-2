import { Sparkles, AlertTriangle } from "lucide-react";

function SummaryCard({ summary, disclaimer }) {
  return (
    <section className="summary-card">

      <div className="section-label">
        <Sparkles size={16} />
        Neutral summary
      </div>

      <div className="summary-text">
        {summary.split(/\n+/).filter(Boolean).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {disclaimer && (
        <p className="summary-disclaimer">
          <AlertTriangle size={14} style={{ verticalAlign: "middle", marginRight: "4px" }} />
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
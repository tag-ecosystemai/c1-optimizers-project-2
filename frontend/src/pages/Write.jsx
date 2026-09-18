import { useState, useRef } from "react";
import { History, FileText, Trash2 } from "lucide-react";

import { analyzeArticle } from "../api/client";
import { buildWritingAnalysis } from "../utils/writingAdapter";

const CATEGORY_COLORS = {
  "Emotional Amplification": "emotional_language",
  "Weasel Attribution": "loaded_language",
  "Certainty Distortion": "absolutist_language",
  "Implicit Judgment": "framing",
  "Selective Emphasis": "framing",
  "Dehumanising/Glorifying Framing": "loaded_language",
  "General Subjective Language": "generalisation",
};

function Write() {

  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const editorRef = useRef(null);

  const handleAnalyse = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeArticle(text);
      setAnalysis(buildWritingAnalysis(result));
    } catch (err) {
      setError(err.message || "Something went wrong analysing your writing.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = text.indexOf(suggestion.original);
    if (start === -1) return;
    const end = start + suggestion.original.length;

    textarea.focus();
    textarea.setSelectionRange(start, end);
  };

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return (
    <div className="write-shell">

      <div className="write-canvas">
        <div className="write-canvas-meta">
          <div>
            <span className="eyebrow">WRITE</span>
            <h1 style={{ fontSize: "1.8rem", margin: "4px 0" }}>Write with more awareness.</h1>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "12px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            <span><FileText size={14} style={{ verticalAlign: "middle" }} /> {text.length} characters · {wordCount} words</span>
          </div>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}
            onClick={() => { setText(""); setAnalysis(null); }}
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>

        <textarea
          ref={editorRef}
          className="write-canvas-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing or paste your article here..."
        />

        {error && <div className="error-banner">{error}</div>}

        <button
          className="analyse-button"
          onClick={handleAnalyse}
          disabled={!text.trim() || isLoading}
          style={{ marginTop: "16px" }}
        >
          {isLoading ? "Analysing..." : "Analyse my writing"}
          {!isLoading && <span className="button-arrow">→</span>}
        </button>
      </div>

      <div className={`write-sidebar-panel ${sidebarCollapsed ? "collapsed" : ""}`}>
        <button
          className="sidebar-collapse-toggle"
          style={{ position: "static", marginBottom: "12px" }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? "←" : "→"}
        </button>

        {!sidebarCollapsed && (
          <>
            <h3 style={{ fontSize: "1rem" }}>Your writing analysis</h3>

            {analysis ? (
              <>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Neutrality score
                </span>
                <div className="neutrality-score-bar">
                  <div className="neutrality-score-fill" style={{ width: `${analysis.score}%` }} />
                </div>
                <p style={{ fontSize: "0.85rem", marginBottom: "20px" }}>{analysis.score}/100</p>

                <div className="suggestion-list">
                  {analysis.suggestions.map((suggestion, index) => {
                    const colorClass = CATEGORY_COLORS[suggestion.category] || "generalisation";
                    return (
                      <div
                        className={`suggestion-item ${colorClass}`}
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <span className={`suggestion-category-badge ${colorClass}`}>
                          {suggestion.category}
                        </span>
                        <h3 style={{ fontSize: "0.9rem" }}>"{suggestion.original}"</h3>
                        <p style={{ fontSize: "0.8rem" }}>{suggestion.message}</p>
                        <div className="suggestion-alternative">
                          <span>Try:</span> {suggestion.alternative}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="write-empty">
                <div className="empty-icon">✦</div>
                <h3>Analysis pending</h3>
                <p>Add some text and analyse it to see your bias signals and editorial suggestions.</p>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}

export default Write;
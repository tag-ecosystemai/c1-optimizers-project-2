import { useState, useRef } from "react";

import TextEditor from "../components/write/TextEditor";
import ScoreCircle from "../components/write/ScoreCircle";
import SuggestionPanel from "../components/write/SuggestionPanel";

import { analyzeArticle } from "../api/client";
import { buildWritingAnalysis } from "../utils/writingAdapter";

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

    // scroll the textarea so the selection is visible
    const lineHeight = 24;
    const linesBefore = text.slice(0, start).split("\n").length;
    textarea.scrollTop = Math.max(0, (linesBefore - 3) * lineHeight);
  };

  return (
    <div className="page write-page">

      <section className="write-header">
        <span className="eyebrow">WRITE</span>
        <h1>Write with more awareness.</h1>
        <p>Check your writing for language that could influence how readers interpret your message.</p>
      </section>

      <section className="write-workspace">

        <div className="write-main">
          <TextEditor ref={editorRef} text={text} setText={setText} />

          {error && <div className="error-banner">{error}</div>}

          <button
            className="analyse-button"
            onClick={handleAnalyse}
            disabled={!text.trim() || isLoading}
          >
            {isLoading ? "Analysing..." : "Analyse my writing"}
            {!isLoading && <span className="button-arrow">→</span>}
          </button>
        </div>

        <div className={`write-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? "←" : "→"}
          </button>

          {!sidebarCollapsed && (
            analysis ? (
              <>
                <ScoreCircle score={analysis.score} />
                <SuggestionPanel
                  suggestions={analysis.suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
              </>
            ) : (
              <div className="write-empty">
                <div className="empty-icon">✦</div>
                <h3>Your writing analysis</h3>
                <p>Add some text and analyse it to see your bias signal and suggestions.</p>
              </div>
            )
          )}

        </div>

      </section>

    </div>
  );
}

export default Write;
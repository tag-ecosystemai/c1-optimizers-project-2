import { useState } from "react";

import TextEditor from "../components/write/TextEditor";
import ScoreCircle from "../components/write/ScoreCircle";
import SuggestionPanel from "../components/write/SuggestionPanel";

import { mockWritingAnalysis } from "../data/mockAnalysis";

function Write() {

  const [text, setText] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const handleAnalyse = () => {

    if (!text.trim()) {
      return;
    }

    setAnalysis(mockWritingAnalysis);
  };

  return (
    <div className="page write-page">

      <section className="write-header">

        <span className="eyebrow">
          WRITE
        </span>

        <h1>
          Write with more awareness.
        </h1>

        <p>
          Check your writing for language that could influence how
          readers interpret your message.
        </p>

      </section>

      <section className="write-workspace">

        <div className="write-main">

          <TextEditor
            text={text}
            setText={setText}
          />

          <button
            className="analyse-button"
            onClick={handleAnalyse}
            disabled={!text.trim()}
          >
            Analyse my writing
            <span className="button-arrow">→</span>
          </button>

        </div>

        <div className="write-sidebar">

          {analysis ? (
            <>
              <ScoreCircle
                score={analysis.score}
              />

              <SuggestionPanel
                suggestions={analysis.suggestions}
              />
            </>
          ) : (

            <div className="write-empty">

              <div className="empty-icon">
                ✦
              </div>

              <h3>
                Your writing analysis
              </h3>

              <p>
                Add some text and analyse it to see your
                bias signal and suggestions.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Write;
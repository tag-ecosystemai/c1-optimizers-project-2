import { useState } from "react";
import { FileText, Globe } from "lucide-react";

function ArticleInput({
    articleText,
    setArticleText,
    articleUrl,
    setArticleUrl,
    onAnalyse,
    isLoading
  }) {

    const [activeTab, setActiveTab] = useState("text");

    return (
      <section className="input-section">

        <div className="input-header">
          <div>
            <span className="eyebrow">ARTICLE ANALYSIS</span>
            <h1>Understand what you're reading.</h1>
            <p>
              Paste an article or provide a URL. RawSignal will summarize the
              story and identify language that may influence how it is perceived.
            </p>
          </div>
        </div>

        <div className="input-card">

          <div className="input-tabs">
            <button
              className={activeTab === "text" ? "input-tab active" : "input-tab"}
              onClick={() => setActiveTab("text")}
            >
              <FileText size={14} /> Article text
            </button>
            <button
              className={activeTab === "url" ? "input-tab active" : "input-tab"}
              onClick={() => setActiveTab("url")}
            >
              <Globe size={14} /> Article URL
            </button>
          </div>

          {activeTab === "text" ? (
            <div className="field-group">
              <textarea
                id="article-text"
                value={articleText}
                onChange={(event) => setArticleText(event.target.value)}
                placeholder="Paste the article text here..."
                rows={10}
              />
              <div className="field-footer">
                <span>{articleText.length} characters</span>
                <span>RawSignal accepts plain text</span>
              </div>
            </div>
          ) : (
            <div className="field-group">
              <input
                id="article-url"
                type="url"
                value={articleUrl}
                onChange={(event) => setArticleUrl(event.target.value)}
                placeholder="https://example.com/news/article"
              />
            </div>
          )}

          <button
            className="analyse-button"
            onClick={onAnalyse}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="button-spinner"></span>
                Analysing article...
              </>
            ) : (
              <>
                Analyse article
                <span className="button-arrow">→</span>
              </>
            )}
          </button>

          <p className="privacy-note">
            Your analysis is presented as an aid to reading, not a definitive
            judgment of whether an article is biased.
          </p>

        </div>

        <div className="feature-strip">
          <div className="feature-strip-item">
            <h4>Neutral Summary</h4>
            <p>Get the facts without the fluff. We strip away partisan framing to show you the core signal.</p>
          </div>
          <div className="feature-strip-item">
            <h4>Bias Detection</h4>
            <p>Our model identifies emotionally charged language and framing patterns used to sway opinion.</p>
          </div>
          <div className="feature-strip-item">
            <h4>Compare Framing</h4>
            <p>See how the same story is being told differently across sources.</p>
          </div>
        </div>

      </section>
    );
  }

  export default ArticleInput;
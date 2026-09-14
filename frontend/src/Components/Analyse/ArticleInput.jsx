function ArticleInput({
    articleText,
    setArticleText,
    articleUrl,
    setArticleUrl,
    onAnalyse,
    isLoading
  }) {
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
  
          {/* Article text */}
          <div className="field-group">
  
            <label htmlFor="article-text">
              Article text
            </label>
  
            <textarea
              id="article-text"
              value={articleText}
              onChange={(event) => setArticleText(event.target.value)}
              placeholder="Paste the article text here..."
              rows={10}
            />
  
            <div className="field-footer">
              <span>
                {articleText.length} characters
              </span>
  
              <span>
                RawSignal accepts plain text
              </span>
            </div>
  
          </div>
  
          <div className="input-divider">
            <span>OR</span>
          </div>
  
          {/* URL */}
          <div className="field-group">
  
            <label htmlFor="article-url">
              Article URL
            </label>
  
            <input
              id="article-url"
              type="url"
              value={articleUrl}
              onChange={(event) => setArticleUrl(event.target.value)}
              placeholder="https://example.com/news/article"
            />
  
          </div>
  
          {/* Button */}
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
  
      </section>
    );
  }
  
  export default ArticleInput;

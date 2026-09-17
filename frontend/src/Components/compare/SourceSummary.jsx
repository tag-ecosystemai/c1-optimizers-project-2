function SourceSummary({ article, sourceNumber }) {
    return (
      <article className="source-summary-card">
  
        <div className="source-summary-top">
  
          <span className="source-number">
            {String(sourceNumber).padStart(2, "0")}
          </span>
  
          <span className="article-source">
            {article.source}
          </span>
  
        </div>
  
        <h3>
          {article.title}
        </h3>
  
        <div className="source-meta">
          {article.author}
          <span>•</span>
          {article.published}
        </div>
  
        <div className="source-summary-divider" />
  
        <span className="section-label">
          Neutral summary
        </span>
  
        <p className="source-summary-text">
          {article.summary}
        </p>
  
        <div className="source-tone">
          <span>Overall tone</span>
  
          <strong>
            {article.tone}
          </strong>
        </div>
  
      </article>
    );
  }
  
  export default SourceSummary;
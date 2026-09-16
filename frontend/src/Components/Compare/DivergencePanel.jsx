function DivergencePanel({ divergences }) {
    return (
      <section className="divergence-panel">
  
        <div className="divergence-header">
  
          <div>
            <span className="eyebrow">
              DIVERGENCE
            </span>
  
            <h2>
              Where the coverage differs
            </h2>
          </div>
  
          <div className="divergence-count">
            {divergences.length}
          </div>
  
        </div>
  
        <div className="divergence-list">
  
          {divergences.map((item, index) => (
            <div
              className="divergence-item"
              key={index}
            >
  
              <div className="divergence-icon">
                {index + 1}
              </div>
  
              <div className="divergence-content">
  
                <span className="divergence-category">
                  {item.category}
                </span>
  
                <h3>
                  {item.title}
                </h3>
  
                <div className="divergence-columns">
  
                  <div>
                    <span className="divergence-source">
                      Source A
                    </span>
  
                    <p>
                      {item.sourceA}
                    </p>
                  </div>
  
                  <div>
                    <span className="divergence-source">
                      Source B
                    </span>
  
                    <p>
                      {item.sourceB}
                    </p>
                  </div>
  
                </div>
  
              </div>
  
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default DivergencePanel;
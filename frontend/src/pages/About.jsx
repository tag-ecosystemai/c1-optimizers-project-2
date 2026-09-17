function About() {

    const taxonomy = [
      {
        name: "Emotional language",
        description:
          "Words or phrases designed to evoke an emotional response rather than simply describe an event.",
        example:
          '"shocking decision"'
      },
  
      {
        name: "Loaded language",
        description:
          "Language that carries a strong positive or negative association and can influence how a reader interprets a subject.",
        example:
          '"disastrous policy"'
      },
  
      {
        name: "Framing",
        description:
          "The way information is selected, emphasized, or presented to encourage a particular interpretation.",
        example:
          '"ordinary citizens"'
      },
  
      {
        name: "Absolutist language",
        description:
          "Statements that present an idea as completely certain or universally true without acknowledging nuance.",
        example:
          '"everyone agrees"'
      },
  
      {
        name: "Generalisation",
        description:
          "Broad claims about a group, event, or situation that may not account for important differences or exceptions.",
        example:
          '"politicians always..."'
      }
    ];
  
    return (
      <div className="page about-page">
  
        <section className="about-hero">
  
          <span className="eyebrow">
            ABOUT RAWSIGNAL
          </span>
  
          <h1>
            Understanding the signal behind the story.
          </h1>
  
          <p>
            RawSignal is designed to help readers identify how language
            can shape the way a news story is understood.
          </p>
  
        </section>
  
  
        {/* What RawSignal does */}
  
        <section className="about-section">
  
          <div className="about-section-label">
            01
          </div>
  
          <div className="about-section-content">
  
            <h2>
              What RawSignal does
            </h2>
  
            <p>
              RawSignal takes news articles and produces a neutral
              summary while identifying passages that contain potentially
              subjective, emotionally charged, or otherwise influential
              language.
            </p>
  
            <p>
              It can also compare coverage from different outlets to
              highlight differences in framing, emphasis, and tone.
            </p>
  
          </div>
  
        </section>
  
  
        {/* Model */}
  
        <section className="about-section">
  
          <div className="about-section-label">
            02
          </div>
  
          <div className="about-section-content">
  
            <h2>
              How the model works
            </h2>
  
            <p>
              RawSignal combines language analysis and generative AI
              techniques to identify potentially influential wording and
              produce neutral summaries.
            </p>
  
            <div className="model-flow">
  
              <div>
                <strong>01</strong>
                <span>Article input</span>
              </div>
  
              <div className="flow-arrow">→</div>
  
              <div>
                <strong>02</strong>
                <span>Language analysis</span>
              </div>
  
              <div className="flow-arrow">→</div>
  
              <div>
                <strong>03</strong>
                <span>Neutral summary</span>
              </div>
  
              <div className="flow-arrow">→</div>
  
              <div>
                <strong>04</strong>
                <span>Comparison</span>
              </div>
  
            </div>
  
          </div>
  
        </section>
  
  
        {/* Taxonomy */}
  
        <section className="about-section taxonomy-section">
  
          <div className="about-section-label">
            03
          </div>
  
          <div className="about-section-content">
  
            <h2>
              Language taxonomy
            </h2>
  
            <p>
              RawSignal groups potentially influential language into
              several categories. These labels describe language patterns;
              they do not automatically mean that an article is intentionally
              biased.
            </p>
  
            <div className="taxonomy-grid">
  
              {taxonomy.map((item, index) => (
  
                <article
                  className="taxonomy-card"
                  key={item.name}
                >
  
                  <span className="taxonomy-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
  
                  <h3>
                    {item.name}
                  </h3>
  
                  <p>
                    {item.description}
                  </p>
  
                  <div className="taxonomy-example">
                    Example: {item.example}
                  </div>
  
                </article>
  
              ))}
  
            </div>
  
          </div>
  
        </section>
  
  
        {/* Limitations */}
  
        <section className="about-section limitations-section">
  
          <div className="about-section-label">
            04
          </div>
  
          <div className="about-section-content">
  
            <h2>
              Honest limitations
            </h2>
  
            <div className="limitations-grid">
  
              <div>
                <h3>
                  Detection is not proof of bias
                </h3>
  
                <p>
                  A highlighted phrase may be completely appropriate
                  depending on the context. RawSignal identifies patterns;
                  it does not determine journalistic intent.
                </p>
              </div>
  
              <div>
                <h3>
                  Models can make mistakes
                </h3>
  
                <p>
                  AI systems can misunderstand context, sarcasm, cultural
                  references, or ambiguous language.
                </p>
              </div>
  
              <div>
                <h3>
                  Neutrality is difficult
                </h3>
  
                <p>
                  A summary can reduce subjective language without being
                  perfectly neutral. What information is included or
                  excluded can itself affect interpretation.
                </p>
              </div>
  
              <div>
                <h3>
                  Use RawSignal as a reading aid
                </h3>
  
                <p>
                  The tool is intended to encourage critical reading and
                  comparison, not to tell users what to believe.
                </p>
              </div>
  
            </div>
  
          </div>
  
        </section>
  
      </div>
    );
  }
  
  export default About;
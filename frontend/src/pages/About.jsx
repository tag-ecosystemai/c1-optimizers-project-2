function About() {

  const philosophy = [
    {
      title: "The Signal Above the Noise",
      description:
        "In an era of information saturation, the greatest challenge isn't finding news — it's distilling truth. RawSignal was born from the necessity to strip away the emotional veneers and rhetorical flourishes that often cloud objective reporting.",
    },
    {
      title: "Algorithmic Neutrality",
      description:
        "Our models don't tell you what to think; they show you how you're being influenced. By identifying emotionally charged language and framing techniques, we empower readers to reclaim their own interpretation of world events.",
    },
    {
      title: "Structural Literacy",
      description:
        "We believe media literacy is a fundamental civic duty. RawSignal provides the structural analysis tools necessary to understand the scaffolding of an argument, making the invisible mechanics of persuasion visible.",
    },
  ];

  const taxonomy = [
    {
      name: "Emotional Amplification",
      description: "Strongly loaded or emotionally charged words used where neutral language would state the same fact.",
      example: '"reckless decision" instead of "decision"',
    },
    {
      name: "Weasel Attribution",
      description: "A claim attributed to a vague, unnamed source (\"critics say\", \"many believe\") instead of a specific person or group.",
      example: '"critics say the policy was rushed"',
    },
    {
      name: "Certainty Distortion",
      description: "A claim stated with more confidence than the facts support, or hedged language used to imply something without proof.",
      example: '"undoubtedly the worst decision" / "may have caused"',
    },
    {
      name: "Implicit Judgment",
      description: "A verdict about a person or action implied through word choice or sentence structure, rather than stated directly.",
      example: '"the policy was rushed through" (passive framing)',
    },
    {
      name: "Selective Emphasis",
      description: "Absolute or emphatic framing that may overstate a claim by omitting nuance or exceptions.",
      example: '"every voter agrees..."',
    },
    {
      name: "Dehumanising / Glorifying Framing",
      description: "Metaphor or labelling that strips a person or group of individuality, or elevates them beyond what the facts support.",
      example: '"the police state" / "the industry\'s new champions"',
    },
    {
      name: "General Subjective Language",
      description: "Flagged as biased by our classifier, but not clearly matching one of the six specific patterns above — a catch-all, shown so nothing is hidden from you.",
      example: 'varies by sentence',
    },
  ];

  return (
    <div className="page about-page">

      <section className="about-hero">
        <span className="eyebrow">OUR STORY</span>
        <h1>Understanding the signal behind the story.</h1>
        <p>
          RawSignal is a media literacy tool designed to help readers identify
          how language can shape the way a news story is understood, fostering
          a more objective and critical approach to information consumption.
        </p>
      </section>

      <section className="about-section">
        <div className="about-section-label">01</div>
        <div className="about-section-content">
          <span className="eyebrow">PHILOSOPHY</span>
          <h2>Built for the critical reader who demands clarity.</h2>

          {philosophy.map((item, index) => (
            <div className="philosophy-item" key={item.title}>
              <span className="philosophy-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-label">02</div>
        <div className="about-section-content">
          <h2>What RawSignal does</h2>
          <p>
            RawSignal takes news articles and produces a neutral summary while
            identifying passages that contain potentially subjective,
            emotionally charged, or otherwise influential language.
          </p>
          <p>
            It can also compare coverage from different outlets to highlight
            differences in framing, emphasis, and tone.
          </p>
        </div>
      </section>

      <section className="about-section taxonomy-section">
        <div className="about-section-label">03</div>
        <div className="about-section-content">
          <h2>Language taxonomy</h2>
          <p>
            RawSignal detects seven patterns of potentially influential
            language, each identified by an independent rule or model rather
            than a single black-box score. These labels describe language
            patterns; they do not automatically mean that an article is
            intentionally biased.
          </p>

          <div className="taxonomy-grid">
            {taxonomy.map((item, index) => (
              <article className="taxonomy-card" key={item.name}>
                <span className="taxonomy-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="taxonomy-example">Example: {item.example}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section responsible-ai-section">
        <div className="about-section-label">04</div>
        <div className="about-section-content">
          <span className="eyebrow">RESPONSIBLE AI</span>
          <h2>Neutrality, transparency, honest limits.</h2>
          <p>
            We designed RawSignal around three commitments, and we can show
            our work for each one.
          </p>

          <div className="responsible-ai-grid">
            <div className="responsible-ai-card">
              <h3>Neutrality</h3>
              <p>
                Our summarizer is explicitly instructed to avoid opinion and
                loaded language, and our bias classifier is trained without
                any signal about an outlet's political leaning — it judges
                sentence-level language patterns only, not who published them.
              </p>
            </div>
            <div className="responsible-ai-card">
              <h3>Transparency</h3>
              <p>
                Every flagged sentence comes with a plain-language explanation
                naming the specific words or structure that triggered it —
                never just a score. Every AI-generated summary carries a
                visible disclaimer, and we independently check summaries
                against the source article for invented names or
                organisations, flagging anything we can't verify.
              </p>
            </div>
            <div className="responsible-ai-card">
              <h3>Honest limits</h3>
              <p>
                Our bias classifier is measured at roughly 66% accuracy,
                benchmarked against three alternative models. We tested using
                our local language model to categorise bias directly and
                found it unreliable — it is used only for summarisation,
                never for the bias judgments themselves. Some websites resist
                automated fetching, and we tell you when that happens instead
                of failing silently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section limitations-section">
        <div className="about-section-label">05</div>
        <div className="about-section-content">
          <h2>Honest limitations</h2>

          <div className="limitations-grid">
            <div>
              <h3>Detection is not proof of bias</h3>
              <p>A highlighted phrase may be completely appropriate depending on the context. RawSignal identifies patterns; it does not determine journalistic intent.</p>
            </div>
            <div>
              <h3>Models can make mistakes</h3>
              <p>AI systems can misunderstand context, sarcasm, cultural references, or ambiguous language.</p>
            </div>
            <div>
              <h3>Neutrality is difficult</h3>
              <p>A summary can reduce subjective language without being perfectly neutral. What information is included or excluded can itself affect interpretation.</p>
            </div>
            <div>
              <h3>Use RawSignal as a reading aid</h3>
              <p>The tool is intended to encourage critical reading and comparison, not to tell users what to believe.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
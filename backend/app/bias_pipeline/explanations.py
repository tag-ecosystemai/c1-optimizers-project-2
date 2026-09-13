def generate_explanation(category: str, evidence: list[str]) -> str:
    templates = {
        'Emotional Amplification': f"This sentence uses strongly loaded words ({', '.join(evidence)}) instead of neutral language.",
        'Weasel Attribution': f"This sentence attributes a claim using '{evidence[0]}' without naming a specific source." if evidence else "This sentence attributes a claim without naming a specific source.",
        'Certainty Distortion': f"This sentence uses words like '{', '.join(evidence)}' that overstate or hedge certainty.",
        'Implicit Judgment': "This sentence uses passive voice, which can imply judgment while avoiding a direct claim.",
        'Selective Emphasis': f"This sentence uses absolute or emphatic framing ('{', '.join(evidence)}') that may overstate the case.",
        'Dehumanising/Glorifying Framing': f"This sentence uses framing language ({', '.join(evidence)}) that dehumanises or glorifies its subject.",
        'General Subjective Language': "This sentence was flagged as biased, but doesn't clearly match a specific pattern in our system.",
    }
    return templates.get(category, "This sentence was flagged as potentially biased.")
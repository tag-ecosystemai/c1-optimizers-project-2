const mockAnalysis = {
    article: {
      title:
        "Government announces new economic measures amid rising public concern",
  
      source: "The Daily Report",
  
      author: "James Anderson",
  
      published: "September 14, 2026",
  
      text: `The government has announced a shocking new economic policy that critics say could devastate thousands of families. The controversial decision was unveiled yesterday as officials attempted to defend the measure.
  
  Opposition leaders described the policy as a disastrous move and accused the government of ignoring ordinary citizens. Supporters, however, argued that the reforms were necessary to address the country's growing economic challenges.
  
  Experts have warned that the policy could create serious difficulties in the short term, although government officials maintain that the measures will eventually improve economic stability.`
    },
  
    summary:
      "The government has announced a new economic policy aimed at addressing economic challenges. Critics argue that the policy could negatively affect families, while supporters say the reforms are necessary for long-term economic stability.",
  
    highlights: [
      {
        text: "shocking",
        category: "emotional_language",
        start: 33,
        end: 41
      },
  
      {
        text: "devastate",
        category: "loaded_language",
        start: 86,
        end: 94
      },
  
      {
        text: "controversial",
        category: "loaded_language",
        start: 154,
        end: 166
      },
  
      {
        text: "disastrous",
        category: "emotional_language",
        start: 259,
        end: 269
      },
  
      {
        text: "ignoring ordinary citizens",
        category: "framing",
        start: 306,
        end: 330
      }
    ],
  
    analysis: {
      totalHighlights: 5,
  
      categories: {
        emotional_language: 2,
        loaded_language: 2,
        framing: 1
      }
    }
  };
  
  export default mockAnalysis;

export const mockComparison = {
    articles: [
      {
        source: "The Daily Report",
        title: "Government announces new economic measures",
        author: "James Anderson",
        published: "September 14, 2026",
        tone: "Critical",
        summary:
          "The government has introduced economic measures intended to address current economic challenges. Critics have questioned their potential impact on families."
      },
  
      {
        source: "Global News Network",
        title: "New reforms target economic stability",
        author: "Sarah Mitchell",
        published: "September 14, 2026",
        tone: "Optimistic",
        summary:
          "The government has introduced reforms designed to improve economic stability. Supporters describe the measures as necessary for long-term growth."
      }
    ],
  
    divergences: [
      {
        category: "Framing",
        title: "Different focus",
        sourceA:
          "Focuses primarily on the potential negative impact on families.",
        sourceB:
          "Focuses primarily on the potential long-term economic benefits."
      },
  
      {
        category: "Tone",
        title: "Different overall tone",
        sourceA:
          "Uses more critical language when describing the policy.",
        sourceB:
          "Presents the reforms in a more positive and forward-looking way."
      },
  
      {
        category: "Emphasis",
        title: "Different voices",
        sourceA:
          "Gives significant attention to opposition criticism.",
        sourceB:
          "Gives greater attention to government and supporter statements."
      }
    ]
  };  

  


export const mockWritingAnalysis = {
    score: 72,
  
    suggestions: [
      {
        category: "Emotional language",
        original: "shocking",
        message:
          "This word introduces an emotional reaction rather than describing the event.",
        alternative:
          "unexpected"
      },
  
      {
        category: "Loaded language",
        original: "disastrous",
        message:
          "This term strongly characterizes the outcome and may influence the reader's perception.",
        alternative:
          "potentially harmful"
      },
  
      {
        category: "Framing",
        original: "ordinary citizens",
        message:
          "This framing creates a distinction between the public and other groups.",
        alternative:
          "members of the public"
      }
    ]
  };  
  
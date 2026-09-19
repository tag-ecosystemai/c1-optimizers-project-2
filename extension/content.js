function extractPageText() {
  // Simple heuristic: grab all paragraph text, works reasonably on most article pages
  const paragraphs = Array.from(document.querySelectorAll("p"));
  return paragraphs.map(p => p.innerText).join("\n\n");
}

function highlightSentences(sentences) {
  const biasedSentences = sentences.filter(s => s.is_biased && s.categories.length > 0);
  if (biasedSentences.length === 0) return;

  const categoryMap = {
    "Emotional Amplification": "emotional_language",
    "Weasel Attribution": "loaded_language",
    "Certainty Distortion": "absolutist_language",
    "Implicit Judgment": "framing",
    "Selective Emphasis": "framing",
    "Dehumanising/Glorifying Framing": "loaded_language",
    "General Subjective Language": "generalisation",
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      // Skip script/style tags and already-highlighted marks
      const parentTag = node.parentElement?.tagName;
      if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "MARK") {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  // Collect text nodes first (modifying the DOM while walking breaks the walker)
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  biasedSentences.forEach(sentence => {
    const category = categoryMap[sentence.categories[0]] || "generalisation";
    const target = sentence.text.trim();
    if (!target) return;

    for (const textNode of textNodes) {
      const content = textNode.textContent;
      const index = content.indexOf(target);
      if (index === -1) continue;

      const before = content.slice(0, index);
      const match = content.slice(index, index + target.length);
      const after = content.slice(index + target.length);

      const mark = document.createElement("mark");
      mark.className = `rawsignal-highlight ${category}`;
      mark.title = sentence.explanations?.[0] || sentence.categories.join(", ");
      mark.textContent = match;

      const parent = textNode.parentNode;
      const beforeNode = document.createTextNode(before);
      const afterNode = document.createTextNode(after);

      parent.insertBefore(beforeNode, textNode);
      parent.insertBefore(mark, textNode);
      parent.insertBefore(afterNode, textNode);
      parent.removeChild(textNode);

      break; // found and highlighted this sentence, move to the next one
    }
  });
}

function injectSidebar(sentences) {
  // Remove any existing sidebar first, in case of re-analysis
  const existing = document.getElementById("rawsignal-sidebar");
  if (existing) existing.remove();

  const biasedSentences = sentences.filter(s => s.is_biased && s.categories.length > 0);

  const sidebar = document.createElement("div");
  sidebar.id = "rawsignal-sidebar";

  const header = document.createElement("div");
  header.className = "rawsignal-sidebar-header";
  header.innerHTML = `
    <strong>RawSignal</strong>
    <span class="rawsignal-count">${biasedSentences.length} signals</span>
    <button id="rawsignal-close">×</button>
  `;
  sidebar.appendChild(header);

  const list = document.createElement("div");
  list.className = "rawsignal-sidebar-list";

  const categoryMap = {
    "Emotional Amplification": "emotional_language",
    "Weasel Attribution": "loaded_language",
    "Certainty Distortion": "absolutist_language",
    "Implicit Judgment": "framing",
    "Selective Emphasis": "framing",
    "Dehumanising/Glorifying Framing": "loaded_language",
    "General Subjective Language": "generalisation",
  };

  biasedSentences.forEach(sentence => {
    const category = categoryMap[sentence.categories[0]] || "generalisation";
    const item = document.createElement("div");
    item.className = `rawsignal-item ${category}`;
    item.innerHTML = `
      <span class="rawsignal-item-category">${sentence.categories[0]}</span>
      <p class="rawsignal-item-text">"${sentence.text}"</p>
      <p class="rawsignal-item-explanation">${sentence.explanations?.[0] || ""}</p>
    `;

    // Clicking an item scrolls to the matching highlight on the page
    item.addEventListener("click", () => {
      const marks = document.querySelectorAll("mark.rawsignal-highlight");
      for (const mark of marks) {
        if (mark.textContent === sentence.text.trim()) {
          mark.scrollIntoView({ behavior: "smooth", block: "center" });
          mark.style.outline = "2px solid #2d5aef";
          setTimeout(() => { mark.style.outline = "none"; }, 1500);
          break;
        }
      }
    });

    list.appendChild(item);
  });

  sidebar.appendChild(list);
  document.body.appendChild(sidebar);

  document.getElementById("rawsignal-close").addEventListener("click", () => {
    sidebar.remove();
  });
}

// Listen for a message from the popup asking for the page's text
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageText") {
    sendResponse({ text: extractPageText() });
  }
  if (request.action === "highlightResults") {
    if (!request.sentences || !Array.isArray(request.sentences)) {
      console.error("RawSignal: sentences missing or not an array");
      sendResponse({ ok: false });
      return;
    }
    highlightSentences(request.sentences);
    injectSidebar(request.sentences);
    sendResponse({ ok: true });
  }
});
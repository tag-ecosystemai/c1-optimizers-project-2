const API_BASE = "https://rawsignal-backend.onrender.com";

document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const statusEl = document.getElementById("status");
  statusEl.textContent = "Analysing (this can take up to a minute)...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: "getPageText" }, async (response) => {
    if (chrome.runtime.lastError || !response || !response.text) {
      statusEl.textContent = "Couldn't read this page's text. Try reloading the page.";
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: response.text.slice(0, 20000) }),
      });

      const data = await res.json();
      console.log("RawSignal API response:", data);

      if (!res.ok || !data.sentences) {
        statusEl.textContent = "Analysis error: " + (data.detail || "Unexpected response from server.");
        return;
      }

      // Re-inject a fresh content script right before messaging it,
      // in case the original one went stale during the long analysis wait.
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      chrome.tabs.sendMessage(tab.id, { action: "highlightResults", sentences: data.sentences }, () => {
        if (chrome.runtime.lastError) {
          console.error("RawSignal sendMessage error:", chrome.runtime.lastError.message);
          statusEl.textContent = `Found ${data.sentences.filter(s => s.is_biased).length} signals. (${chrome.runtime.lastError.message})`;
        } else {
          statusEl.textContent = `Found ${data.sentences.filter(s => s.is_biased).length} signals.`;
        }
      });

    } catch (err) {
      statusEl.textContent = "Analysis failed: " + err.message;
    }
  });
});
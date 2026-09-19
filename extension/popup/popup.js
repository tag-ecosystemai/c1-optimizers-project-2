async function analyzeArticle() {
    console.log("Popup: Starting analysis");
    
    try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        console.log("Popup: Active tab:", tab.url);
        
        chrome.tabs.sendMessage(tab.id, {type: "GET_ARTICLE_TEXT"}, async (response) => {
            if (response && response.success) {
                const articleText = response.text;
                console.log("Got article text, length:", articleText.length);
                
                try {
                    const backendResponse = await fetch("http://localhost:8001/analyze", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({text: articleText})
                    });
                    
                    if (!backendResponse.ok) {
                        throw new Error("Backend error: " + backendResponse.status);
                    }
                    
                    const result = await backendResponse.json();
                    console.log("Backend response:", result);
                    displayResults(result);
                } catch (error) {
                    console.error("Backend call failed:", error);
                    showError("Backend error: " + error.message);
                }
            } else {
                showError("Could not extract article text from this page.");
            }
        });
    } catch (error) {
        console.error("Error:", error);
        showError("Error: " + error.message);
    }
}

function displayResults(result) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
    
    const biasPercentage = Math.round(result.bias_ratio * 100);
    document.getElementById("score").textContent = biasPercentage;
    
    const totalSentences = result.sentences.length;
    const biasedSentences = result.sentences.filter(s => s.is_biased).length;
    document.getElementById("summary-text").textContent = 
        `${biasedSentences} out of ${totalSentences} sentences contain biased language.`;
    
    const flagList = document.getElementById("flag-list");
    flagList.innerHTML = "";
    
    const seenFlags = new Set();
    result.sentences.forEach(sentence => {
        if (sentence.is_biased && sentence.categories.length > 0) {
            sentence.categories.forEach((cat, idx) => {
                const key = cat + "|" + sentence.text.substring(0, 20);
                if (!seenFlags.has(key)) {
                    seenFlags.add(key);
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${cat}</strong>: "${sentence.text.substring(0, 60)}..."`;
                    flagList.appendChild(li);
                }
            });
        }
    });
    
    if (flagList.children.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No specific bias categories detected.";
        flagList.appendChild(li);
    }
}

function showError(message) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "block";
    analyzeArticle();
});

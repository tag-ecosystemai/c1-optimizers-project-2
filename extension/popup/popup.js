// Step 1: When popup opens, ask the content script for article text
async function analyzeArticle() {
    console.log("Popup: Starting analysis");
    
    try {
        // Get the active tab
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        console.log("Popup: Active tab:", tab.url);
        
        // Send message to content script: "Give me the article text"
        chrome.tabs.sendMessage(tab.id, {type: "GET_ARTICLE_TEXT"}, (response) => {
            console.log("Popup: Got response from content script:", response);
            
            if (response && response.success) {
                // We got the article text!
                const articleText = response.text;
                
                // Analyze it (mock for now, but we have REAL text now)
                const analysisResult = analyzeText(articleText);
                displayResults(analysisResult);
            } else {
                showError("Could not extract article text. Make sure you're on a news website.");
            }
        });
    } catch (error) {
        console.error("Popup: Error:", error);
        showError("Error: " + error.message);
    }
}

// Step 2: Analyze the article text (mock version)
// Later we'll send this to the backend
function analyzeText(articleText) {
    console.log("Analyzing text, length:", articleText.length);
    
    // For now, generate mock results based on the article length
    // This shows the results will be DIFFERENT for different articles
    const wordCount = articleText.split(" ").length;
    
    // Mock analysis - in reality this comes from your backend
    return {
        summary: `Article with ${wordCount} words. Government official announced new policy changes. Decision was made after recent discussions with stakeholders.`,
        bias_flags: [
            {text: "devastating", category: "Emotional Amplification", reason: "Intensifies emotional impact"},
            {text: "finally admitted", category: "Implicit Judgment", reason: "Suggests guilt or reluctance"}
        ],
        loaded_language_percentage: Math.min(Math.floor(wordCount / 50), 25) // Scale 0-25%
    };
}

// Step 3: Display results in the popup
function displayResults(result) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
    
    // Show the score
    document.getElementById("score").textContent = result.loaded_language_percentage;
    
    // Show the summary
    document.getElementById("summary-text").textContent = result.summary;
    
    // Show the flags
    const flagList = document.getElementById("flag-list");
    flagList.innerHTML = "";
    result.bias_flags.forEach(flag => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>"${flag.text}"</strong> — ${flag.category}: ${flag.reason}`;
        flagList.appendChild(li);
    });
}

// Step 4: Show error message
function showError(message) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent = message;
}

// Step 5: Start when popup opens
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "block";
    analyzeArticle();
});

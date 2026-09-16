console.log("RawSignal content script loaded on:", window.location.href);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);
    
    if (message.type === "GET_ARTICLE_TEXT") {
        // Extract all visible text from the page
        const articleText = document.body.innerText;
        
        console.log("Article text extracted, length:", articleText.length);
        
        // Send it back to the popup immediately
        sendResponse({
            success: true,
            text: articleText,
            url: window.location.href,
            title: document.title
        });
    }
});

// Tell the popup we're ready
console.log("Content script ready to receive messages");

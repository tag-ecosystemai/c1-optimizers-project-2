function getPageText() {
    return document.body.innerText;
}

const articleText= getPageText();

console.log("Raw signal is analyzing:", document.title);
console.log("URL:",window.location.href);
console.log("Article preview:",articleText.substring(0,500));



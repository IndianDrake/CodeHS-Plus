document.getElementById("showInstructionsBtn").addEventListener("click", function(){
    chrome.tabs.executeScript({
        code: 
        ` 
        document.getElementById("blur").style.display = "block"
        document.getElementsByClassName("circle")[0].style.display = "block"
        document.getElementsByClassName("tooltiptext")[0].style.display = "block"
        `
    });
});

document.getElementById("hideSolutionBtn").addEventListener("click", function(){
    chrome.tabs.executeScript({
        code: 
        ` 
        document.getElementById("openBtnContainer").style.display = "none"
        `
    });
});

document.getElementById("showSolutionBtn").addEventListener("click", function () {
    chrome.tabs.executeScript({
        code: 
        `
        document.getElementById("modal").style.display = "block"
        document.getElementById("blur").style.display = "block"
        `
    });
});

document.getElementById("injectBtn").addEventListener("click", function () {
    chrome.tabs.executeScript({
        file: "main.js"
    });
});

document.getElementById("discordBtn").addEventListener("click", function () {
    window.open("https://discord.gg/gNTmBrdyAv");
});
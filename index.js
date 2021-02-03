/*! CodeHS Plus v0.1.1 | (c) https://github.com/Viper5077 */

/*
FOR EDUCATIONAL/LEARNING PURPOSES ONLY

Developer(s) of this script are in no way responsible for anything that happens to any user using this script. 
Developer(s) assume no liability and are not responsible for any misuse or damage caused by this script.
*/

var url, id, solutionCode;

function inject() {
    if (document.getElementById("solutionCode") == null) {
        if (document.querySelectorAll("[data-item-id]")[0] != null) {
            var xhr = new XMLHttpRequest();
            id = document.querySelectorAll("[data-item-id]")[0].getAttribute("data-item-id")
            url = `https://codehs.com/editor/ajax/get_solution_code?itemID=${id}`;
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    solutionCode = JSON.parse(JSON.parse(this.responseText).solutionCodeJson);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        } else {
            solutionCode = "CodeHS Plus only supports coding assignments. \nCodeHS Plus does NOT support quizzes, FRQs, and other assignement types\n\nIf you believe this is an error, please email c.ViperDevelopment@gmail.com\nor join the discord (https://discord.gg/gNTmBrdyAv)"
        }
        var style = document.createElement("STYLE");
        style.type = "text/css";
        style.innerText = `
        #container {
            width: 50%;
            height: 75%;
            background-color: white;
            z-index: 999;
            position: fixed;
            left: 25%;
            top: 10%;
            padding: 5rem;
            white-space: pre;
            overflow: scroll;
        }

        #blur{
            width: 100%;
            height: 100%;
            opacity: .5;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 998;
            background-color: #363C49;
        }

        .button{
            color: #F2F2F7;
            padding: 1rem;
            outline: none;
            background-color: #0E71EB;
            border: none;
            border-radius: .5rem;
            margin: 1rem;
        }

        #header{
            background-color: lightgrey;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 5rem;
            position: fixed;
            left: 0px;
            bottom: 0px;
        }

        #info {
            background-color: lightgray;
            width: 100%;
            z-index: 999;
            position: fixed;
            bottom: 5rem;
            left: 0px;
            text-align: center;
            padding: 1rem;

        }

        #solutionCode{
            font-family: "Lucida Console", "Courier New", monospace;
        }
        `
        document.head.appendChild(style);

        var container = document.createElement("DIV");
        container.id = "container";

        var solutionCodeDiv = document.createElement("DIV");
        solutionCodeDiv.id = "solutionCode";
        solutionCodeDiv.innerText = "loading...";

        var backBlur = document.createElement("DIV");
        backBlur.id = "blur";

        var header = document.createElement("DIV");
        header.id = "header";

        var closeBtn = document.createElement("BUTTON");
        closeBtn.id = "close"
        closeBtn.classList.add("button")
        closeBtn.innerText = "Close"

        var relaunchBtn = document.createElement("BUTTON")
        relaunchBtn.id = "relaunch";
        relaunchBtn.classList.add("button");
        relaunchBtn.innerText = "Relaunch";

        var copyBtn = document.createElement("BUTTON");
        copyBtn.id = "copy";
        copyBtn.classList.add("button");
        copyBtn.innerText = "Copy";

        var info = document.createElement("DIV");
        info.id = "info";
        info.innerText = "Looking for a different class/file? Press Relaunch! (May take multiple tries)";

        var openBtn = document.createElement("LI");
        openBtn.id = "open";

        var openTxt = document.createElement("A");
        openTxt.innerText = "Solution Code";

        document.body.appendChild(container);
        document.body.appendChild(backBlur);
        document.body.appendChild(info);
        document.getElementById("container").appendChild(solutionCodeDiv);
        document.getElementById("container").appendChild(header);
        document.getElementById("header").appendChild(closeBtn);
        document.getElementById("header").appendChild(relaunchBtn);
        document.getElementById("header").appendChild(copyBtn);
        document.getElementsByClassName("navbar-left")[0].appendChild(openBtn);
        openBtn.appendChild(openTxt);
        close();

        setTimeout(function () {
            document.getElementById("solutionCode").innerText = solutionCode;
        }, 2500);

        document.getElementById("relaunch").addEventListener("click", relaunch);
        document.getElementById("close").addEventListener("click", close);
        document.getElementById("copy").addEventListener("click", CopyToClipboard);
        document.getElementById("blur").addEventListener("click", close);
        document.getElementById("open").addEventListener("click", open);
    } else {
        console.log("already injected")
        open();
    }

    var observer = new MutationObserver(function (mutations, me) {
        var element = document.getElementById("open");
        if (element == null) {
            inject();
            me.disconnect();
            return;
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

function open() {
    document.getElementById("container").style.display = "block"
    document.getElementById("blur").style.display = "block"
    document.getElementById("info").style.display = "block"
}

function close() {
    document.getElementById("container").style.display = "none"
    document.getElementById("blur").style.display = "none"
    document.getElementById("info").style.display = "none"
}

function CopyToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("solutionCode"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Copied!")
}

function relaunch() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("solutionCode").innerText = JSON.parse(JSON.parse(this.responseText).solutionCodeJson);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

inject();

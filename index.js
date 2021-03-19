/*! CodeHS Plus v0.1.1 | (c) https://github.com/Viper5077 */

/*
FOR EDUCATIONAL/LEARNING PURPOSES ONLY

Developer(s) of this script are in no way responsible for anything that happens to any user using this script. 
Developer(s) assume no liability and are not responsible for any misuse or damage caused by this script.
*/

var url, id, filesCount;
var solutionCode = []

function inject() {
    if (document.getElementById("solutionCodeDiv") == null) {
        solutionCode = []
        filesCount = 0;
        if (document.querySelectorAll("[data-item-id]")[0] != null) {
            var xhr = new XMLHttpRequest();
            id = document.querySelectorAll("[data-item-id]")[0].getAttribute("data-item-id")
            url = `https://codehs.com/editor/ajax/get_solution_code?itemID=${id}`;
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    solutionCode[0] = JSON.parse(JSON.parse(this.responseText).solutionCodeJson);
                }
            };
            xhr.open("GET", url, false);
            xhr.send();
        } else {
            solutionCode[0] = "CodeHS Plus only supports coding assignments. \nCodeHS Plus does NOT support quizzes, FRQs, and other assignement types\n\nIf you believe this is an error, please email c.ViperDevelopment@gmail.com\nor join the discord (https://discord.gg/gNTmBrdyAv)"
        }
        var style = document.createElement("STYLE");
        style.type = "text/css";
        style.innerText =
        `
        #mainContainer {
            width: 70%;
            height: 75%;
            background-color: white;
            z-index: 999;
            position: fixed;
            left: 15%;
            top: 10%;
            padding: 5rem;
            white-space: pre;
            overflow: scroll;
            border-radius: 5px; 
        }

        #mainContainer::-webkit-scrollbar {
            display: none;
        }

        #blur{
            width: 100%;
            height: 100%;
            opacity: .5;
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 998;
            background-color: #363C49;
        }

        #solutionCodeDiv {
            position: absolute;
            left: 25%;
            width: 50%;
            top: 0%;
            margin-top: -2rem;
        }

        #filesContainer, #menuContainer{
            padding-top: 5rem;
            padding-right: 0px;
            padding-bottom: 5rem;
            background: #f2f2f2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            position: fixed;
            top: 10%;
            width: 15%;
            height: 75%;
        }

        #filesContainer{
            left: 15%;
            border-radius: 5px 0px 0px 5px;
            
        }

        #menuContainer{
            left: 70%;
            border-radius: 0px 5px 5px 0px;
        }
        
        #detectedFiles{
            position: absolute;
            bottom: 0px;
            left: 0px;
            background-color: #27a9e1;
            color: white;
            width: 100%;
            height:fit-content;
            text-align: center;
            padding: 10px;
            font-weight: bold;
            border-radius: 0px 0px 0px 5px;
        }

        #filesTitle{
            position: absolute;
            top: 5%;
        }

        .title{
            font-weight: 200;
            color: #555;
            letter-spacing: 1px;
        }

        .files{
            width: 80%;
            border-radius: 5px;
            border-width: 1px;
            border-color: transparent;
            border-style: solid;
            background-color: white;
            height: fit-content;
            padding: 10px;
            margin-bottom: 20px;
            transition-duration: .5s;
        }

        .spacer{
          background-color: #f2f2f2;
          border:none;
        }

        #menuContainer > div{
            width: 80%;
            border-radius: 5px;
            background-color: white;
            height: fit-content;
            padding: 10px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #555;
            transition-duration: .5s;

        }

        #menuContainer > div > input, #configureContainer > input{
            width: 100%;
            border-radius: 5px;
            background-color: white;
            color: #333;
            padding: 5px;
            margin-top: 5px;
            border-color: #f2f2f2;
        }

        #menuContainer > div > button, #menuContainer > button, #configureContainer > button, #openBtnContainer > span > button{
            width: 100%;
            background-color: #27a9e1;
            color: white;
            font-weight: bold;
            padding: 5px;
            margin-top: 5px;
            border: none;
            border-radius: 5px;
            outline: none;
            transition-duration: .5s;
          }
          
          #menuContainer > div > button:hover, #menuContainer > button, #configureContainer > button:hover, #openBtnContainer > span > button:hover{
            filter: brightness(90%);
          }
          
          #relaunchBtn > img{
            width: 10%;
            position: absolute;
            right: 10px;
          }

          #configureContainer{
            width:40%;
            height: fit-content;
            padding-top: 2%;
            padding-bottom: 2%;
            position: fixed;
            left: 30%;
            top: 15%;
            background-color: white;
            border-radius: 5px;
            display:none;
            z-index: 1001;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          #configureContainer > input{
            width: 50%;
          }

          #configureContainer > button{
            width: 50%;
          }

          #controlsContainer {
            position: absolute;
            bottom: 0px;
          }

          #controlsContainer > button{
            padding: 0px;
          }

          .hidden{
              display:none;
          }

          .tooltiptext {
            width: 200%;
            background-color: #28384a;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 10px 10px;
            margin-top:10px;
            position: absolute;
            z-index: 1;
          }

          .circle {
            height: 100%;
            width: 100%;
            background-color: transparent;
            border-radius: 50%;
            border: 4px solid red;
            display: inline-block;
            position: absolute;
            top: 0px;
            z-index: 1;
          }
        `
        document.head.appendChild(style);

        var mainContainer = document.createElement("DIV");
        mainContainer.id = "mainContainer";
        mainContainer.innerHTML =
        `
        <div id=filesContainer>
            <p id=filesTitle class=title>FILES</p>
            <div class="spacer files"></div>
            <div id=detectedFiles># files detected</div>
        </div>
        <div id=solutionCodeDiv>
            <pre><code id=solutionCode>loading...</code></pre>
        </div>
        <div id=menuContainer>
            <div id=renameContainer>
                <p class=title>Rename Vars</p>
                <input type=text id=oldVar placeholder="Old Variable">
                <input type=text id=newVar placeholder="New Variable">
                <button id=renameBtn>Rename</button>
            </div>
            <div>
                <p class=title>Remove Comments</p>
                <button class=hidden id=removeSingle>Single Line</button>
                <button class=hidden id=removeMulti>Multi Line</button>
                <button id=configureBtn>Configure</button>
            </div>
            <div id=controlsContainer>
                <button id=relaunchBtn>Relaunch File <img id=loadImg class=hidden src="https://thumbs.gfycat.com/DarkFlamboyantGecko-max-1mb.gif"></img></button>
                <button id=copyBtn>Copy Code</button>
                <button id=closeBtn>Close</button>
            </div>   
        </div>
        `
        var highlightcss = document.createElement("LINK");
        highlightcss.rel = "stylesheet";
        highlightcss.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css";

        var highlightjs = document.createElement("SCRIPT");
        highlightjs.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js";

        var configureContainer = document.createElement("DIV");
        configureContainer.id = "configureContainer";
        configureContainer.innerHTML =
        `
        <p class=title>Single Line Comment</p>
        <input id=singlePre type=text placeholder="Prefix"><br>
        <pre><code id=singleSample>Fill in the prefix to see a sample comment</code></pre><br><br>
        <p class=title>Multi Line Comment</p>
        <input id=multiPre type=text placeholder="Prefix">
        <input id=multiSuf type=text placeholder="Suffix"><br>
        <pre><code id=multiSample>Fill in the prefix and suffix to see a sample comment</code></pre><br>
        <button id=doneBtn>Done</button>
        `
        var backBlur = document.createElement("DIV");
        backBlur.id = "blur";
        
        var openBtnContainer = document.createElement("LI");
        openBtnContainer.id = "openBtnContainer"
        openBtnContainer.innerHTML = 
        `
        <a id="openBtn">Solution Code</a>
        <span class="circle"></span>
        <span class="tooltiptext">Click this "Solution Code" button to view solution code. If you do not see that button join the discord to report it. <button id=gotItBtn>Got it!</button></span>
        `

        if (document.getElementsByClassName("navbar-left")[0] != null) {
            document.body.appendChild(mainContainer);
            document.body.appendChild(configureContainer);
            document.getElementById("configureBtn").style.backgroundColor = "#ccc";
            document.getElementById("configureBtn").style.color = "#43464b";
            document.body.appendChild(backBlur);
            document.body.appendChild(highlightcss);
            document.body.appendChild(highlightjs);
            document.getElementsByClassName("navbar-left")[0].appendChild(openBtnContainer);
            document.getElementById("solutionCode").innerText = solutionCode[0];
            document.getElementById("renameContainer").style.marginTop = "-3rem";
            document.getElementById("controlsContainer").style.backgroundColor = "#f2f2f2";
            document.getElementById("controlsContainer").style.padding = "0px";
            document.getElementById("relaunchBtn").style.backgroundColor = "white";
            document.getElementById("relaunchBtn").style.color = "#27a9e1";
            document.getElementById("relaunchBtn").style.marginTop = "0px";
            document.getElementById("relaunchBtn").style.border = "1px solid #27a9e1";
            document.getElementById("copyBtn").style.backgroundColor = "white";
            document.getElementById("copyBtn").style.color = "#27a9e1";
            document.getElementById("copyBtn").style.border = "1px solid #27a9e1";
            document.getElementById("closeBtn").style.backgroundColor = "#9e1e62";
        }

        var singlePrefix = "";
        var multiPrefix = "";
        var multiSuffix = "";

        configureComments();
        close();

        setTimeout(function () {
            filesCount = document.getElementsByClassName("file").length
            document.getElementById("detectedFiles").innerText = filesCount + " files detected"
            for (var i = 0; i < filesCount; i++) {
                var file = document.createElement("DIV");
                file.classList.add("files")
                var fileNum = i + 1;
                file.innerText = "File " + fileNum;
                file.addEventListener("click", getSolutionCode)
                document.getElementById("filesContainer").appendChild(file);
                file.click();
            }
            document.getElementsByClassName("files")[1].click();
        }, 1000);
        /*
        document.getElementById("singlePre").addEventListener("input", function () {
            var prefix = this.value
            document.getElementById("singleSample").innerText = `${prefix}this is a sample single line comment`
            chrome.storage.sync.set({ singlePre: prefix }, function () {
                console.log("single line comment prefix is set to " + prefix);
            });
        });
        document.getElementById("multiPre").addEventListener("input", function () {
            var prefix = this.value
            document.getElementById("multiSample").innerText = `${prefix}this is a sample multi line comment${document.getElementById("multiSuf").value}`
            chrome.storage.sync.set({ multiPre: prefix }, function () {
                console.log("multi line comment prefix is set to " + prefix);
            });
        });
        document.getElementById("multiSuf").addEventListener("input", function () {
            var suffix = this.value
            document.getElementById("multiSample").innerText = `${document.getElementById("multiPre").value}this is a sample multi line comment${suffix}`
            chrome.storage.sync.set({ multiSuf: suffix }, function () {
                console.log("multi line comment suffix  is set to " + suffix);
            });
        });
        */
        document.getElementById("singlePre").addEventListener("input", function () {
            var prefix = this.value
            document.getElementById("singleSample").innerText = `${prefix}this is a sample single line comment`
            localStorage.setItem("singlePre", prefix);
        });
        document.getElementById("multiPre").addEventListener("input", function () {
            var prefix = this.value
            document.getElementById("multiSample").innerText = `${prefix}this is a sample multi line comment${document.getElementById("multiSuf").value}`
            localStorage.setItem("multiPre", prefix);
        });
        document.getElementById("multiSuf").addEventListener("input", function () {
            var suffix = this.value
            document.getElementById("multiSample").innerText = `${document.getElementById("multiPre").value}this is a sample multi line comment${suffix}`
            localStorage.setItem("multiSuf", suffix);
        });

        document.getElementById("doneBtn").addEventListener("click", function () {
            document.getElementById("blur").style.zIndex = "998";
            document.getElementById("configureContainer").style.display = "none";
            configureComments()
        });
        document.getElementById("gotItBtn").addEventListener("click", close);
        document.getElementById("configureBtn").addEventListener("click", function () {
            document.getElementById("blur").style.zIndex = "1000";
            document.getElementById("configureContainer").style.display = "flex";
        });

        document.getElementById("blur").addEventListener("click", function () {
            if (this.style.zIndex == "1000") {
                this.style.zIndex = "998";
                document.getElementById("configureContainer").style.display = "none";
                configureComments()
            } else {
                close();
            }
        });
        document.getElementById("relaunchBtn").addEventListener("click", function () {
            document.getElementById("loadImg").classList.toggle("hidden")
            setTimeout(function () {
                document.getElementById("loadImg").classList.toggle("hidden")
            }, 700);
            relaunch()
        });
        document.getElementById("closeBtn").addEventListener("click", close)
        document.getElementById("renameBtn").addEventListener("click", function () {
            document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replaceAll(document.getElementById("oldVar").value, document.getElementById("newVar").value)
        });
        document.getElementById("copyBtn").addEventListener("click", CopyToClipboard);
        document.getElementById("removeSingle").addEventListener("click", function () {
            var s = document.getElementById("solutionCode").innerText
            var re = new RegExp(singlePrefix, "g");
            var commentNum = (s.match(re) || []).length;
            for (var i = 0; i < commentNum; i++) {
                document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replace(s.substring(s.indexOf(singlePrefix), s.indexOf("\n", s.indexOf(singlePrefix))), "");
                s = document.getElementById("solutionCode").innerText
            }
        });
        document.getElementById("removeMulti").addEventListener("click", function () {
            var s = document.getElementById("solutionCode").innerText
            var pre = multiPrefix
            pre = pre.replaceAll("*", "\\*")
            pre = pre.replaceAll("/", "\\/")
            var re = new RegExp(pre, "g");
            var commentNum = (s.match(re) || []).length;
            for (var i = 0; i < commentNum; i++) {
                document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replace(s.substring(s.indexOf(multiPrefix), s.indexOf(multiSuffix, s.indexOf(multiPrefix))), "");
                document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replace(multiSuffix, "")
                s = document.getElementById("solutionCode").innerText
            }
        });
        document.getElementById("openBtn").addEventListener("click", open);

        function configureComments() {
            /*
            chrome.storage.sync.get(["singlePre", "multiPre", "multiSuf"], function (result) {
                singlePrefix = result.singlePre
                multiPrefix = result.multiPre
                multiSuffix = result.multiSuf
                if (result.singlePre != null) {
                    document.getElementById("removeSingle").classList.remove("hidden")
                    document.getElementById("singlePre").value = singlePrefix
                    document.getElementById("singleSample").innerText = `${singlePrefix}this is a sample single line comment`
                }
                if (result.multiPre != null && result.multiSuf != null) {
                    document.getElementById("removeMulti").classList.remove("hidden")
                    document.getElementById("multiPre").value = multiPrefix
                    document.getElementById("multiSuf").value = multiSuffix
                    document.getElementById("multiSample").innerText = `${multiPrefix}this is a sample multi line comment${multiSuffix}`
                }
            });
            */
            singlePrefix = localStorage.getItem("singlePre");
            multiPrefix = localStorage.getItem("multiPre");
            multiSuffix = localStorage.getItem("multiSuf");
            if (singlePrefix != null) {
                document.getElementById("removeSingle").classList.remove("hidden")
                document.getElementById("singlePre").value = singlePrefix
                document.getElementById("singleSample").innerText = `${singlePrefix}this is a sample single line comment`
            }
            if (multiPrefix != null && multiSuffix != null) {
                document.getElementById("removeMulti").classList.remove("hidden")
                document.getElementById("multiPre").value = multiPrefix
                document.getElementById("multiSuf").value = multiSuffix
                document.getElementById("multiSample").innerText = `${multiPrefix}this is a sample multi line comment${multiSuffix}`
            }
        }
    } else {
        console.log("already injected")
        open();
    }

    var observer = new MutationObserver(function (mutations, me) {
        var injectedContent = document.getElementById("openBtn");
        if (injectedContent == null) {
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
    document.getElementById("mainContainer").style.display = "block"
    document.getElementById("blur").style.display = "block"
}

function close() {
    document.getElementById("mainContainer").style.display = "none"
    document.getElementById("blur").style.display = "none"
    document.getElementById("configureContainer").style.display = "none";
    document.getElementsByClassName("tooltiptext")[0].style.display = "none"
    document.getElementsByClassName("circle")[0].style.display = "none"
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

function getSolutionCode() {
    document.getElementById("solutionCode").innerText = "Oops\nYou may need to re-click/spam click the file or reload the page\nIf this happens frequently, please join the discord report it."
    for (var i = 0; i < document.getElementsByClassName("files").length; i++) {
        document.getElementsByClassName("files")[i].style.borderColor = "transparent"
    }
    this.style.borderColor = "#ccc"
    var fileNum = +this.innerText.split("File ")[1] - 1;
    if (solutionCode[+fileNum] == null) {
        var xhr = new XMLHttpRequest();
        var isDuplicate = false
        var code = "";
        id = document.querySelectorAll("[data-item-id]")[0].getAttribute("data-item-id")
        url = `https://codehs.com/editor/ajax/get_solution_code?itemID=${id}`;
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                code = JSON.parse(JSON.parse(this.responseText).solutionCodeJson)
            }
        };
        xhr.open("GET", url, false);
        xhr.send();
        for (var i = 0; i < solutionCode.length; i++) {
            if (code == solutionCode[i]) {
                isDuplicate = true;
            }
        }
        if (code == "") {
            code = "This file does not appear to have a solution, please press retry if you believe this is incorrect"
            isDuplicate = false;
        }
        if (isDuplicate) {
            getSolutionCode();
        } else {
            solutionCode[+fileNum] = code;
            document.getElementById("solutionCode").innerText = solutionCode[+fileNum]
        }
    } else {
        document.getElementById("solutionCode").innerText = solutionCode[+fileNum]
    }
}

inject();

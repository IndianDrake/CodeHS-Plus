/*! CodeHS Plus v1.2.0 | (c) https://github.com/Viper5077 */

/*
FOR EDUCATIONAL/LEARNING PURPOSES ONLY

Developer(s) of this script are in no way responsible for anything that happens to any user using this script. 
Developer(s) assume no liability and are not responsible for any misuse or damage caused by this script.
*/

var filesCount;

function inject() {
    if (document.getElementById("solutionCodeDiv") == null) {
        solutionCode = [];
        filesCount = Object.keys(Ed.solutionCode).length;
        var modal = document.createElement("DIV");
        modal.id = "modal";
        modal.innerHTML =
        `
        <div id=filesContainer>
            <p id=filesTitle class=title>FILES</p>
            <div class="spacer solutionFile"></div>
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
                <button id=pasteBtn>Paste Code</button>
                <button id=quickPasteBtn>Quick Paste</button>
                <button id=closeBtn>Close</button>
            </div>   
        </div>
        `
        var highlightcss = document.createElement("LINK");
        highlightcss.rel = "stylesheet";
        highlightcss.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css";

        var highlightjs = document.createElement("SCRIPT");
        highlightjs.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js";

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
            document.body.appendChild(modal);
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
            document.getElementById("pasteBtn").style.backgroundColor = "#f2f2f2";
            document.getElementById("pasteBtn").style.color = "#27a9e1";
            document.getElementById("pasteBtn").style.border = "1px solid #27a9e1";
            document.getElementById("quickPasteBtn").style.backgroundColor = "#f2f2f2";
            document.getElementById("quickPasteBtn").style.color = "#27a9e1";
            document.getElementById("quickPasteBtn").style.border = "1px solid #27a9e1";
            document.getElementById("closeBtn").style.backgroundColor = "#9e1e62";
        }

        var singlePrefix = "";
        var multiPrefix = "";
        var multiSuffix = "";

        configureComments();
        close();

        document.getElementById("singlePre").addEventListener("input", function () {
            var prefix = this.value
            document.getElementById("singleSample").innerText = `${prefix}this is a sample single line comment`
            localStorage.setItem('singlePre', prefix);
        });
        document.getElementById("multiPre").addEventListener("input", function () {
            var prefix = this.value
            document.getElementById("multiSample").innerText = `${prefix}this is a sample multi line comment${document.getElementById("multiSuf").value}`
            localStorage.setItem('multiPre', prefix);

        });
        document.getElementById("multiSuf").addEventListener("input", function () {
            var suffix = this.value
            document.getElementById("multiSample").innerText = `${document.getElementById("multiPre").value}this is a sample multi line comment${suffix}`
            localStorage.setItem('multiSuf', suffix);

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
        document.getElementById("closeBtn").addEventListener("click", close);
        document.getElementById("renameBtn").addEventListener("click", function () {
            document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replaceAll(document.getElementById("oldVar").value, document.getElementById("newVar").value);
        });

        document.getElementById("pasteBtn").addEventListener("click", function () {
            var editor = ace.edit("ace-editor");
            editor.setValue(document.getElementById("solutionCode").innerText);
            close();
        });
        document.getElementById("quickPasteBtn").addEventListener("click", function () {
            var editor = ace.edit("ace-editor");
            close();
            for (var i = 0; i < document.getElementsByClassName("__abacus_file").length; i++) {
                document.getElementsByClassName("__abacus_file")[i].click();
                editor.setValue(Ed.solutionCode[document.getElementsByClassName("__abacus_file")[i].innerText]);
            }
        });
        document.getElementById("removeSingle").addEventListener("click", function () {
            var s = document.getElementById("solutionCode").innerText;
            var re = new RegExp(singlePrefix, "g");
            var commentNum = (s.match(re) || []).length;
            for (var i = 0; i < commentNum; i++) {
                document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replace(s.substring(s.indexOf(singlePrefix), s.indexOf("\n", s.indexOf(singlePrefix))), "");
                s = document.getElementById("solutionCode").innerText;
            }
        });
        document.getElementById("removeMulti").addEventListener("click", function () {
            var s = document.getElementById("solutionCode").innerText;
            var pre = multiPrefix;
            pre = pre.replaceAll("*", "\\*");
            pre = pre.replaceAll("/", "\\/");
            var re = new RegExp(pre, "g");
            var commentNum = (s.match(re) || []).length;
            for (var i = 0; i < commentNum; i++) {
                document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replace(s.substring(s.indexOf(multiPrefix), s.indexOf(multiSuffix, s.indexOf(multiPrefix))), "");
                document.getElementById("solutionCode").innerText = document.getElementById("solutionCode").innerText.replace(multiSuffix, "");
                s = document.getElementById("solutionCode").innerText;
            }
        });
        document.getElementById("openBtn").addEventListener("click", open);
        function configureComments() {
            singlePrefix = localStorage.getItem('singlePre');
            multiPrefix = localStorage.getItem('multiPre');
            multiSuffix = localStorage.getItem('multiSuf');
            if (localStorage.getItem('singlePre') != null) {
                document.getElementById("removeSingle").classList.remove("hidden");
                document.getElementById("singlePre").value = singlePrefix;
                document.getElementById("singleSample").innerText = `${singlePrefix}this is a sample single line comment`;
            }
            if (localStorage.getItem('multiPre') != null && localStorage.getItem('multiSuf') != null) {
                document.getElementById("removeMulti").classList.remove("hidden");
                document.getElementById("multiPre").value = multiPrefix;
                document.getElementById("multiSuf").value = multiSuffix;
                document.getElementById("multiSample").innerText = `${multiPrefix}this is a sample multi line comment${multiSuffix}`;
            }
        }
    } else {
        console.log("already injected");
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
    document.getElementById("modal").style.display = "block";
    document.getElementById("blur").style.display = "block";
}

function close() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("blur").style.display = "none";
    document.getElementById("configureContainer").style.display = "none";
    document.getElementsByClassName("tooltiptext")[0].style.display = "none";
    document.getElementsByClassName("circle")[0].style.display = "none";
}


function getSolutionCode() {
    for (var i = 0; i < filesCount; i++) {
        var fileName = Object.keys(Ed.solutionCode)[i];
        var solution = Ed.solutionCode[fileName];
        solutionCode[i] = solution;
        document.getElementById("detectedFiles").innerText = filesCount + " files detected";
        var solutionFile = document.createElement("DIV");
        solutionFile.classList.add("solutionFile");
        solutionFile.innerText = fileName;
        solutionFile.addEventListener("click", function () {
            document.getElementById("solutionCode").innerText = Ed.solutionCode[this.innerText];
        });
        document.getElementById("filesContainer").appendChild(solutionFile);
    }
    document.getElementsByClassName("solutionFile")[1].click();
}

inject();
getSolutionCode();
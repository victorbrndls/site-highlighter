!function (n) {
    var e = {};

    function t(o) {
        if (e[o]) return e[o].exports;
        var i = e[o] = {i: o, l: !1, exports: {}};
        return n[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }

    t.m = n, t.c = e, t.d = function (n, e, o) {
        t.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: o})
    }, t.r = function (n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
    }, t.t = function (n, e) {
        if (1 & e && (n = t(n)), 8 & e) return n;
        if (4 & e && "object" == typeof n && n && n.__esModule) return n;
        var o = Object.create(null);
        if (t.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: n
            }), 2 & e && "string" != typeof n) for (var i in n) t.d(o, i, function (e) {
            return n[e]
        }.bind(null, i));
        return o
    }, t.n = function (n) {
        var e = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return t.d(e, "a", e), e
    }, t.o = function (n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, t.p = "", t(t.s = 0)
}([function (n, e, t) {
    "use strict";
    t.r(e);
    let o = (() => {
        let n = {}, e = "https://localhost:8181", t = {x: 0, y: 0}, i = {triedReload: !1}, l = 73, r = !0, a = !1,
            d = !1,
            c = `<div id="highlightModal">\n                        <img class="highlightModal-icon" src="${e}/icons/highlight.png" \n                        onclick="Highlight.saveSelection()">\n                        <img class="highlightModal-icon" src="${e}/icons/highlight-plus.png" style="margin: 0 0 0 5px;"\n                        onclick="Highlight.openCustomSaveModal()">\n                        <img class="highlightModal-icon" src="${e}/icons/share.png" style="margin: 0 5px;"\n                        onclick="Highlight.tweetSelection()">\n                        <img class="highlightModal-icon" src="${e}/icons/gear.png" onclick="">\n                    </div>`,
            s = '<div id="highlightNotification">\n                    Saved Highlight!\n                    </div>',
            g = `<div id="highlightCustomSave">\n                    <select id="customSave-select">\n                        <option value="0">${document.title}</option>\n                        <option>Common Document 1</option>\n                        <option>Common Document 2</option>\n                        <option>Common Document 3</option>\n                    </select>\n                    <div id="customSaveContent" contenteditable="true">\n                    </div>\n                    <button id="customSave-saveButton" onclick="Highlight.saveCustomModalText()">Save Highlight</button>\n                    </div>`;

        function u(n = "Saved Highlight!", e = 1e3) {
            let t = document.querySelector("#highlightNotification");
            null !== t && (t.innerHTML = n, t.style.display = "block", setTimeout(() => {
                t.style.display = "none"
            }, e))
        }

        function h() {
            document.querySelector("#highlightModal").style.display = "none"
        }

        function p(n, t) {
            let o = new XMLHttpRequest;
            o.onreadystatechange = function () {
                if (4 === this.readyState && 200 === this.status) {
                    let n = JSON.parse(this.responseText);
                    t(n.error)
                }
            }, o.open("POST", `${e}/api/v1/save`, !0), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(`text=${encodeURIComponent(n)}\n            &path=${window.location.host + window.location.pathname}\n            &title=${encodeURIComponent(document.title)}`)
        }

        function m() {
            let n = window.getSelection().getRangeAt(0).cloneContents(), e = "<div>";
            return Array.from(n.childNodes).forEach(n => {
                void 0 === n.tagName ? e += n.textContent : e += `<${n.tagName.toLowerCase()} ${getTagAttributes(n)}>` + n.innerHTML + getClosingTag(n.tagName.toLowerCase())
            }), e + "</div><div><br></div>"
        }

        function f() {
            let n = document.createElement("span");
            n.style.backgroundColor = "#fffd7c", window.getSelection().getRangeAt(0).surroundContents(n)
        }

        function x() {
            return window.getSelection().anchorOffset !== window.getSelection().focusOffset
        }

        return window.onload = (() => {
            !function () {
                let n = document.createElement("script");
                n.async = !0, n.type = "text/javascript", n.src = `${e}/js/common.js`;
                let t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(n, t)
            }(), console.log("Inserting Highlight Modal"), document.body.innerHTML += c, function () {
                let n = document.createElement("style");
                n.type = "text/css", n.innerHTML = '\n        #highlightModal::before, #highlightModal::after{\n            content: "";\n            position: absolute;\n            width: 15px;\n            height: 15px;\n            background-color: white;\n            transform: rotate(45deg);\n            left: 50%;\n            z-index: -1;\n            }\n\n        #highlightModal.up::before {\n            box-shadow: -3px -3px 4px #0000004d;\n            top: -17%;\n        }\n        \n        #highlightModal.down::after {\n            box-shadow: 3px 3px 4px #0003;\n            top: 83%;\n        }\n        \n        #highlightModal{\n            background-color: rgb(252, 252, 252);\n            display: none;\n            position: absolute;\n            padding: 5px 9px;\n            z-index: 999;\n            box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 6px 1px;\n            border-radius: 21px;\n        }\n        \n        .highlightModal-icon{\n            width: 28px; \n            cursor: pointer;\n        }\n        \n        #customSave-select{\n            margin-bottom: 10px;\n            font-size: 14px;\n            padding: 3px\n        }\n        \n        #highlightNotification{\n            position: fixed;\n            background-color: white;\n            z-index: 99999;\n            right: 0;\n            top: 78px;\n            padding: 9px 20px;\n            box-shadow: 0 0 5px #00000080;\n            border-radius: 6px 0 0 6px;\n            display: none;\n        }\n        \n        #highlightCustomSave{\n            position: fixed;\n            width: 326px;\n            background-color: white;\n            top: 15vh;\n            right: 0px;\n            box-shadow: 0 0 11px 2px #0003;\n            border-radius: 7px 0 0 7px;\n            padding: 10px;\n            display: flex;\n            flex-direction: column;\n        }\n        \n        #customSaveContent{\n            border: dashed 2px #0003;\n            padding: 2px;\n            margin-bottom: 12px; \n            max-height: 250px; \n            overflow-y: auto; \n            font-size: 14px;\n        }\n        \n        #customSave-saveButton{\n            background-color: #0070ff;\n            width: max-content;\n            align-self: center;\n            padding: 9px 7px;\n            color: #fff;\n            border-radius: 4px; \n            font-size: 15px;\n            border: none;\n        }\n        \n        #customSave-saveButton:hover {\n            box-shadow: 0 0 5px #0009;\n        }\n        ', document.head.appendChild(n)
            }(), document.body.innerHTML += s
        }), window.onmouseup = (n => {
            t.x = n.pageX, t.y = n.pageY, function (n) {
                let e = document.querySelector("#highlightModal");
                if (null !== e && e.contains(n.target)) return;
                if (!x()) return void(null !== e && (e.style.display = "none"));
                if (null === e) return void(i.triedReload || (confirm("Highlight script is not loaded correctly. Try to load again?") && window.onload(), i.triedReload = !0));
                let o = function (n) {
                    let e = n[0];
                    return n.forEach(n => {
                        n.y < e.y && (e = n)
                    }), e
                }(Array.from(window.getSelection().getRangeAt(0).getClientRects()));
                e.style.top = o.y - e.offsetHeight - 15 + window.scrollY + "px", e.style.left = `${t.x}px`, e.classList.add("down"), e.classList.remove("up"), e.style.display = "flex"
            }(n)
        }), window.onkeyup = (n => {
            n.keyCode === l && n.altKey === r && n.shiftKey === a && n.ctrlKey === d && x() && o.saveSelection()
        }), n.saveSelection = function () {
            let n = m();
            h(), p(n, n => {
                "OK" === n ? (u(), f(), window.getSelection().removeAllRanges()) : u("Error saving highlight", 5e3)
            })
        }, n.saveCustomModalText = (() => {
            p(document.querySelector("#customSaveContent").innerHTML, n => {
                document.querySelector("#highlightCustomSave").remove(), "OK" === n ? (u(), f(), window.getSelection().removeAllRanges()) : u("Error saving highlight", 5e3)
            })
        }), n.openCustomSaveModal = (() => {
            let n = m();
            null === document.querySelector("#highlightCustomSave") && (document.body.innerHTML += g), h(), document.querySelector("#customSaveContent").innerHTML = n
        }), n.openHighlightsFrame = (() => {
        }), n.tweetSelection = (() => {
            !function (n, e = " ") {
                let t = `https://twitter.com/intent/tweet?text=${encodeURIComponent(n)}&url=${encodeURIComponent(e)}`;
                window.open(t)
            }(window.getSelection().getRangeAt(0).cloneContents().textContent, window.location.href)
        }), n
    })()
}]);
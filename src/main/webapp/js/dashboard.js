let Dashboard = (() => {
    let funcs = {};

    window.onload = () => {
        requestDocuments();
    };

    /**
     * A {Document} is a file that contains highlights in it.
     */
    function requestDocuments() {
        httpGet("/api/v1/documents", (data) => {
            let response = JSON.parse(data);

            let library = document.querySelector("#libraryContainer");

            response.data.forEach((doc) => {
                library.innerHTML += funcs.librarySiteTemplate(doc.title, doc.path, doc.id);
            });
        });
    }

    funcs.displayDocumentContent = (id) => {
        httpGet(`/api/v1/document/${id}`, (data) => {
            let response = JSON.parse(data);

            funcs.currentDocumentId = id;

            document.querySelector("#content").innerHTML = response.data.highlights;
            document.querySelector("#content").setAttribute("data-document-id", id);
        });
    };

    // TEMPLATE FUNCTIONS
    funcs.librarySiteTemplate = (title, url, id) => {
        return `
    <div class="library-template-container" data-id="${id}">
        <h5 class="library-template-title">
            <span onclick="Dashboard.displayDocumentContent(${id})">${title}</span>
            <a href="https://${url}" target="_blank">
                <img class="library-template-external-link" src="/icons/external-link.png">
            </a>
        </h5>
    </div>
    `; // TODO is the url always HTTPS?
    };

    return funcs;
})();

let ContentEditor = (() => {
    let funcs = {};

    funcs.saveDocument = () => {
        if (Dashboard.currentDocumentId === undefined)
            return;

        let content = document.querySelector("#content");

        httpPost("/api/v1/document/save", `id=${content.getAttribute("data-document-id")}&text=${encodeURIComponent(content.innerHTML)}`, (data) => {
            let response = JSON.parse(data);
            document.querySelector("#tempStatusMsg").innerHTML = "Saved";

            setTimeout(() => {
                document.querySelector("#tempStatusMsg").innerHTML = "";
            }, 750);
        });
    };

    funcs.boldSelection = () => {
        let range = window.getSelection().getRangeAt(0);

        if (range.startContainer.parentElement.tagName === "B") { // Selection range is bold
            range.insertNode(document.createTextNode(range.extractContents().textContent));
        } else {
            let b = document.createElement("b");
            b.innerHTML = range.extractContents().textContent;
            range.insertNode(b);
        }

    };

    funcs.changeSelectionColor = () => {
      
    };

    return funcs;
})();

function httpGet(url, cb) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cb(this.responseText);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

function httpPost(url, body, cb) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cb(this.responseText);
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(body);
}
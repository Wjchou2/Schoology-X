let docURL = "";
let link = "";
function loadFrame() {
    let link = document.getElementsByClassName("attachments-file-name")[0]
        .firstElementChild.href;
    fetch(link)
        .then((response) => response.blob())
        .then((blob) => {
            docURL = window.URL.createObjectURL(blob);
            document.getElementsByClassName("docviewer-iframe")[0].src = docURL;
            document.getElementsByClassName(
                "view-file-popup  sExtlink-processed"
            )[0].href = docURL;
        });
    if (document.getElementById("expandDoc") != null)
        document.getElementById("expandDoc").href = docURL;
}
let docx = document.getElementsByClassName("attachments-file-name")[0];
if (docx) {
    link = docx.firstElementChild.href;
}

if (
    link != null &&
    window.location.href.includes("materials/gp") &&
    !link.includes(".docx")
) {
    loadFrame();
    setTimeout(() => {
        let centerTop = document.getElementById("center-top");
        if (centerTop) {
            document.head.insertAdjacentHTML(
                "beforeend",
                `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`
            );
            setTimeout(() => {
                centerTop.innerHTML += `<a href="${docURL}" target="_blank" id="expandDoc" style=" text-decoration:none; position:absolute; left:95%; top:10%;font-size: 30px "
             class="material-symbols-outlined">
             
            open_in_full
            </a>`;
                centerTop.innerHTML += `<a  id="reloadFrame"  target="_blank" id="reload" style=" cursor: pointer; text-decoration:none; position:absolute; left:91%; top:10%;font-size: 30px "
            class="material-symbols-outlined">
            frame_reload
            </a>`;
            }, 800);
        }
        document
            .getElementById("reloadFrame")
            .addEventListener("click", function () {
                loadFrame();
            });
    }, 1000);
}

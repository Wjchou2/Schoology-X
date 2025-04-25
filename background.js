// document.head.appendChild(el2);
// document.head.appendChild(el3);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "deleteAsign") {
        const value = request.value;
        const event = new CustomEvent("deleteAsign", {
            detail: { value: value },
        });
        window.dispatchEvent(event);
    }
    if (request.type === "colorChange") {
        const value = request.value;
        const event = new CustomEvent("colorChange", {
            detail: { value: value },
        });
        window.dispatchEvent(event);
    }
});

function get() {
    chrome.storage.sync.get(["colorChange", "deleteAsign"], function (data) {
        if (chrome.runtime.lastError) {
            console.error("Error loading value:", chrome.runtime.lastError);
            return;
        }

        // Get the stored value
        if (data.colorChange) {
            // let value = false;
            value = data.colorChange;

            const event = new CustomEvent("colorChange", {
                detail: { value: value },
            });
            window.dispatchEvent(event);
            // Optionally, you can dispatch a custom event to the page
        }

        if (data.deleteAsign) {
            const deleteAsign = data.deleteAsign || false;
            let value = false;
            // Perform an action based on the value
            if (deleteAsign) {
                console.log("deleteAsign is enabled");
                value = true;

                // You can perform other actions here if needed
            } else {
                console.log("deleteAsign is disabled");
                value = false;
            }
            const event = new CustomEvent("deleteAsign", {
                detail: { value: value },
            });
            window.dispatchEvent(event);
            // Optionally, you can dispatch a custom event to the page
        }
    });
}

function logOnCommitted(details) {
    //     let el = document.createElement("script");
    //     let el4 = document.createElement("script");
    //     let el2 = document.createElement("link");
    //     let el3 = document.createElement("style");
    //     let el5 = document.createElement("link");
    //     el.src = chrome.runtime.getURL("injected.js");
    //     el4.src = chrome.runtime.getURL("pdf.js");
    //     el2.rel = "stylesheet";
    //     el5.rel = "stylesheet";
    //     el3.style = `.material-symbols-outlined{
    //   font-variation-settings:
    //   'FILL' 0,
    //   'wght' 400,
    //   'GRAD' 0,
    //   'opsz' 24
    // }`;
    //     el2.href =
    //         "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    //     // el3.src = chrome.runtime.getURL("tsdeliver2.js");
    //     el.type = "text/javascript";
    //     el4.type = "text/javascript";
    //     el5.src = chrome.runtime.getURL("Injectedstyles.css");
    //     document.head.appendChild(el);
    //     document.head.appendChild(el4);
    //     document.head.appendChild(el2);
    //     document.head.appendChild(el3);
    //     //
}
if (chrome.webNavigation) {
    chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
        if (details.frameId === 0) {
            chrome.tabs.get(details.tabId, (tab) => {
                if (
                    tab &&
                    tab.url &&
                    tab.url.startsWith("https://schoology.shschools.org/")
                ) {
                    console.log("✅ Schoology tab detected:", tab.url);

                    chrome.scripting
                        .executeScript({
                            target: { tabId: details.tabId },
                            files: ["injected.js", "pdf.js"],
                        })
                        .catch((error) =>
                            console.error("Script Injection Error:", error)
                        );
                }
            });
        }
    });
}

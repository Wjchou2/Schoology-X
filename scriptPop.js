document.addEventListener("DOMContentLoaded", function () {
    let deleteAsign = document.getElementById("deleteAsignBox");
    let colorchangebox = document.getElementById("colorchangebox");
    let resetColor = document.getElementById("resetColor");

    // Load the saved values from chrome.storage when the popup opens
    chrome.storage.sync.get(["colorChange", "deleteAsign"], function (data) {
        if (chrome.runtime.lastError) {
            console.error("Error loading value:", chrome.runtime.lastError);
            return;
        }

        // Set deleteAsign checkbox based on the saved value
        deleteAsign.checked = data.deleteAsign || false;

        // Set the color input value based on the saved value
        colorchangebox.value = data.colorChange || "#0677bb"; // Default color if not set
    });

    // Save the deleteAsign value when checkbox changes
    deleteAsign.addEventListener("change", function () {
        send("deleteAsign");
    });

    // Save the color value when color input changes
    colorchangebox.addEventListener("change", function () {
        send("colorChange");
    });

    // Reset color when the reset button is clicked
    resetColor.addEventListener("click", function () {
        colorchangebox.value = "#0677bb"; // Default color
        send("colorChange");
    });

    // Throttle message sending
    let throttleTimer = false;
    const intervalId = setInterval(function () {
        if (!throttleTimer) {
            send("colorChange");

            // Prevent immediate repeated sends
            throttleTimer = true;
            setTimeout(function () {
                throttleTimer = false;
            }, 50); // Adjust delay as necessary (100ms recommended)
        }
    }, 50); // Interval set to 100 milliseconds

    // You can use clearInterval(intervalId) later to stop this if needed
});

// Send function
function send(typeofmessage) {
    let val = null;
    if (typeofmessage === "deleteAsign") {
        val = document.getElementById("deleteAsignBox").checked;
    } else if (typeofmessage === "colorChange") {
        val = document.getElementById("colorchangebox").value;
    }
    if (val !== null) {
        // Use dynamic property names in the storage object
        chrome.storage.sync.set({ [typeofmessage]: val }, function () {
            if (chrome.runtime.lastError) {
                console.error("Error saving value:", chrome.runtime.lastError);
                return;
            }

            // Send message to active tab
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: typeofmessage,
                        value: val, // Correct property name
                    });
                }
            );
        });
    }
}

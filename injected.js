"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("injected :)");
let ready = 0;
// document.head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
// `;
let allowedURL = [
    "https://schoology.shschools.org/home",
    "https://schoology.shschools.org/home/",
    "https://schoology.shschools.org/",
    "https://schoology.shschools.org",
    "https://schoology.shschools.org/home/recent-activity",
];
let readMessage = [];
let temp = localStorage.getItem("readMessage");
if (temp) {
    readMessage = JSON.parse(temp);
}
function isBackgroundDark(hexColor) {
    // Convert hex to RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // Return true if the background is dark (luminance < 128)
    return luminance < 128;
}
// Usage example
let currentclass = null;
let distancefromtoday = 0;
let distancefromtodayWeeks = 0;
let order = [
    "", // 1
    "", // 2
    "", // 3
    "", // 4
    "", // 5
    "", // 6
    "", // 7
    "End",
];
const courseIds = [
    "7356990861",
    "7356990931",
    "7356990703",
    "7356991016",
    "7356990663",
    "7356990984",
    "7356990769",
];
const Weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let courses = [
    // Day 1
    { name: order[0], day: 1, time: { hour: 8, min: 25 } }, // 1
    { name: order[1], day: 1, time: { hour: 10, min: 0 } }, // 2
    { name: order[2], day: 1, time: { hour: 11, min: 10 } }, // 3
    { name: order[3], day: 1, time: { hour: 13, min: 0 } }, // 4
    { name: order[4], day: 1, time: { hour: 14, min: 15 } }, // 5
    { name: "End", day: 1, time: { hour: 15, min: 15 } }, // 5
    // Day 2
    { name: order[5], day: 2, time: { hour: 8, min: 25 } }, // 6
    { name: order[6], day: 2, time: { hour: 10, min: 30 } }, // 7
    { name: order[0], day: 2, time: { hour: 12, min: 20 } }, // 1
    { name: order[1], day: 2, time: { hour: 13, min: 30 } }, // 2
    { name: "End", day: 2, time: { hour: 15, min: 15 } }, // 5
    // Day 3
    { name: order[2], day: 3, time: { hour: 9, min: 25 } }, // 3
    { name: order[3], day: 3, time: { hour: 10, min: 35 } }, // 4
    { name: order[4], day: 3, time: { hour: 12, min: 25 } }, // 5
    { name: order[5], day: 3, time: { hour: 13, min: 40 } }, // 6
    { name: "End", day: 3, time: { hour: 15, min: 15 } }, // 5
    // Day 4
    { name: order[6], day: 4, time: { hour: 8, min: 25 } }, // 7
    { name: order[0], day: 4, time: { hour: 10, min: 0 } }, // 1
    { name: order[1], day: 4, time: { hour: 11, min: 10 } }, // 2
    { name: order[2], day: 4, time: { hour: 13, min: 0 } }, // 3
    { name: "End", day: 4, time: { hour: 15, min: 15 } }, // 5
    // Day 5
    { name: order[3], day: 5, time: { hour: 8, min: 25 } }, // 4
    { name: order[4], day: 5, time: { hour: 10, min: 0 } }, // 5
    { name: order[5], day: 5, time: { hour: 13, min: 0 } }, // 6
    { name: order[6], day: 5, time: { hour: 14, min: 15 } }, // 7
    { name: "End", day: 5, time: { hour: 15, min: 15 } }, // 5
];
function refresh() {
    courses = [
        // Day 1
        { name: order[0], day: 1, time: { hour: 8, min: 25 } }, // 1
        { name: order[1], day: 1, time: { hour: 10, min: 0 } }, // 2
        { name: order[2], day: 1, time: { hour: 11, min: 10 } }, // 3
        { name: order[3], day: 1, time: { hour: 13, min: 0 } }, // 4
        { name: order[4], day: 1, time: { hour: 14, min: 15 } }, // 5
        { name: "End", day: 1, time: { hour: 15, min: 15 } }, // 5
        // Day 2
        { name: order[5], day: 2, time: { hour: 8, min: 25 } }, // 6
        { name: order[6], day: 2, time: { hour: 10, min: 30 } }, // 7
        { name: order[0], day: 2, time: { hour: 12, min: 20 } }, // 1
        { name: order[1], day: 2, time: { hour: 13, min: 30 } }, // 2
        { name: "End", day: 2, time: { hour: 15, min: 15 } }, // 5
        // Day 3
        { name: order[2], day: 3, time: { hour: 9, min: 25 } }, // 3
        { name: order[3], day: 3, time: { hour: 10, min: 35 } }, // 4
        { name: order[4], day: 3, time: { hour: 12, min: 25 } }, // 5
        { name: order[5], day: 3, time: { hour: 13, min: 40 } }, // 6
        { name: "End", day: 3, time: { hour: 15, min: 15 } }, // 5
        // Day 4
        { name: order[6], day: 4, time: { hour: 8, min: 25 } }, // 7
        { name: order[0], day: 4, time: { hour: 10, min: 0 } }, // 1
        { name: order[1], day: 4, time: { hour: 11, min: 10 } }, // 2
        { name: order[2], day: 4, time: { hour: 13, min: 0 } }, // 3
        { name: "End", day: 4, time: { hour: 15, min: 15 } }, // 5
        // Day 5
        { name: order[3], day: 5, time: { hour: 8, min: 25 } }, // 4
        { name: order[4], day: 5, time: { hour: 10, min: 0 } }, // 5
        { name: order[5], day: 5, time: { hour: 13, min: 0 } }, // 6
        { name: order[6], day: 5, time: { hour: 14, min: 15 } }, // 7
        { name: "End", day: 5, time: { hour: 15, min: 15 } }, // 5
    ];
}
let deleteAsign = null; // Do something with the event
let initial = true; // Do something with the event
let old = null;
window.addEventListener("deleteAsign", function (e) {
    // Cast the event to CustomEvent
    const customEvent = e;
    if (customEvent.detail && typeof customEvent.detail.value !== "undefined") {
        const deleteAsignValue = customEvent.detail.value; // Access the value from the event detail
        deleteAsign = deleteAsignValue; // Set the variable
        if (initial) {
            initial = false; // Do something with the event
            old = deleteAsign;
        }
        else {
            if (old !== deleteAsign) {
                location.reload();
            }
        }
    }
    else {
        console.error("No value found in event detail");
    }
});
function creatVolunteerBtn() {
    let clone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
    let btn = document.createElement("button");
    btn.className = "volunteerBtn";
    document.head.innerHTML += `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=volunteer_activism" />`;
    btn.innerHTML = `<span class="material-symbols-outlined">
volunteer_activism
</span>`;
    btn.addEventListener("click", function () {
        window.open("https://app.mobileserve.com/app/#/");
    });
    clone.before(btn);
}
creatVolunteerBtn();
function adjustBrightness(hexColor, percent) {
    // Ensure percent is between -100 and 100
    percent = Math.max(-100, Math.min(100, percent));
    // Convert hex to RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    // Calculate adjustment factor
    let adjustmentFactor = Math.round((percent / 100) * 255);
    // Adjust brightness
    r = Math.min(255, Math.max(0, r + adjustmentFactor));
    g = Math.min(255, Math.max(0, g + adjustmentFactor));
    b = Math.min(255, Math.max(0, b + adjustmentFactor));
    // Convert RGB back to hex
    let newHex = "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);
    return newHex;
}
function getCurrentClass(day, currentHour, currentMinute) {
    let currentClass = null;
    // Find the current class by iterating through the list
    for (const period of courses) {
        if (period.day === day) {
            // Compare the period's time with the current time
            if (period.time.hour < currentHour ||
                (period.time.hour === currentHour &&
                    period.time.min - 5 <= currentMinute)) {
                currentClass = period;
            }
        }
    }
    // Return the name of the class if found, otherwise return null
    return currentClass ? currentClass.name : null;
}
let originalColor = "#ffffff";
let hoverColor = adjustBrightness(originalColor, -20); // Lighten by 20%
// let originalColor = "#0677bb";
// let hoverColor = adjustBrightness(originalColor, 20); // Lighten by 20%
window.addEventListener("colorChange", function (e) {
    // Cast the event to CustomEvent
    const customEvent = e;
    if (customEvent.detail && typeof customEvent.detail.value !== "undefined") {
        const deleteAsignValue = customEvent.detail.value; // Access the value from the event detail
        originalColor = deleteAsignValue;
        localStorage.setItem("color", originalColor);
        if (isBackgroundDark(originalColor)) {
            hoverColor = adjustBrightness(originalColor, 10); // Lighten by 20%
        }
        else {
            hoverColor = adjustBrightness(originalColor, -10); // Lighten by 20%
        }
        //lightenhere
        changeHeaderColor();
    }
    else {
        console.error("No value found in event detail");
    }
});
if (localStorage.getItem("color")) {
    originalColor = localStorage.getItem("color");
    if (isBackgroundDark(originalColor)) {
        hoverColor = adjustBrightness(originalColor, 10); // Lighten by 20%
    }
    else {
        hoverColor = adjustBrightness(originalColor, -10); // Lighten by 20%
    }
}
window.addEventListener("resize", changeHeaderColor);
function changeHeaderColor() {
    // Function to check if any ancestor of the element is a <header>
    function hasHeaderAncestor(element) {
        while (element.parentElement) {
            // Loop until there are no more parents
            element = element.parentElement; // Move up the DOM tree
            if (element.tagName.toLowerCase() === "header") {
                return true; // Found a <header> ancestor
            }
        }
        return false; // No <header> ancestor found
    }
    // hoverColor = "#24a5f5";
    // Select all <a> and <li> elements
    let anchors = document.getElementsByTagName("a");
    let listItems = document.getElementsByTagName("li");
    let btns = document.getElementsByTagName("button");
    const header = document.getElementsByClassName("_1tpub _3mp5E _24W2g util-justify-content-space-between-3euFK")[0];
    header.style.backgroundColor = originalColor;
    document.getElementsByClassName("_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD")[0].style.backgroundColor = originalColor;
    document.getElementsByClassName("_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD")[0].style.borderTop = `3px solid ${originalColor}`;
    let IMGParent = document.getElementsByClassName("util-height-six-3PHnk util-width-auto-1-HYR util-max-width-sixteen-3-tkk fjQuT _1tpub _2JX1Q")[0];
    //thishere
    let ids = [
        "icon-search-v2-3US0j",
        "icon-app-grid-v2-xZFWs",
        "icon-calendar-v2-16S3z",
        "icon-mail-v2-2Mxyq",
        "icon-bell-v2-3oo-G",
    ];
    for (let i = 0; i < ids.length; i++) {
        let elm = document.getElementById(ids[i]);
        let path = elm.firstElementChild;
        // elm.firstElementChild.id = "hi";
        if (isBackgroundDark(originalColor)) {
            path.setAttribute("fill", "#ffffff");
        }
        else {
            path.setAttribute("fill", "#333333");
        }
    }
    const IMG = IMGParent.firstElementChild;
    // IMG.src = "https://i.ibb.co/v3Cc2mX/shs-removebg-preview.png"; // Replace this with the direct URL of the image
    IMG.src = "https://i.ibb.co/YpdfP2k/logo-removebg-preview-2.png"; // Replace this with the direct URL of the image
    for (let i = 0; i < anchors.length; i++) {
        if (hasHeaderAncestor(anchors[i])) {
            if (anchors[i].title !== "Home") {
                anchors[i].style.backgroundColor = originalColor;
                anchors[i].style.borderRadius = "10px";
                anchors[i].addEventListener("mouseover", function () {
                    anchors[i].style.backgroundColor = hoverColor;
                });
                anchors[i].addEventListener("mouseleave", function () {
                    anchors[i].style.backgroundColor = originalColor;
                });
            }
        }
    }
    for (let i = 0; i < btns.length; i++) {
        if (hasHeaderAncestor(btns[i])) {
            btns[i].style.backgroundColor = originalColor;
            // if (originalColor !== "#ffffff") {
            if (btns[i].firstElementChild !== null &&
                btns[i].firstElementChild.role !== "menuitem") {
                if (isBackgroundDark(originalColor)) {
                    btns[i].firstElementChild.style.color =
                        "#ffffff";
                }
                else {
                    btns[i].firstElementChild.style.color =
                        "#333333";
                }
            }
            btns[i].style.borderRadius = "10px";
            btns[i].addEventListener("mouseover", function () {
                btns[i].style.backgroundColor = hoverColor;
            });
            btns[i].addEventListener("mouseleave", function () {
                btns[i].style.backgroundColor = originalColor;
            });
        }
    }
    // Check for <li> elements
    for (let i = 0; i < listItems.length; i++) {
        if (hasHeaderAncestor(listItems[i])) {
            const item = listItems[i].firstElementChild;
            if (item) {
                if (item.className !==
                    "_2JX1Q _1tpub _3EZZc _1FFms nOK4_ sExtlink-processed") {
                    listItems[i].style.borderRadius = "10px";
                    listItems[i].style.backgroundColor = originalColor;
                    if (isBackgroundDark(originalColor)) {
                        listItems[i].firstElementChild.style.color = "#ffffff";
                    }
                    else {
                        listItems[i].firstElementChild.style.color = "#333333";
                    }
                    listItems[i].addEventListener("mouseover", function () {
                        listItems[i].style.backgroundColor = hoverColor;
                    });
                    listItems[i].addEventListener("mouseleave", function () {
                        listItems[i].style.backgroundColor = originalColor;
                    });
                }
                // Example: listItems[i].style.color = "red";
            }
        }
    }
}
function getClass() {
    const now = new Date();
    // let now = new Date(2024, 10, 28, 9, 30, 10, 10);
    // const currentDays: Day =
    //     now.getDay() === 0 ? 5 : (now.getDay() as Day); // Adjust Sunday to be day 7
    const currentDays = now.getDay(); // Adjust Sunday to be day 7
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    let ongoingClass = getCurrentClass(currentDays, currentHour, currentMinute);
    return ongoingClass;
}
function waitForElement(className, callback) {
    // Check if the element is already present
    let element = document.querySelector(className);
    if (element) {
        callback(element);
        return;
    }
    // Create a new instance of MutationObserver
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                let element = document.querySelector(className);
                if (element) {
                    callback(element);
                    observer.disconnect(); // Stop observing once the element is found
                    break;
                }
            }
        }
    });
    // Start observing the document for changesschedule
    observer.observe(document.body, { childList: true, subtree: true });
}
changeHeaderColor();
function coursesChange() {
    setInterval(function () {
        waitForElement(".Card-card-data-17m6S", function () {
            const courses = document.getElementsByClassName("Card-card-data-17m6S");
            const imgs = document.getElementsByClassName(" _2q19q Card-card-image-uV6Bu");
            let ongoingClass = getClass();
            // const coursediv = document.getElementsByClassName(
            //     "_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx"
            // )[0] as HTMLElement;
            // const span = coursediv.firstElementChild as HTMLElement;
            for (let i = 0; i < Math.min(courses.length, 7); i++) {
                const courseDiv = courses[i];
                let firstChild = courseDiv.firstElementChild;
                let secondChild = firstChild === null || firstChild === void 0 ? void 0 : firstChild.firstElementChild;
                let className = secondChild === null || secondChild === void 0 ? void 0 : secondChild.innerHTML;
                if (className) {
                    order[i] = className;
                }
                // ongoingClass = "Geometry Honors";
                if (order.indexOf(ongoingClass) == i) {
                    if (ongoingClass !== null) {
                        courseDiv.style.backgroundColor = "#000000";
                    }
                }
                else {
                    courseDiv.style.backgroundColor = "#ffffff";
                }
                courseDiv.style.borderRadius = "0  0 15px 15px";
                let imgelm = imgs[i];
                imgelm.style.borderRadius = " 15px 15px 0 0";
                const div = courseDiv.parentElement;
                div.parentElement.style.borderRadius = "15px";
                const div2 = courseDiv.parentElement;
                // const div3 = div2.parentElement as HTMLElement;
                if (div2) {
                    imgelm.style.borderColor = "blue";
                    courseDiv.style.borderColor = "blue";
                    // ongoingClass = "Geometry Honors";
                    // if (order.indexOf(ongoingClass) == i) {
                    //     if (ongoingClass !== null) {
                    //         div2.style.borderColor = "blue";
                    //     }
                    // }
                    div2.style.borderRadius = "15px";
                }
            }
            localStorage.setItem("schedule", JSON.stringify(order));
            createSchedule();
        });
    }, 100);
}
function redirect() {
    // let repeated = 0;
    // let interval = setInterval(function () {
    //     repeated += 1;
    //     if (repeated >= 10) {
    //         clearInterval(interval);
    //     }
    // }, 20);
    setTimeout(function () {
        if (currentclass !== null && order[currentclass] !== "End") {
            alert(`https://schoology.shschools.org/course/${courseIds[currentclass]}`);
            window.location.replace(`https://schoology.shschools.org/course/${courseIds[currentclass]}`);
        }
        else {
        }
    }, 200);
}
coursesChange();
document
    .getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx")[0]
    .addEventListener("click", redirect);
function next(amount) {
    distancefromtoday += amount;
    // if (distancefromtoday == 6) {
    // }
    let elem = document.getElementById("calender");
    if (elem === null || elem === void 0 ? void 0 : elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
    if (allowedURL.includes(window.location.href)) {
        createSchedule();
    }
}
function hovered(arrownum) {
    let arrow = document.getElementById("arrow" + arrownum);
    if (arrow) {
        arrow.style.fill = "#2020e8";
        arrow.style.cursor = "pointer";
    }
}
function unhovered(arrownum) {
    let arrow = document.getElementById("arrow" + arrownum);
    if (arrow) {
        arrow.style.fill = "#434343";
        arrow.style.cursor = "auto";
    }
}
let saveState = {};
if (allowedURL.includes(window.location.href)) {
    let interval = setInterval(function () {
        if (document.getElementsByClassName("submissions-title")[0] !==
            undefined &&
            document.getElementsByClassName("submissions-title")[1] !==
                undefined) {
            clearInterval(interval);
            setTimeout(function () {
                var _a, _b, _c;
                ready = 1;
                checkBoxmaker();
                createSchedule();
                let p = document.createElement("p");
                p.innerHTML = "";
                p.id = "progress";
                (_a = document.getElementById("todo")) === null || _a === void 0 ? void 0 : _a.appendChild(p);
                p.style.position = "absolute";
                p.style.top = "80px";
                p.style.left = "95%";
                p.style.fontSize = "16px";
                let div = document.createElement("div");
                div.id = "myProgress";
                (_b = document.getElementById("todo")) === null || _b === void 0 ? void 0 : _b.appendChild(div);
                div.style.position = "absolute";
                div.style.top = "75px";
                div.style.left = "75%";
                div.style.width = "0%";
                div.style.height = "22px";
                div.style.borderRadius = "10px";
                div.style.backgroundColor = "#0677bb";
                div.style.textAlign = "center";
                div.style.margin = "auto";
                div.style.color = "white";
                // div.style.fontSize = "16px";
                div.style.fontSizeAdjust = "0.6";
                div.style.padding = "2px";
                let div2 = document.createElement("div");
                div2.id = "myProgressFrame";
                (_c = document.getElementById("todo")) === null || _c === void 0 ? void 0 : _c.appendChild(div2);
                div2.style.position = "absolute";
                div2.style.top = "75px";
                div2.style.left = "75%";
                div2.style.width = "200px";
                div2.style.height = "22px";
                div2.style.borderRadius = "10px";
                div2.style.borderWidth = "2px";
                div2.style.borderStyle = "solid";
                // div2.style.backgroundColor = "#0677bb";
                changeAmount();
            }, 0);
        }
    }, 10);
}
function createSchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (allowedURL.includes(window.location.href)) {
            // let quote_list: any = [];
            // await fetch("http://cs.shschools.org/kmo/quotes.txt")
            //     .then((response) => response.text())
            //     .then((data) => {
            //         quote_list = data.split("\n");
            //     });
            const dateNow = new Date();
            let dayNow = dateNow.getDate();
            refresh();
            const div = document.createElement("div");
            const divstyle = div.style;
            divstyle.width = "100px";
            div.id = "calender";
            divstyle.height = "350px";
            divstyle.backgroundColor = "#ffffff";
            divstyle.position = "absolute";
            div.className = "todo todo-wrapper";
            divstyle.top = "6.1%";
            divstyle.left = "2%";
            divstyle.padding = "15px";
            divstyle.textAlign = "";
            divstyle.fontSize = "12px";
            divstyle.fontFamily = "Roboto";
            // const btn = document.createElement("button");
            // const btnStyle = btn.style;
            // btnStyle.width = "100px";
            // btn.id = "notes";
            // btn.innerHTML = "Notes";
            // btnStyle.height = "30px";
            // // btnStyle.backgroundColor = "#ffffff";
            // btnStyle.position = "absolute";
            // // btn.className = "todo todo-wrapper";
            // btnStyle.top = "40%";
            // btnStyle.left = "3%";
            // btnStyle.padding = "15px";
            // // btnStyle.textAlign = "";
            // btnStyle.zIndex = "100";
            // btnStyle.fontSize = "12px";
            // btnStyle.fontFamily = "Roboto";
            // btn.addEventListener("click", function () {
            //     location.replace(`/${btn.id}`);
            // });
            let now = new Date();
            now.setDate(now.getDate() + distancefromtoday);
            const day = now.getDay();
            const date = now.getDate();
            const month = now.getMonth();
            div.innerHTML = `<svg style="position:Relative; left:40px" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg><h2 style="position:Relative; left:10px">Schedule</h2>${Weekdays[day]} ${month + 1}/${date}`;
            div.innerHTML +=
                '<div style="width:`24px`;height:`24px`;background-color:`grey`;position: absolute;top:5px; left:105px" onclick="next(1)" onmouseover="hovered(1)" onmouseleave="unhovered(1)"><svg  id="arrow1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></div>';
            div.innerHTML +=
                '<div   style="width:`24px`;height:`24px`;background-color:`grey`;position: absolute;top:5px; left:5px" onclick="next(-1)" onmouseover="hovered(2)" onmouseleave="unhovered(2)"><svg id="arrow2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></div>';
            div.innerHTML += `<hr style="border-top: 1px solid #bbb;" class="solid"></br>`;
            //working
            let periodCount = 0;
            // let save2 = {};
            let save2 = localStorage.getItem("saveState2");
            if (save2 !== null) {
                if (JSON.parse(save2)) {
                    save2 = JSON.parse(save2);
                    localStorage.setItem("saveState2", JSON.stringify(save2));
                }
            }
            // if (document.getElementById("calender") == null && order[0] !== "") {
            let save3 = localStorage.getItem("schedule");
            if (save3 !== null) {
                order = JSON.parse(save3);
                refresh();
            }
            if (order[0] !== "" || order == null) {
                if (now.getDay() == 6 || now.getDay() == 0) {
                    div.innerHTML +=
                        " <h3 style='text-align:left'>Weekend! No Classes.<h3>";
                }
                else {
                    let element = document.getElementById("calender");
                    (_a = element === null || element === void 0 ? void 0 : element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(element);
                    for (const period of courses) {
                        if (period.day === day) {
                            if (period.name !== "End") {
                                periodCount += 1;
                                // if (save2) {
                                //     print;
                                //     if (save2.find(period.name)) {
                                //     }
                                // }
                                // let input = document.createElement("select");
                                // // input.type = "select";
                                // input.style.width = "40px";
                                // for (let i = 0; i < 5; i++) {
                                //     let option = document.createElement("option");
                                //     option.innerHTML = String(i);
                                //     input.appendChild(option);
                                // }
                                // input.style.height = "22px";
                                // input.style.borderRadius = "10px";
                                // input.style.left = "80px";
                                // input.style.top = periodCount * 50 - periodCount + 40 + "px";
                                // input.style.position = "absolute";
                                // input.style.fontSize = "10px";
                                // input.className = "progressCheck2";
                                // div.appendChild(input);
                                let startTime = "";
                                if (period.time.hour > 12) {
                                    startTime =
                                        period.time.hour -
                                            12 +
                                            ":" +
                                            period.time.min;
                                    if (period.time.min == 0) {
                                        startTime =
                                            period.time.hour -
                                                12 +
                                                ":" +
                                                period.time.min +
                                                "0";
                                    }
                                }
                                else {
                                    startTime =
                                        period.time.hour + ":" + period.time.min;
                                    if (period.time.min == 0) {
                                        startTime =
                                            period.time.hour +
                                                ":" +
                                                period.time.min +
                                                "0";
                                    }
                                }
                                let endTime = "";
                                if (period.time.hour + 1 > 12) {
                                    endTime =
                                        period.time.hour +
                                            1 -
                                            12 +
                                            ":" +
                                            period.time.min;
                                    if (period.time.min == 0) {
                                        endTime =
                                            period.time.hour +
                                                1 -
                                                12 +
                                                ":" +
                                                period.time.min +
                                                "0";
                                    }
                                }
                                else {
                                    endTime =
                                        period.time.hour +
                                            1 +
                                            ":" +
                                            period.time.min;
                                    if (period.time.min == 0) {
                                        endTime =
                                            period.time.hour +
                                                1 +
                                                ":" +
                                                period.time.min +
                                                "0";
                                    }
                                }
                                if (order[currentclass] == period.name) {
                                    div.innerHTML += `
    
                    
                        <span style='text-align:right'>${period.name}</span><br>(${startTime} - ${endTime})<br><br>
                      `;
                                }
                                else {
                                    div.innerHTML += `
                    
                        <b>${period.name} </b><br>(${startTime} - ${endTime})<br><br>
                  `;
                                }
                            }
                        }
                    }
                    divstyle.boxShadow = "0 1px 3px 0 rgba(0,0,0,.15)";
                }
            }
            else {
                div.innerHTML +=
                    " <h3 style='text-align:left'>Schedule not saved, open course menu to load. Make sure your courses are ordered in the order you have them!<h3>";
            }
            // let quotesArr = quotes.split("\n");
            // let todayQuote = quotesArr[dayNow];
            // todayQuote = todayQuote
            //     .replace(/â€œ/g, '"') // Replace the opening quotation marks
            //     .replace(/â€/g, '"') // Replace the closing quotation marks
            //     .replace(/â€™/g, "'"); // Replace the apostrophe
            // div.innerHTML += `<br/><span style="font-size:10px">${todayQuote}</span>`;
            const container = document.getElementById("container");
            if (container) {
                container.appendChild(div);
                // container.appendChild(btn);
            }
            // div.innerHTML +=
            //     "<button onclick='crash()' style=`width=50px;height=50px;`>hi</button>";
        }
    });
}
// }
function crash() {
    for (let i = 0; i < 5; i++) {
        window.location.reload();
    }
}
function changeAmount() {
    let bar = document.getElementById("progress");
    if (bar) {
        let progressCheck = document.getElementsByClassName("progressCheck");
        let checks = 0;
        for (let i = 0; i < progressCheck.length; i++) {
            let inputThing = progressCheck[i];
            if (inputThing.checked == true) {
                checks += 1;
            }
        }
        let myProgress = document.getElementById("myProgress");
        if (myProgress) {
            let targetWidth = (checks / progressCheck.length) * 200;
            let width = Number(myProgress.style.width.slice(0, myProgress.style.width.length - 2));
            let increase = true;
            if (width < targetWidth) {
                increase = true;
            }
            else {
                increase = false;
            }
            let id = setInterval(frame, 8);
            function frame() {
                if (increase && width >= targetWidth) {
                    width = 0;
                    clearInterval(id);
                }
                else if (increase == false && width <= targetWidth) {
                    width = 0;
                    clearInterval(id);
                }
                else {
                    if (increase) {
                        width++;
                    }
                    else {
                        width--;
                    }
                    if (myProgress) {
                        myProgress.style.width = width + "px";
                        myProgress.innerHTML = `${String(Math.round(width / 2))}%`;
                        myProgress.style.backgroundColor = `rgb(${255 / 2 - (Math.round(width / 2) * 2.25) / 1.5}, ${Math.round(width / 2) * 2.25},${(Math.round(width / 2) * 2.25) / 1.5} )`;
                    }
                }
            }
        }
        bar.innerHTML = `${checks}/${progressCheck.length}`;
    }
}
function checkBoxmaker() {
    waitForElement(".upcoming-event.upcoming-event-block.course-event", function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let upcoming = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
        console.log("hi");
        for (let j = 0; j < upcoming.length; j++) {
            console.log(upcoming[j].getElementsByTagName("span")[0]
                .firstElementChild);
            if (upcoming[j].className.includes("hidden-important")) {
                if (upcoming[j].getElementsByTagName("span")[0]
                    .firstElementChild.src ==
                    "https://schoology.shschools.org/sites/all/themes/schoology_theme/images/error_outline.png") {
                    let newClass = upcoming[j].className;
                    newClass = newClass.replace("hidden-important", "");
                    upcoming[j].className = newClass;
                }
            }
            if (upcoming[j].className.includes("hidden-important") == false) {
                let input = document.createElement("input");
                input.type = "checkbox";
                input.style.width = "30px";
                input.style.height = "30px";
                input.style.borderRadius = "20px";
                input.style.left = "1120px";
                input.style.position = "absolute";
                input.className = "form-check";
                input.className = "progressCheck";
                //                     upcoming[j].innerHTML += `
                // <div class="cntr">
                //   <input id="cbx" class="hidden-xs-up" type="checkbox" />
                //   <label class="cbx" for="cbx"></label>
                //   <label class="lbl" for="cbx">Make Magic</label>
                // </div>
                // `;
                let save = localStorage.getItem("saveState");
                upcoming[j].appendChild(input);
                let children = (_b = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.children;
                let childrenchild = children[0].children[1].children;
                if (childrenchild) {
                    for (let i = 0; i < childrenchild.length; i++) {
                        if (childrenchild[i].className ==
                            "sExtlink-processed") {
                            let original = childrenchild[i].innerHTML;
                            let lower = original.toLowerCase();
                            if ((lower.includes("quiz") ||
                                lower.includes("test") ||
                                lower.includes("minor") ||
                                lower.includes("c4u") ||
                                lower.includes("cfu") ||
                                lower.includes("major")) &&
                                lower.includes("hw") == false) {
                                input.style.accentColor = "green";
                                let elm = childrenchild[i];
                                elm.style.color = "red";
                            }
                            // let child = children[i].firstElementChild;
                            // if (child) {
                            if (save !== null) {
                                saveState = JSON.parse(save);
                                if (saveState[childrenchild[i].innerHTML] ==
                                    true) {
                                    input.checked = true;
                                    childrenchild[i].innerHTML = `<s>${childrenchild[i].innerHTML}</s>`;
                                    let child = (_e = (_d = (_c = childrenchild[i].parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement;
                                    child.style.opacity = "0.8";
                                    let timout = setInterval(() => {
                                        if (deleteAsign == false) {
                                            clearInterval(timout);
                                        }
                                        else if (deleteAsign !== null &&
                                            deleteAsign == true) {
                                            child.remove();
                                            clearInterval(timout);
                                        }
                                    }, 1);
                                }
                                else {
                                    input.checked = false;
                                    let child = (_h = (_g = (_f = childrenchild[i].parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.parentElement) === null || _h === void 0 ? void 0 : _h.parentElement;
                                    child.style.opacity = "1";
                                    childrenchild[i].innerHTML = `${childrenchild[i].innerHTML.replace(/<\/?s>/g, "")}`;
                                }
                            }
                        }
                        else if (childrenchild[i].tagName == "SPAN") {
                            let duedate = (_j = childrenchild[i]) === null || _j === void 0 ? void 0 : _j.firstElementChild;
                            let dateStr = duedate.innerText;
                            let parsedDate = dateStr.replace(/\sat\s\d{1,2}:\d{2}\s[ap]m$/, "");
                            let duedate2 = (_k = upcoming[j + 1].firstElementChild) === null || _k === void 0 ? void 0 : _k.children[0].children[1].children[1].firstElementChild;
                            let parsedDate2 = "";
                            if (duedate2) {
                                let dateStr2 = duedate2.innerText;
                                parsedDate2 = dateStr2.replace(/\sat\s\d{1,2}:\d{2}\s[ap]m$/, "");
                            }
                            if (parsedDate2 !== parsedDate &&
                                parsedDate.includes("overdue") == false) {
                                let newbreak = document.createElement("h4");
                                // newbreak.className = "submissions-title";
                                newbreak.id = "hiofhd";
                                newbreak.innerHTML = parsedDate2;
                                newbreak.style.position = "relative";
                                newbreak.style.width = "350px";
                                newbreak.style.borderBottom =
                                    "2px solid #eaeaea";
                                // newbreak.style.top += 50 + "px";
                                // newbreak.className = "upcoming-event-block";
                                // upcoming[j].appendChild(newbreak);
                                upcoming[j].after(newbreak);
                            }
                        }
                    }
                }
                input.addEventListener("click", function () {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    let children = (_b = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.children;
                    let childrenchild = children[0].children[1].children;
                    if (childrenchild) {
                        changeAmount();
                        for (let i = 0; i < childrenchild.length; i++) {
                            if (childrenchild[i].className ==
                                "sExtlink-processed") {
                                let original = childrenchild[i].innerHTML;
                                // let child = children[i].firstElementChild;
                                // if (child) {
                                if (input.checked) {
                                    saveState[childrenchild[i].innerHTML] =
                                        true;
                                    localStorage.setItem("saveState", JSON.stringify(saveState));
                                    childrenchild[i].innerHTML = `<s>${childrenchild[i].innerHTML}</s>`;
                                    let child = (_e = (_d = (_c = childrenchild[i].parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement;
                                    child.style.opacity = "0.8";
                                    if (deleteAsign !== null &&
                                        deleteAsign) {
                                        child.remove();
                                    }
                                }
                                else {
                                    let child = (_h = (_g = (_f = childrenchild[i].parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.parentElement) === null || _h === void 0 ? void 0 : _h.parentElement;
                                    child.style.opacity = "1";
                                    childrenchild[i].innerHTML = `${childrenchild[i].innerHTML.replace(/<\/?s>/g, "")}`;
                                    saveState[childrenchild[i].innerHTML] =
                                        false;
                                    localStorage.setItem("saveState", JSON.stringify(saveState));
                                }
                            }
                        }
                    }
                });
            }
        }
    });
}
function gradeUpdate() {
    var _a;
    if (window.location.href == "https://schoology.shschools.org/grades/grades") {
        let gradebookElms = document.getElementsByClassName("gradebook-course-grades");
        for (let i = 0; i < gradebookElms.length; i++) {
            let elm = gradebookElms[i];
            elm.style.display = "block";
            let parent = document.getElementsByClassName("course-grade-value")[i];
            let gradeElm = (_a = parent.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
            let grade = gradeElm.innerHTML;
            let title = document.getElementsByClassName("gradebook-course-title")[i];
            title.innerHTML += `  <span style="color:green; font-size:20px;">(${grade})<span>`;
            let gradeDivs = document.getElementsByClassName(" gradebook-course hierarchical-grading-report show-title interactive sGradesGradebook-processed sGradeHierarchicalReport-processed")[i];
            gradeDivs.style.borderRadius = "10px";
            // gradeDivs.style.borderWidth = "10px";
            // gradeDivs.style.backgroundColor = "#474747";
            //     gradeDivs.addEventListener("onmouseover", function () {
            //         alert();
            //         gradeDivs.style.backgroundColor = "#474747";
            //     });
            //     gradeDivs.addEventListener("onmouseleave", function () {
            //         gradeDivs.style.backgroundColor = "blue";
            //     });
        }
        for (let i = 0; i < gradebookElms.length; i++) {
            let elm = gradebookElms[i];
            elm.style.display = "none";
        }
    }
}
gradeUpdate();
notePage();
function notePage() {
    var _a, _b;
    if (window.location.href == "https://schoology.shschools.org/notes") {
        let text = localStorage.getItem("textSave");
        (_a = document.getElementById("content-wrapper")) === null || _a === void 0 ? void 0 : _a.remove();
        const div = document.createElement("textarea");
        const divstyle = div.style;
        divstyle.width = "1200px";
        divstyle.height = "600px";
        divstyle.borderRadius = "10px";
        div.id = "textarea";
        divstyle.position = "absolute";
        divstyle.top = "10%";
        divstyle.left = "10%";
        divstyle.padding = "15px";
        if (text) {
            div.value = text;
        }
        divstyle.fontSize = "30px";
        divstyle.zIndex = "100";
        // divstyle.fontSize = "12px";
        divstyle.fontFamily = "Roboto";
        (_b = document.getElementById("body")) === null || _b === void 0 ? void 0 : _b.appendChild(div);
        div.addEventListener("change", function () {
            if (div) {
                localStorage.setItem("textSave", div.value);
                // alert(div.value);
            }
        });
    }
}
// notePage();
// let url: any;
// function loadFrame() {
//     let link = (
//         document.getElementsByClassName("attachments-file-name")[0]
//             .firstElementChild as HTMLLinkElement
//     ).href;
//     fetch(link)
//         .then((response) => response.blob())
//         .then((blob) => {
//             // Create a blob URL for the PDF
//             url = window.URL.createObjectURL(blob);
//             // Set the src of the iframe to the Blob URL to display the PDF
//             (
//                 document.getElementsByClassName(
//                     "docviewer-iframe"
//                 )[0] as HTMLIFrameElement
//             ).src = url;
//             (
//                 document.getElementsByClassName(
//                     "view-file-popup  sExtlink-processed"
//                 )[0] as HTMLLinkElement
//             ).href = url;
//         });
// }
// let link = (
//     document.getElementsByClassName("attachments-file-name")[0]
//         .firstElementChild as HTMLLinkElement
// ).href;
// if (window.location.href.includes("materials/gp") && !link.includes(".docx")) {
//     loadFrame();
//     setTimeout(() => {
//         let centerTop = document.getElementById("center-top");
//         if (centerTop) {
//             document.head.innerHTML += `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=open_in_full" />`;
//             centerTop.innerHTML += `<a href="${url}" target="_blank" id="expand" style=" text-decoration:none; position:absolute; left:95%; top:10%;font-size: 30px "
//      class="material-symbols-outlined">
//     open_in_full
//     </a>`;
//             centerTop.innerHTML += `<a  onclick="loadFrame()"  target="_blank" id="expand" style=" cursor: pointer; text-decoration:none; position:absolute; left:91%; top:10%;font-size: 30px "
//     class="material-symbols-outlined">
//     frame_reload
//     </a>`;
//         }
//     }, 1000);
// }
//
// function newbtn() {
//     let parent = document.getElementsByClassName(
//         "_2trRU _2K08O fSqCh _1tpub"
//     )[1];
//     let item = parent.firstElementChild?.cloneNode() as HTMLLIElement;
//     if (item) {
//         item.id;
//         parent.appendChild(item);
//     }
// }
// newbtn();
// let btnTemp = document.getElementById("edit-submit") as HTMLInputElement;
// btnTemp.id = "edit-submitTemp";
// let btn = document.getElementById("edit-submit") as HTMLInputElement;
// btnTemp.id = "edit-submit";
// alert(btn.value);
// // let btn = document.getElementById("edit-submit") as HTMLInputElement;
// btn.addEventListener("hover", function () {
//     if (btn.value == "Submit") {
//         alert("submited");
//     }
// });
let recentlyCompleted = document.getElementsByClassName("refresh-button")[0];
if (recentlyCompleted) {
    recentlyCompleted.click();
}
setTimeout(() => {
    // let RecentCompletelist = document.getElementsByClassName(
    //     "recently-completed-event"
    // );
    var _a;
    let RecentCompletelist = document.getElementsByClassName("recently-completed-event");
    for (let i = 0; i < RecentCompletelist.length; i++) {
        let elm = RecentCompletelist[i];
        let stored = localStorage.getItem("oldGrade");
        let old = [];
        if (stored) {
            old = JSON.parse(stored);
        }
        else {
            old = [];
        }
        if (old.includes(elm.innerText) == false) {
            let link = (_a = RecentCompletelist[i].firstElementChild) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("span")[1].getElementsByTagName("a")[0];
            link = link;
            old.push(elm.innerText);
            localStorage.setItem("oldGrade", JSON.stringify(old));
            // let grade =
            //     RecentCompletelist[i].getElementsByTagName("span")[5].innerHTML;
            let grade = "";
            let iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            // iframe.src = a[j].href;
            iframe.src = link.href;
            iframe.onload = () => {
                if (iframe.contentDocument) {
                    grade = iframe.contentDocument.getElementsByClassName("grading-grade")[0].innerText;
                    iframe.remove();
                    grade = grade.replace("Grade:", "").trim();
                    let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${link.href}>${link.innerText}</a>`;
                    let popupBanner = document.createElement("div");
                    popupBanner.id = "popupBanner";
                    popupBanner.innerHTML = message;
                    popupBanner.style.top = `${20 + i * 100}px`;
                    document.body.appendChild(popupBanner);
                    setTimeout(() => {
                        popupBanner.style.right = "20px";
                    }, 100);
                    setTimeout(() => {
                        popupBanner.style.right = "-300px";
                    }, 6000);
                }
            };
        }
    }
}, 1000);
// let bell = document.getElementsByClassName(
//     "_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx"
// )[6] as HTMLButtonElement;
// bell.click();
// let bellopup = document.getElementsByClassName(
//     "_3Xw3k _2trRU j17AQ S42JQ _1Z0RM util-width-thirty-nine-1B-gb _1Z0RM D4hfr HeaderDropMenu-menu-border-3vo5S HeaderDropMenu-menu-position-top-1iEEN VSOiH _3RmDr fjQuT uQOmx"
// )[0] as HTMLDivElement;
// bellopup.style.opacity = "0";
// const elements = document.getElementsByClassName(
//     "_2qcpH _3ghFm _22tOa drGks xjR5v _1wP6w"
// );
// setTimeout(() => {
//     for (let i = 0; i < elements.length; i++) {
//         let elm = document.getElementsByClassName(
//             "_2qcpH _3ghFm _22tOa drGks xjR5v _1wP6w"
//         )[i] as HTMLSpanElement;
//         // let elm = elements[i] as HTMLDivElement;
//         if (elm.classList.contains("_2sW1K") == false) {
//             let a = elm.getElementsByTagName("a");
//             for (let j = 0; j < a.length; j++) {
//                 setTimeout(() => {
//                     if (
//                         readMessage.includes(a[j].href) == false &&
//                         elm.innerHTML.includes("A new grade was posted")
//                     ) {
//                         let iframe = document.createElement("iframe");
//                         document.body.appendChild(iframe);
//                         // iframe.src = a[j].href;
//                         iframe.src = a[j].href;
//                         readMessage.push(a[j].href);
//                         localStorage.setItem(
//                             "readMessage",
//                             JSON.stringify(readMessage)
//                         );
//                         iframe.onload = () => {
//                             if (iframe.contentDocument) {
//                                 let grade = (
//                                     iframe.contentDocument.getElementsByClassName(
//                                         "grading-grade"
//                                     )[0] as HTMLDivElement
//                                 ).innerText;
//                                 iframe.remove();
//                                 grade = grade.replace("Grade:", "").trim();
//                                 let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${
//                                     elm.getElementsByTagName("a")[j].href
//                                 }>${
//                                     elm.getElementsByTagName("a")[j].innerText
//                                 }</a>`;
//                                 let popupBanner = document.createElement("div");
//                                 popupBanner.id = "popupBanner";
//                                 popupBanner.innerHTML = message;
//                                 popupBanner.style.top = `${20 + j * 100}px`;
//                                 document.body.appendChild(popupBanner);
//                                 setTimeout(() => {
//                                     popupBanner.style.right = "20px";
//                                 }, 100);
//                                 setTimeout(() => {
//                                     popupBanner.style.right = "-300px";
//                                 }, 6000);
//                             }
//                         };
//                     }
//                 }, j * 2000);
//             }
//         }
//     }
//     bellopup.style.opacity = "1";
//     bell.click();
// }, 500);
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// setCookie(
//     "SESSc27f95b74fa0402376b3244aa389e9ac",
//     getCookie("SESSc27f95b74fa0402376b3244aa389e9ac"),
//     10
// );

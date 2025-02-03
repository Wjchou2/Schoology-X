console.log("injected :)");
document.head.innerHTML += `<html manifest="offline_book.manifest">
`;
let ready = 0;
let allowedURL = [
    "https://schoology.shschools.org/home",
    "https://schoology.shschools.org/home/",
    "https://schoology.shschools.org/",
    "https://schoology.shschools.org",
    "https://schoology.shschools.org/home/recent-activity",
];
let readMessage: any = [];
let temp = localStorage.getItem("readMessage");
let displayedAll = false;
if (temp) {
    readMessage = JSON.parse(temp);
}
function isBackgroundDark(hexColor: any) {
    // Convert hex to RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return true if the background is dark (luminance < 128)
    return luminance < 128;
}
let currentclass: any = null;
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

const Weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

type Time = {
    hour: number;
    min: number;
};
type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Period {
    name: string;
    day: Day;
    time: Time;
}
let courses: Period[] = [
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
let deleteAsign: any = null; // Do something with the event
let initial = true; // Do something with the event
let old: any = null;
window.addEventListener("deleteAsign", function (e: Event) {
    // Cast the event to CustomEvent
    const customEvent = e as CustomEvent;

    if (customEvent.detail && typeof customEvent.detail.value !== "undefined") {
        const deleteAsignValue = customEvent.detail.value; // Access the value from the event detail
        deleteAsign = deleteAsignValue; // Set the variable
        if (initial) {
            initial = false; // Do something with the event
            old = deleteAsign;
        } else {
            if (old !== deleteAsign) {
                location.reload();
            }
        }
    } else {
        console.error("No value found in event detail");
    }
});
function creatVolunteerBtn() {
    let clone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
    let btn = document.createElement("button");
    btn.className = "volunteerBtn";

    document.head.innerHTML += `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=check_circle" />`;
    btn.innerHTML = `<span class="material-symbols-outlined">
check_circle</span>`;

    btn.addEventListener("click", function () {
        window.open("https://bessy.io");
    });
    clone.before(btn);
}
creatVolunteerBtn();
function adjustBrightness(hexColor: any, percent: any) {
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
    let newHex =
        "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);

    return newHex;
}

function getCurrentClass(
    day: Day,
    currentHour: number,
    currentMinute: number
): string | null {
    let currentClass: Period | null = null;

    // Find the current class by iterating through the list
    for (const period of courses) {
        if (period.day === day) {
            // Compare the period's time with the current time
            if (
                period.time.hour < currentHour ||
                (period.time.hour === currentHour &&
                    period.time.min - 5 <= currentMinute)
            ) {
                currentClass = period;
            }
        }
    }

    // Return the name of the class if found, otherwise return null
    return currentClass ? currentClass.name : null;
}

let originalColor: any = "#ffffff";
let hoverColor = adjustBrightness(originalColor, -20); // Lighten by 20%

// let originalColor = "#0677bb";
// let hoverColor = adjustBrightness(originalColor, 20); // Lighten by 20%

window.addEventListener("colorChange", function (e: Event) {
    // Cast the event to CustomEvent
    const customEvent = e as CustomEvent;

    if (customEvent.detail && typeof customEvent.detail.value !== "undefined") {
        const deleteAsignValue = customEvent.detail.value; // Access the value from the event detail
        originalColor = deleteAsignValue;
        localStorage.setItem("color", originalColor);

        if (isBackgroundDark(originalColor)) {
            hoverColor = adjustBrightness(originalColor, 10); // Lighten by 20%
        } else {
            hoverColor = adjustBrightness(originalColor, -10); // Lighten by 20%
        }

        //lightenhere
        changeHeaderColor();
    } else {
        console.error("No value found in event detail");
    }
});
if (localStorage.getItem("color")) {
    originalColor = localStorage.getItem("color");
    if (isBackgroundDark(originalColor)) {
        hoverColor = adjustBrightness(originalColor, 10); // Lighten by 20%
    } else {
        hoverColor = adjustBrightness(originalColor, -10); // Lighten by 20%
    }
}

window.addEventListener("resize", changeHeaderColor);

function changeHeaderColor() {
    // Function to check if any ancestor of the element is a <header>
    function hasHeaderAncestor(element: Element) {
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
    const header = document.getElementsByClassName(
        "_1tpub _3mp5E _24W2g util-justify-content-space-between-3euFK"
    )[0] as HTMLElement;
    header.style.backgroundColor = originalColor;
    (
        document.getElementsByClassName(
            "_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD"
        )[0] as HTMLElement
    ).style.backgroundColor = originalColor;
    (
        document.getElementsByClassName(
            "_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD"
        )[0] as HTMLElement
    ).style.borderTop = `3px solid ${originalColor}`;

    let IMGParent = document.getElementsByClassName(
        "util-height-six-3PHnk util-width-auto-1-HYR util-max-width-sixteen-3-tkk fjQuT _1tpub _2JX1Q"
    )[0] as HTMLElement;

    //thishere

    let ids = [
        "icon-search-v2-3US0j",
        "icon-app-grid-v2-xZFWs",
        "icon-calendar-v2-16S3z",
        "icon-mail-v2-2Mxyq",
        "icon-bell-v2-3oo-G",
    ];

    for (let i = 0; i < ids.length; i++) {
        let elm = document.getElementById(ids[i]) as any;
        let path = elm.firstElementChild;

        // elm.firstElementChild.id = "hi";

        if (isBackgroundDark(originalColor)) {
            path.setAttribute("fill", "#ffffff");
        } else {
            path.setAttribute("fill", "#333333");
        }
    }

    const IMG = IMGParent.firstElementChild as HTMLImageElement;

    IMG.src = "https://i.ibb.co/YpdfP2k/logo-removebg-preview-2.png"; // Replace this with the direct URL of the image
    for (let i = 0; i < anchors.length; i++) {
        if (hasHeaderAncestor(anchors[i])) {
            if (
                anchors[i].title !== "Home" &&
                anchors[i].innerHTML !== "My Courses" &&
                anchors[i].role !== "menuitem"
            ) {
                // alert(anchors[i].href);
                if ((anchors[i] as HTMLElement) !== null) {
                    if (isBackgroundDark(originalColor)) {
                        (anchors[i] as HTMLElement).style.color = "#ffffff";
                    } else {
                        (anchors[i] as HTMLElement).style.color = "#333333";
                    }
                }

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
            if ((btns[i].firstElementChild as HTMLElement) !== null) {
                if (isBackgroundDark(originalColor)) {
                    (btns[i].firstElementChild as HTMLElement).style.color =
                        "#ffffff";
                    (btns[i] as HTMLElement).style.color = "#ffffff";
                    let gradebtn = document.getElementsByClassName(
                        "_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx"
                    )[2] as HTMLDivElement;
                    gradebtn.style.color = "#ffffff";
                } else {
                    (btns[i].firstElementChild as HTMLElement).style.color =
                        "#333333";
                    (btns[i] as HTMLElement).style.color = "#333333";
                    let gradebtn = document.getElementsByClassName(
                        "_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx"
                    )[2] as HTMLDivElement;
                    gradebtn.style.color = "#333333";
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
}
function getClass() {
    const now = new Date();
    const currentDays: Day = now.getDay() as Day;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    let ongoingClass: any = getCurrentClass(
        currentDays,
        currentHour,
        currentMinute
    );
    return ongoingClass;
}
function waitForElement(className: string, callback: Function) {
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
                    observer.disconnect();
                    break;
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
changeHeaderColor();
let debounce = true;

function coursesChange() {
    setInterval(function () {
        if (debounce) {
            debounce = false;

            waitForElement(".Card-card-data-17m6S", function () {
                const courses = document.getElementsByClassName(
                    "Card-card-data-17m6S"
                );
                const imgs = document.getElementsByClassName(
                    " _2q19q Card-card-image-uV6Bu"
                );

                let ongoingClass = getClass();

                for (let i = 0; i < Math.max(courses.length, 7); i++) {
                    const courseDiv = courses[i] as HTMLElement;
                    let firstChild = courseDiv.firstElementChild;
                    let secondChild = firstChild?.firstElementChild;
                    let className = secondChild?.innerHTML;
                    if (className) {
                        order[i] = className;
                    }

                    courseDiv.style.borderRadius = "0  0 15px 15px";

                    let imgelm = imgs[i] as HTMLElement;
                    imgelm.style.borderRadius = " 15px 15px 0 0";

                    const div = courseDiv.parentElement as HTMLElement;
                    (div.parentElement as HTMLElement).style.borderRadius =
                        "15px";

                    const div2 = courseDiv.parentElement as HTMLElement;
                    // const div3 = div2.parentElement as HTMLElement;
                    if (div2) {
                        imgelm.style.borderColor = "blue";

                        courseDiv.style.borderColor = "blue";

                        div2.style.borderRadius = "15px";
                    }
                }
                localStorage.setItem("schedule", JSON.stringify(order));

                createSchedule();
                debounce = true;
            });
        }
    }, 100);
}

coursesChange();

function next(amount: number) {
    distancefromtoday += amount;
    // if (distancefromtoday == 6) {

    // }
    let elem = document.getElementById("calender");
    if (elem?.parentNode) {
        elem.parentNode.removeChild(elem);
    }
    if (allowedURL.includes(window.location.href)) {
        createSchedule();
    }
}
function hovered(arrownum: number) {
    let arrow = document.getElementById("arrow" + arrownum);
    if (arrow) {
        arrow.style.fill = "#2020e8";
        arrow.style.cursor = "pointer";
    }
}
function unhovered(arrownum: number) {
    let arrow = document.getElementById("arrow" + arrownum);
    if (arrow) {
        arrow.style.fill = "#434343";
        arrow.style.cursor = "auto";
    }
}
let saveState: any = {};

if (
    allowedURL.includes(window.location.href) ||
    window.location.href.includes("course-dashboard")
) {
    let interval = setInterval(function () {
        if (
            document.getElementsByClassName("submissions-title")[0] !==
                undefined &&
            document.getElementsByClassName("submissions-title")[1] !==
                undefined
        ) {
            clearInterval(interval);
            setTimeout(function () {
                ready = 1;
                checkBoxmaker();
                createSchedule();
                let p = document.createElement("p");
                p.innerHTML = "";
                p.id = "progress";
                document.getElementById("todo")?.appendChild(p);

                let div = document.createElement("div");
                div.id = "myProgress";
                document.getElementById("todo")?.appendChild(div);

                let div2 = document.createElement("div");
                div2.id = "myProgressFrame";
                document.getElementById("todo")?.appendChild(div2);

                changeAmount();
            }, 0);
        }
    }, 10);
}

async function createSchedule() {
    // if (allowedURL.includes(window.location.href)) {
    //     // let quote_list: any = [];
    //     // await fetch("http://cs.shschools.org/kmo/quotes.txt")
    //     //     .then((response) => response.text())
    //     //     .then((data) => {
    //     //         quote_list = data.split("\n");
    //     //     });
    //     const dateNow = new Date();
    //     let dayNow = dateNow.getDate();
    //     refresh();
    //     const div = document.createElement("div");
    //     const divstyle = div.style;
    //     divstyle.width = "100px";
    //     div.id = "calender";
    //     divstyle.zIndex = "0";
    //     divstyle.height = "350px";
    //     divstyle.backgroundColor = "#ffffff";
    //     divstyle.position = "absolute";
    //     div.className = "todo todo-wrapper";
    //     divstyle.top = "12.5rem";
    //     divstyle.left = "2%";
    //     divstyle.padding = "15px";
    //     divstyle.textAlign = "";
    //     divstyle.fontSize = "12px";
    //     divstyle.fontFamily = "Roboto";
    //     // const btn = document.createElement("button");
    //     // const btnStyle = btn.style;
    //     // btnStyle.width = "100px";
    //     // btn.id = "notes";
    //     // btn.innerHTML = "Notes";
    //     // btnStyle.height = "30px";
    //     // // btnStyle.backgroundColor = "#ffffff";
    //     // btnStyle.position = "absolute";
    //     // // btn.className = "todo todo-wrapper";
    //     // btnStyle.top = "40%";
    //     // btnStyle.left = "3%";
    //     // btnStyle.padding = "15px";
    //     // // btnStyle.textAlign = "";
    //     // btnStyle.zIndex = "100";
    //     // btnStyle.fontSize = "12px";
    //     // btnStyle.fontFamily = "Roboto";
    //     // btn.addEventListener("click", function () {
    //     //     location.replace(`/${btn.id}`);
    //     // });
    //     let now = new Date();
    //     now.setDate(now.getDate() + distancefromtoday);
    //     const day = now.getDay();
    //     const date = now.getDate();
    //     const month = now.getMonth();
    //     div.innerHTML = `<svg style="position:Relative; left:40px" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg><h2 style="position:Relative; left:10px">Schedule</h2>${
    //         Weekdays[day]
    //     } ${month + 1}/${date}`;
    //     div.innerHTML +=
    //         '<div style="width:`24px`;height:`24px`;background-color:`grey`;position: absolute;top:5px; left:105px" onclick="next(1)" onmouseover="hovered(1)" onmouseleave="unhovered(1)"><svg  id="arrow1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></div>';
    //     div.innerHTML +=
    //         '<div   style="width:`24px`;height:`24px`;background-color:`grey`;position: absolute;top:5px; left:5px" onclick="next(-1)" onmouseover="hovered(2)" onmouseleave="unhovered(2)"><svg id="arrow2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></div>';
    //     div.innerHTML += `<hr style="border-top: 1px solid #bbb;" class="solid"></br>`;
    //     //working
    //     let periodCount = 0;
    //     // let save2 = {};
    //     let save2 = localStorage.getItem("saveState2");
    //     if (save2 !== null) {
    //         if (JSON.parse(save2)) {
    //             save2 = JSON.parse(save2);
    //             localStorage.setItem("saveState2", JSON.stringify(save2));
    //         }
    //     }
    //     // if (document.getElementById("calender") == null && order[0] !== "") {
    //     let save3 = localStorage.getItem("schedule");
    //     if (save3 !== null) {
    //         order = JSON.parse(save3);
    //         refresh();
    //     }
    //     if (order[0] !== "" || order == null) {
    //         if (now.getDay() == 6 || now.getDay() == 0) {
    //             div.innerHTML +=
    //                 " <h3 style='text-align:left'>Weekend! No Classes.<h3>";
    //         } else {
    //             let element = document.getElementById("calender");
    //             element?.parentNode?.removeChild(element);
    //             for (const period of courses) {
    //                 if (period.day === day) {
    //                     if (period.name !== "End") {
    //                         periodCount += 1;
    //                         let startTime = "";
    //                         if (period.time.hour > 12) {
    //                             startTime =
    //                                 period.time.hour -
    //                                 12 +
    //                                 ":" +
    //                                 period.time.min;
    //                             if (period.time.min == 0) {
    //                                 startTime =
    //                                     period.time.hour -
    //                                     12 +
    //                                     ":" +
    //                                     period.time.min +
    //                                     "0";
    //                             }
    //                         } else {
    //                             startTime =
    //                                 period.time.hour + ":" + period.time.min;
    //                             if (period.time.min == 0) {
    //                                 startTime =
    //                                     period.time.hour +
    //                                     ":" +
    //                                     period.time.min +
    //                                     "0";
    //                             }
    //                         }
    //                         let endTime = "";
    //                         if (period.time.hour + 1 > 12) {
    //                             endTime =
    //                                 period.time.hour +
    //                                 1 -
    //                                 12 +
    //                                 ":" +
    //                                 period.time.min;
    //                             if (period.time.min == 0) {
    //                                 endTime =
    //                                     period.time.hour +
    //                                     1 -
    //                                     12 +
    //                                     ":" +
    //                                     period.time.min +
    //                                     "0";
    //                             }
    //                         } else {
    //                             endTime =
    //                                 period.time.hour +
    //                                 1 +
    //                                 ":" +
    //                                 period.time.min;
    //                             if (period.time.min == 0) {
    //                                 endTime =
    //                                     period.time.hour +
    //                                     1 +
    //                                     ":" +
    //                                     period.time.min +
    //                                     "0";
    //                             }
    //                         }
    //                         if (order[currentclass] == period.name) {
    //                             div.innerHTML += `
    //                     <span style='text-align:right'>${period.name}</span><br>(${startTime} - ${endTime})<br><br>
    //                   `;
    //                         } else {
    //                             div.innerHTML += `
    //                     <b>${period.name} </b><br>(${startTime} - ${endTime})<br><br>
    //               `;
    //                         }
    //                     }
    //                 }
    //             }
    //             divstyle.boxShadow = "0 1px 3px 0 rgba(0,0,0,.15)";
    //         }
    //     } else {
    //         div.innerHTML +=
    //             " <h3 style='text-align:left'>Schedule not saved, open course menu to load. Make sure your courses are ordered in the order you have them!<h3>";
    //     }
    //     // let quotesArr = quotes.split("\n");
    //     // let todayQuote = quotesArr[dayNow];
    //     // todayQuote = todayQuote
    //     //     .replace(/â€œ/g, '"') // Replace the opening quotation marks
    //     //     .replace(/â€/g, '"') // Replace the closing quotation marks
    //     //     .replace(/â€™/g, "'"); // Replace the apostrophe
    //     // div.innerHTML += `<br/><span style="font-size:10px">${todayQuote}</span>`;
    //     const container = document.getElementById("body");
    //     if (container) {
    //         container.appendChild(div);
    //         // container.appendChild(btn);
    //     }
    //     // div.innerHTML +=
    //     //     "<button onclick='crash()' style=`width=50px;height=50px;`>hi</button>";
    // }
}
// }
function changeAmount() {
    let bar = document.getElementById("progress");
    if (bar) {
        let progressCheck = document.getElementsByClassName(
            "progressCheck"
        ) as HTMLCollection;

        let checks = 0;

        for (let i = 0; i < progressCheck.length; i++) {
            let inputThing = progressCheck[i] as HTMLInputElement;
            if (inputThing.checked == true) {
                checks += 1;
            }
        }
        let myProgress = document.getElementById("myProgress");
        if (myProgress) {
            let targetWidth = (checks / progressCheck.length) * 200;

            let width = Number(
                myProgress.style.width.slice(
                    0,
                    myProgress.style.width.length - 2
                )
            );
            let increase: boolean = true;

            if (width < targetWidth) {
                increase = true;
            } else {
                increase = false;
            }

            let id = setInterval(frame, 8);

            function frame() {
                if (increase && width >= targetWidth) {
                    width = 0;
                    clearInterval(id);
                } else if (increase == false && width <= targetWidth) {
                    width = 0;
                    clearInterval(id);
                } else {
                    if (increase) {
                        width++;
                    } else {
                        width--;
                    }
                    if (myProgress) {
                        myProgress.style.width = width + "px";
                        myProgress.innerHTML = `${String(
                            Math.round(width / 2)
                        )}%`;
                        myProgress.style.backgroundColor = `rgb(${
                            255 / 2 - (Math.round(width / 2) * 2.25) / 1.5
                        }, ${Math.round(width / 2) * 2.25},${
                            (Math.round(width / 2) * 2.25) / 1.5
                        } )`;
                    }
                }
            }
        }

        bar.innerHTML = `${checks}/${progressCheck.length}`;
    }
}
let div = document.getElementById("upcoming-events") as HTMLDivElement;
if (div) {
    div.style.display = "none";
}

document.getElementsByClassName(
    "typography-button-primary-loader-button-3107419752"
)[0];
function checkBoxmaker() {
    waitForElement(
        ".upcoming-event.upcoming-event-block.course-event",
        function () {
            let progressCheck =
                document.getElementsByClassName("progressCheck");

            // Convert the HTMLCollection to an array and iterate over it
            Array.from(progressCheck).forEach((element) => {
                element.remove();
            });

            let progressCheckLabel =
                document.getElementsByClassName("progressCheckLabel");

            // Convert the HTMLCollection to an array and iterate over it
            Array.from(progressCheckLabel).forEach((element) => {
                element.remove();
            });
            let buttonShow = false;

            // document.getElementsByClassName("submissions-title")[1].innerHTML =
            //     "Due TODAY";
            let upcoming = document.getElementsByClassName(
                "upcoming-event upcoming-event-block course-event"
            );
            for (let j = 0; j < upcoming.length; j++) {
                if (upcoming[j].className.includes("hidden-important")) {
                    let elm = upcoming[j].getElementsByTagName(
                        "img"
                    )[0] as HTMLImageElement;
                    if (elm == undefined) {
                        buttonShow = true;
                    }
                }
            }
            if (buttonShow) {
                if (document.getElementById("todo") !== undefined) {
                    let todo = document.getElementById(
                        "todo"
                    ) as HTMLDivElement;
                    if (displayedAll == false) {
                        todo.innerHTML += `<li class="s-edge-feed-more-link last dropdowndiv" style="display: block;"><a id="dropdownMore" class="active sExtlink-processed sEdgeMore-processed">more</a></li>`;
                        displayedAll = true;
                    } else {
                        todo.innerHTML += `<li class="s-edge-feed-more-link last dropdowndiv" style="display: block;" ><a
                 class="active sExtlink-processed sEdgeMore-processed">Less</a></li>`;
                        displayedAll = false;
                    }
                    //dropdownthing
                    document
                        .getElementById("dropdownMore")
                        ?.addEventListener("click", function () {
                            if (document.getElementById("dropdownMore")) {
                                document
                                    .getElementById("dropdownMore")
                                    ?.remove();
                            }

                            const img = document.createElement("img");
                            img.id = "ajaxloader";
                            img.className = "dropdowndiv2";
                            img.src =
                                "https://schoology.shschools.org/sites/all/themes/schoology_theme/images/ajax-loader.gif";
                            todo.appendChild(img);
                            setTimeout(() => {
                                document.getElementById("ajaxloader")?.remove();
                                let upcoming = document.getElementsByClassName(
                                    "upcoming-event upcoming-event-block course-event"
                                );
                                if (document.getElementById("dropdown")) {
                                    document
                                        .getElementById("dropdown")
                                        ?.remove();
                                }
                                for (let j = 0; j < upcoming.length; j++) {
                                    if (
                                        upcoming[j].className.includes(
                                            "hidden-important"
                                        )
                                    ) {
                                        let elm = upcoming[
                                            j
                                        ].getElementsByTagName(
                                            "img"
                                        )[0] as HTMLImageElement;
                                        if (elm == undefined) {
                                            let newClass = upcoming[
                                                j
                                            ].className.replace(
                                                "hidden-important",
                                                ""
                                            );

                                            upcoming[
                                                j
                                            ].previousElementSibling?.className.replace(
                                                "hidden",
                                                ""
                                            );
                                            upcoming[j].className = newClass;
                                        }
                                    }
                                }
                                checkBoxmaker();
                                changeAmount();
                            }, 300);
                        });
                }
            }
            upcoming = document.getElementsByClassName(
                "upcoming-event upcoming-event-block course-event"
            );

            for (let j = 0; j < upcoming.length; j++) {
                if (
                    upcoming[j].className.includes("hidden-important") == false
                ) {
                    let input = document.createElement("input");
                    input.className = "progressCheck";

                    input.type = "checkbox";

                    let save = localStorage.getItem("saveState");
                    upcoming[j].appendChild(input);

                    let children = input.parentElement?.firstElementChild
                        ?.children as HTMLCollection;
                    let childrenchild = children[0].children[1].children;

                    if (childrenchild) {
                        for (let i = 0; i < childrenchild.length; i++) {
                            if (
                                childrenchild[i].className ==
                                "sExtlink-processed"
                            ) {
                                let elm = childrenchild[i] as HTMLDivElement;

                                let original = elm.innerText;
                                let lower = original.toLowerCase();

                                if (
                                    (lower.includes("quiz") ||
                                        lower.includes(" test") ||
                                        lower.includes("minor") ||
                                        lower.includes("c4u") ||
                                        lower.includes("cfu") ||
                                        lower.includes("major")) &&
                                    lower.includes("hw") == false
                                ) {
                                    input.style.accentColor = "green";

                                    elm.style.color = "red";
                                }

                                if (save !== null) {
                                    let elm = childrenchild[
                                        i
                                    ] as HTMLDivElement;
                                    saveState = JSON.parse(save);

                                    if (saveState[elm.innerText] == true) {
                                        input.checked = true;
                                        childrenchild[
                                            i
                                        ].innerHTML = `<s>${elm.innerText}</s>`;
                                        let child: any =
                                            childrenchild[i].parentElement
                                                ?.parentElement?.parentElement
                                                ?.parentElement;

                                        child.style.opacity = "0.8";
                                        let timout = setInterval(() => {
                                            if (deleteAsign == false) {
                                                clearInterval(timout);
                                            } else if (
                                                deleteAsign !== null &&
                                                deleteAsign == true
                                            ) {
                                                child.remove();
                                                clearInterval(timout);
                                            }
                                        }, 1);
                                    } else {
                                        input.checked = false;
                                        let child: any =
                                            childrenchild[i].parentElement
                                                ?.parentElement?.parentElement
                                                ?.parentElement;

                                        child.style.opacity = "1";
                                        childrenchild[
                                            i
                                        ].innerHTML = `${childrenchild[
                                            i
                                        ].innerHTML.replace(/<\/?s>/g, "")}`;
                                    }
                                }
                            }
                        }
                    }

                    let dateHeaders =
                        document.getElementsByClassName("date-header");
                    Array.from(dateHeaders).forEach((element) => {
                        if (
                            element.nextElementSibling?.classList.contains(
                                "hidden-important"
                            ) == false
                        ) {
                            element.className = element.className.replace(
                                "hidden",
                                ""
                            );
                        }
                        let child = element.firstElementChild as HTMLDivElement;

                        function titleCase(str: any) {
                            var splitStr = str.toLowerCase().split(" ");
                            for (var i = 0; i < splitStr.length; i++) {
                                splitStr[i] =
                                    splitStr[i].charAt(0).toUpperCase() +
                                    splitStr[i].substring(1);
                            }
                            return splitStr.join(" ");
                        }

                        let innertext = (element as HTMLDivElement).innerText;
                        innertext = titleCase(innertext);
                        (element as HTMLDivElement).innerHTML =
                            `<p>` + innertext + `</p>`;
                        child = element.firstElementChild as HTMLDivElement;
                        child.className = "h4s";
                    });

                    input.addEventListener("click", function () {
                        let children = input.parentElement?.firstElementChild
                            ?.children as HTMLCollection;
                        let childrenchild = children[0].children[1].children;
                        if (childrenchild) {
                            changeAmount();
                            for (let i = 0; i < childrenchild.length; i++) {
                                if (
                                    childrenchild[i].className ==
                                    "sExtlink-processed"
                                ) {
                                    let elmchild = childrenchild[
                                        i
                                    ] as HTMLParagraphElement;
                                    if (input.checked) {
                                        saveState[elmchild.innerText] = true;
                                        localStorage.setItem(
                                            "saveState",
                                            JSON.stringify(saveState)
                                        );

                                        childrenchild[
                                            i
                                        ].innerHTML = `<s>${elmchild.innerText}</s>`;
                                        let child: any =
                                            childrenchild[i].parentElement
                                                ?.parentElement?.parentElement
                                                ?.parentElement;

                                        child.style.opacity = "0.8";
                                        if (
                                            deleteAsign !== null &&
                                            deleteAsign
                                        ) {
                                            child.remove();
                                        }
                                    } else {
                                        let child: any =
                                            childrenchild[i].parentElement
                                                ?.parentElement?.parentElement
                                                ?.parentElement;

                                        child.style.opacity = "1";
                                        childrenchild[
                                            i
                                        ].innerHTML = `${childrenchild[
                                            i
                                        ].innerHTML.replace(/<\/?s>/g, "")}`;
                                        saveState[elmchild.innerText] = false;

                                        localStorage.setItem(
                                            "saveState",
                                            JSON.stringify(saveState)
                                        );
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
    );
}

function gradeUpdate() {
    if (
        window.location.href == "https://schoology.shschools.org/grades/grades"
    ) {
        let gradebookElms = document.getElementsByClassName(
            "gradebook-course-grades"
        );
        for (let i = 0; i < gradebookElms.length; i++) {
            let elm = gradebookElms[i] as HTMLElement;
            elm.style.display = "block";
            let parent = document.getElementsByClassName("course-grade-value")[
                i
            ] as HTMLSpanElement;
            let gradeElm = parent.firstChild?.firstChild as HTMLElement;
            let grade = gradeElm.innerHTML;
            let title = document.getElementsByClassName(
                "gradebook-course-title"
            )[i];

            title.innerHTML += `  <span style="color:green; font-size:20px;">(${grade})<span>`;
            let gradeDivs = document.getElementsByClassName(
                " gradebook-course hierarchical-grading-report show-title interactive sGradesGradebook-processed sGradeHierarchicalReport-processed"
            )[i] as HTMLElement;
            gradeDivs.style.borderRadius = "10px";
        }

        for (let i = 0; i < gradebookElms.length; i++) {
            let elm = gradebookElms[i] as HTMLElement;
            elm.style.display = "none";
        }
    }
}
gradeUpdate();
function notePage() {
    if (window.location.href == "https://schoology.shschools.org/study") {
        let title = document.getElementsByTagName(
            "title"
        )[0] as HTMLTitleElement;
        title.innerText = "Notes | Schoology";

        let text = localStorage.getItem("textSave");
        document.getElementById("content-wrapper")?.remove();
        let div = document.createElement("textarea");
        let notecontainer = document.createElement("div");
        notecontainer.id = "notecontainer";
        div.className = "textAreaNote";
        div.id = "textarea";

        let divheader = document.createElement("div");

        divheader.className = "divheader";
        divheader.id = "divheader1";

        if (text) {
            div.value = text;
        }
        divheader.innerHTML = "Notes";
        notecontainer.appendChild(divheader);
        notecontainer.appendChild(div);
        let shown = true;
        divheader.addEventListener("click", function () {
            if (shown) {
                shown = false;
                div.style.transition = "all 0.2s";
                div.style.borderStyle = "none";
                setTimeout(() => {
                    div.style.opacity = "0";
                    div.style.padding = "0px";
                }, 200);

                div.style.height = "0px";
            } else {
                shown = true;
                div.style.opacity = "1";

                div.style.transition = "all 0.2s";
                div.style.borderStyle = "solid";
                div.style.padding = "15px";

                div.style.height = "500px";
            }
        });
        document.getElementById("body")?.appendChild(notecontainer);

        div.addEventListener("input", function () {
            if (div) {
                localStorage.setItem("textSave", div.value);
            }
        });
    }
}

notePage();

function studyPage() {
    if (window.location.href == "https://schoology.shschools.org/study") {
        let seconds: any = 0;
        let lastBlurTime = 0; // To store the timestamp when the window is blurred
        let todoList: any = [];
        todoList = localStorage.getItem("todo");

        todoList = JSON.parse(todoList);

        if (todoList == null) {
            todoList = [];
        }
        window.addEventListener("blur", leave);
        window.addEventListener("focus", returned);
        window.addEventListener("beforeunload", leave);
        window.addEventListener("load", returned);
        let awaytimeout: any;
        function leave() {
            // Save the current time in seconds when the window is blurred
            lastBlurTime = Math.round(new Date().getTime() / 1000);
            localStorage.setItem("lastBlurTime", JSON.stringify(lastBlurTime));
            clearInterval(countdown);
            awaytimeout = setInterval(() => {
                let title = document.getElementsByTagName(
                    "title"
                )[0] as HTMLTitleElement;
                title.innerText = `(${h1.innerHTML}) Study Session | Schoology`;
            }, 1000);
        }
        function returned() {
            if (awaytimeout) {
                clearInterval(awaytimeout);
            }
            let test = localStorage.getItem("lastBlurTime");
            if (test) {
                lastBlurTime = JSON.parse(test);

                if (lastBlurTime > 0 && timerStart) {
                    const currentTime = Math.round(new Date().getTime() / 1000);
                    const secondsElapsed = currentTime - lastBlurTime;
                    timeleft -= secondsElapsed;
                    lastBlurTime = 0;
                    if (timeleft >= 0) {
                        toggle();
                    } else {
                        timeleft = 0;
                        localStorage.setItem("timeLeft", "0");

                        SetTextLabel();
                    }
                }
            }
        }
        let asignmentcontainer = document.createElement("div");
        let options: any = [];
        let optionTags: any = [];

        const tags = [
            ["religion"],
            ["math", "geo"],
            ["history"],
            ["health"],
            ["biology"],
            ["spanish"],
            ["english"],
        ];
        asignmentcontainer.id = "asignmentcontainer";
        document.body.appendChild(asignmentcontainer);
        function getCurrentAsignments() {
            fetch(
                "https://schoology.shschools.org/home/upcoming_submissions_ajax"
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json(); // Assuming the response is JSON
                })
                .then((data) => {
                    let asignmentContainer = document.getElementById(
                        "asignmentcontainer"
                    ) as HTMLDivElement;
                    asignmentContainer.innerHTML += data.html;
                    let asignments = document.getElementsByClassName(
                        "event-title"
                    ) as HTMLCollection;

                    Array.from(asignments).forEach((element) => {
                        let elementInner =
                            element.firstElementChild as HTMLParagraphElement;
                        let elementInnerdate = element.lastElementChild
                            ?.lastElementChild as HTMLParagraphElement;
                        // let elementInner =
                        //     element.firstElementChild as HTMLParagraphElement;
                        // options.push(
                        //     `(${elementInnerdate.innerText}) ${elementInner.innerText}`
                        options.push(elementInner.innerText);

                        optionTags.push(elementInnerdate.innerText);
                    });

                    asignmentcontainer.remove();
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    return error;
                });
        }

        getCurrentAsignments();

        // let data=getCurrentAsignments();

        // var regex = /le/gi,
        //     result,
        //     indices = [];
        // while ((result = regex.exec(data))) {
        //     indices.push(result.index);
        // }

        let title = document.getElementsByTagName(
            "title"
        )[0] as HTMLTitleElement;
        title.innerText = "Study Session | Schoology";

        document.getElementById("content-wrapper")?.remove();
        document.getElementById("site-navigation-footer")?.remove();
        document.getElementById("main-content-wrapper")?.remove();
        let wrapper = document.getElementById("wrapper");
        let container = document.createElement("div");
        // container.style.background = "blue";
        document.getElementById("wrapper")?.before(container);
        if (wrapper) {
            wrapper.className = "";
        }

        let TODOlabel = document.createElement("p");
        TODOlabel.className = "todolabel";
        TODOlabel.innerHTML = "Todo List:";

        container.appendChild(TODOlabel);
        let startbtn = document.createElement("button");
        startbtn.className = "hugeBtn";
        startbtn.innerHTML = "Study";
        container.appendChild(startbtn);

        let h1 = document.createElement("h1");
        h1.className = "timerText";
        h1.innerHTML = "0:00";
        container.appendChild(h1);
        function updateList() {
            let containerTest =
                document.getElementsByClassName("containerDiv")[0];
            if (containerTest) {
                (containerTest as HTMLDivElement).remove();
            }
            let container = document.createElement("div");
            container.className = "containerDiv";
            type Todo = [itemName: string, values: boolean];
            let count = -1;

            startbtn.before(container);
            container.appendChild(createNewBtn);

            todoList.forEach((item: Todo) => {
                count++;

                const [itemName, values] = item;
                let newElm = document.createElement("div");
                newElm.className = "listDiv";

                let textLabel = document.createElement("p");
                textLabel.className = "textLabel";
                textLabel.innerHTML = itemName;
                textLabel.contentEditable = "true";
                textLabel.id = "txtlabel" + String(count);
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = values;
                checkbox.className = "checkboxItem";
                checkbox.id = "checkbox" + String(count);

                let button = document.createElement("button");
                button.className = "deletebn";
                button.id = "deletebn" + String(count);
                button.innerHTML = "X";
                newElm.style.marginTop = "0px";
                checkbox.style.marginTop = "0px";
                createNewBtn.before(newElm);
                newElm.appendChild(textLabel);
                newElm.appendChild(checkbox);
                newElm.appendChild(button);
                //begin

                let dropdown = document.createElement("section");
                dropdown.classList.add("hi2d");
                // Show and filter dropdown
                textLabel.addEventListener("input", () => {
                    const query = textLabel.innerText.toLowerCase();
                    dropdown.innerHTML = ""; // Clear previous options
                    let filteredOptions: any = [];
                    for (let i = 0; i < options.length; i++) {
                        let option =
                            options[i].toLowerCase() +
                            optionTags[i].toLowerCase();

                        if (option.includes(query)) {
                            filteredOptions.push(options[i]);
                        }
                        //addtags
                    }
                    if (filteredOptions.length > 0) {
                        dropdown.classList.remove("hidden");
                        filteredOptions.forEach((option: any) => {
                            const div = document.createElement("div");
                            div.classList.add("selectoptions");

                            div.textContent = option;
                            dropdown.appendChild(div);

                            div.addEventListener("click", () => {
                                textLabel.innerText = option;

                                dropdown.classList.add("hidden");
                                let countnum = textLabel.id;
                                countnum = String(countnum).slice(
                                    8,
                                    countnum.length
                                );
                                let inner = document.getElementById(
                                    "txtlabel" + countnum
                                ) as HTMLDivElement;

                                todoList[Number(countnum)] = [
                                    document.getElementById(
                                        "txtlabel" + countnum
                                    )?.innerText,
                                    (
                                        document.getElementById(
                                            "checkbox" + countnum
                                        ) as HTMLInputElement
                                    ).checked,
                                ];
                                localStorage.setItem(
                                    "todo",
                                    JSON.stringify(todoList)
                                );
                            });
                        });
                    } else {
                        dropdown.classList.add("hidden"); // Hide dropdown if no matches
                    }
                });
                newElm.after(dropdown);
                // Hide dropdow if clicked outside
                // document.addEventListener("click", (e) => {
                //     let target=e.target
                //     if (target !==null){

                //     if (!target.closest(".input-container")) {
                //         dropdown.classList.add("hidden");
                //     }
                // }
                // });
                //end

                button.addEventListener("click", function () {
                    let countnum = this.id;

                    countnum = String(countnum).slice(8, countnum.length);

                    todoList.splice(Number(countnum), 1); // 2nd parameter means remove one item only

                    localStorage.setItem("todo", JSON.stringify(todoList));
                    let parent = this.parentElement as HTMLDivElement;
                    parent.style.transition = "all 0.5s";
                    parent.style.left = "500px";

                    parent.style.opacity = "0";

                    setTimeout(() => {
                        updateList();
                    }, 500);
                });
                function changed(this: { id: string }) {
                    let countnum = this.id;
                    countnum = String(countnum).slice(8, countnum.length);
                    let inner = document.getElementById(
                        "txtlabel" + countnum
                    ) as HTMLDivElement;

                    todoList[Number(countnum)] = [
                        document.getElementById("txtlabel" + countnum)
                            ?.innerText,
                        (
                            document.getElementById(
                                "checkbox" + countnum
                            ) as HTMLInputElement
                        ).checked,
                    ];
                    localStorage.setItem("todo", JSON.stringify(todoList));
                }
                textLabel.addEventListener("input", changed);
                checkbox.addEventListener("input", changed);
            });
        }
        let createNewBtn = document.createElement("button");
        createNewBtn.className = "createNewBtn";
        createNewBtn.innerHTML = `<span id="plusIcon" class="material-symbols-outlined">
add
</span><span> Create new Item</span>`;

        container.appendChild(createNewBtn);
        createNewBtn.addEventListener("click", function () {
            todoList.push(["New Item", false]);
            localStorage.setItem("todo", JSON.stringify(todoList));

            updateList();
        });
        let timerStart = false;
        let timeleft = 1200;
        let countdown: any = null;

        let isOnStorage = localStorage.getItem("timerIsOn");
        let timeLeftStorage = localStorage.getItem("timeLeft");
        if (isOnStorage && timeLeftStorage) {
            timerStart = JSON.parse(isOnStorage);
            timeleft = JSON.parse(timeLeftStorage);
            toggle();
        }
        SetTextLabel();
        function SetTextLabel() {
            if (String(Math.floor(timeleft % 60)).length == 1) {
                h1.innerHTML = `${Math.floor(timeleft / 60)}:0${Math.floor(
                    timeleft % 60
                )} `;
            } else {
                h1.innerHTML = `${Math.floor(timeleft / 60)}:${Math.floor(
                    timeleft % 60
                )} `;
            }
            let title = document.getElementsByTagName(
                "title"
            )[0] as HTMLTitleElement;
            title.innerText = `(${h1.innerHTML}) Study Session | Schoology`;
        }
        function toggle() {
            if (timerStart) {
                startbtn.innerHTML = "Pause";
            } else {
                startbtn.innerHTML = "Study";
            }
            localStorage.setItem("timerIsOn", JSON.stringify(timerStart));
            if (countdown !== null) {
                clearInterval(countdown);
            }
            if (timerStart) {
                countdown = setInterval(() => {
                    timeleft -= 0.1;
                    localStorage.setItem("timeLeft", JSON.stringify(timeleft));
                    SetTextLabel();

                    if (timeleft <= 0) {
                        h1.innerHTML = "0:00";
                        timerStart = false;
                        timeleft = 1200;
                        toggle();
                        return;
                    }
                }, 100);
            } else {
                if (countdown !== null) {
                    clearInterval(countdown);
                }
            }
        }
        updateList();

        startbtn.addEventListener("click", function () {
            if (timerStart) {
                timerStart = false;
                startbtn.innerHTML = "Study";
            } else {
                timerStart = true;
                startbtn.innerHTML = "Pause";
            }

            toggle();
        });
    }
}

studyPage();

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
let recentlyCompleted = document.getElementsByClassName(
    "refresh-button"
)[0] as HTMLButtonElement;

if (recentlyCompleted) {
    recentlyCompleted.click();
}

setTimeout(() => {
    let RecentCompletelist = document.getElementsByClassName(
        "recently-completed-event"
    );
    let used = 0;
    for (let i = 0; i < RecentCompletelist.length; i++) {
        let elm = RecentCompletelist[i] as HTMLDivElement;
        let stored = localStorage.getItem("oldGrade");
        let old = [];

        if (stored) {
            old = JSON.parse(stored);
        } else {
            old = [];
        }
        let gradeBad: any =
            RecentCompletelist[i].getElementsByTagName("span")[5]
                .firstElementChild?.innerHTML;

        if (old.includes(elm.innerText) == false && gradeBad !== "—") {
            let link: any = RecentCompletelist[i].firstElementChild
                ?.getElementsByTagName("span")[1]
                .getElementsByTagName("a")[0];
            link = link as HTMLLinkElement;
            old.push(elm.innerText);
            localStorage.setItem("oldGrade", JSON.stringify(old));

            let grade: any = null;

            let iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            // iframe.src = a[j].href;
            iframe.src = link.href;

            iframe.onload = () => {
                if (iframe.contentDocument) {
                    grade = iframe.contentDocument.getElementsByClassName(
                        "grading-grade"
                    )[0] as HTMLDivElement;

                    if (grade !== undefined) {
                        grade = grade.innerText;
                        iframe.remove();
                        grade = grade.replace("Grade:", "").trim();
                        let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${link.href}>${link.innerText}</a>`;
                        let popupBanner = document.createElement("div");
                        popupBanner.id = "popupBanner";

                        popupBanner.innerHTML = message;
                        popupBanner.style.top = `${20 + used * 100}px`;
                        used += 1;

                        document.body.appendChild(popupBanner);

                        setTimeout(() => {
                            popupBanner.style.right = "20px";
                        }, 100);
                        setTimeout(() => {
                            popupBanner.style.right = "-300px";
                        }, 7000);
                    } else {
                        let src = iframe.src.replace(
                            "assignment",
                            "assignments"
                        );
                        iframe.src = src + "/mydocument";
                        iframe.onload = () => {
                            let content = iframe.contentDocument;
                            if (content) {
                                setTimeout(() => {
                                    grade = content.getElementsByClassName(
                                        "document-header-aside-graded-grade-3903705135"
                                    )[0] as HTMLDivElement;
                                    if (grade !== null) {
                                        grade = grade.innerText;

                                        iframe.remove();
                                        grade = grade
                                            .replace("Grade:", "")
                                            .trim();
                                        let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${link.href}>${link.innerText}</a>`;
                                        let popupBanner =
                                            document.createElement("div");
                                        popupBanner.id = "popupBanner";

                                        popupBanner.innerHTML = message;
                                        popupBanner.style.top = `${
                                            20 + used * 100
                                        }px`;
                                        used += 1;

                                        document.body.appendChild(popupBanner);

                                        setTimeout(() => {
                                            popupBanner.style.right = "20px";
                                        }, 100);
                                        setTimeout(() => {
                                            popupBanner.style.right = "-300px";
                                        }, 7000);
                                    }
                                }, 2000);
                            }
                        };
                    }
                }
            };
        }
    }
}, 2000);

let waiting = setInterval(function () {
    let update = document.getElementsByClassName(
        "update-body s-rte"
    )[0] as HTMLDivElement;
    if (update) {
        clearInterval(waiting);

        if (localStorage.getItem("oldUpdate") !== update.innerText) {
            localStorage.setItem("oldUpdate", update.innerText);
            let div = document.getElementsByClassName(
                "s-edge-type-update-post sUpdate-processed"
            )[0] as HTMLDivElement;
            div.style.borderColor = "#42c5f9";
            div.style.borderWidth = "5px";
            div.style.borderStyle = "solid";
            div.style.borderRadius = "10px";
        }
    }
}, 10);

// function logKey(e: any) {
//     if (e.keyCode == "91") {
//         if (e.keyCode == "91") {

//         alert();
//         }
//     }
// }
// document.body.addEventListener("down", logKey);

// ©2024 William Chou. All rights reserved.

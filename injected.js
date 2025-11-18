"use strict";
console.log("Schoology X Injected :)");
let extensionOn = localStorage.getItem("extensionOn");
if (!(extensionOn && extensionOn == "true")) {
    document.head.insertAdjacentHTML("beforeend", `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
`);
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let assignmentDates = [];
    let order = [];
    let schedule = localStorage.getItem("schedule");
    if (schedule != null && schedule != "") {
        order = JSON.parse(schedule);
    }
    let customAssignments = [];
    let customAssignmentsStorage = localStorage.getItem("customAssignments");
    if (customAssignmentsStorage != null &&
        customAssignmentsStorage != "" &&
        customAssignmentsStorage != undefined) {
        customAssignments = JSON.parse(customAssignmentsStorage);
        sortCustomAssignmentsByDate();
        localStorage.setItem("customAssignments", JSON.stringify(customAssignments));
    }
    let assignmentLabel;
    let baseUrl = "https://schoology.shschools.org";
    let allowedURLs = [
        baseUrl + "/home",
        baseUrl + "/home/",
        baseUrl + "/",
        baseUrl,
        baseUrl + "/home/recent-activity",
    ];
    let displayedAllAssignments = false;
    let userHasViewedRecentUpdate = [];
    function recentUpdateCheck() {
        let readMessageStorage = localStorage.getItem("readMessage");
        if (readMessageStorage) {
            userHasViewedRecentUpdate = JSON.parse(readMessageStorage);
        }
    }
    function normalizeDateString(str) {
        if (!str)
            return str;
        str = str.trim();
        // Remove leading "Due "
        str = str.replace(/^Due\s+/i, "");
        // Remove weekday (e.g. "Tuesday, ")
        str = str.replace(/^([A-Za-z]+),\s*/i, "");
        // Split off the time if present ("11:59 pm")
        let parts = str.split(" at ");
        let datePart = parts[0]; // "November 18, 2025"
        let timePart = parts[1] || ""; // "11:59 pm" or ""
        // Normalize commas and spaces
        datePart = datePart.replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ");
        // Return standardized string
        return timePart ? `${datePart} ${timePart}` : datePart;
    }
    function getCustomAssignmentTimestamp(dateString) {
        if (!dateString) {
            return NaN;
        }
        const normalizedDate = normalizeDateString(dateString);
        if (!normalizedDate) {
            return NaN;
        }
        return new Date(normalizedDate).getTime();
    }
    function sortCustomAssignmentsByDate() {
        customAssignments.sort((a, b) => {
            const firstDate = getCustomAssignmentTimestamp(a[1]);
            const secondDate = getCustomAssignmentTimestamp(b[1]);
            if (isNaN(firstDate) && isNaN(secondDate)) {
                return 0;
            }
            if (isNaN(firstDate)) {
                return 1;
            }
            if (isNaN(secondDate)) {
                return -1;
            }
            return firstDate - secondDate;
        });
    }
    recentUpdateCheck();
    function isBackgroundDark(hexColor) {
        let r = parseInt(hexColor.slice(1, 3), 16);
        let g = parseInt(hexColor.slice(3, 5), 16);
        let b = parseInt(hexColor.slice(5, 7), 16);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 128;
    }
    let deleteCompleteAssignments = null;
    function createBessyGradeButton() {
        let buttonTemplateClone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
        let buttonIcon = document.createElement("button");
        buttonIcon.className = "volunteerBtn";
        buttonIcon.innerHTML = `<span class="material-symbols-outlined">
check_circle
</span>`;
        buttonIcon.addEventListener("click", function () {
            window.open("https://gunn.one/grades");
        });
        buttonTemplateClone.before(buttonIcon);
    }
    function createStudyButton() {
        let buttonTemplateClone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
        let buttonIcon = document.createElement("button");
        buttonIcon.className = "volunteerBtn";
        buttonIcon.innerHTML = `<span class="material-symbols-outlined">
timer
</span>`;
        buttonIcon.addEventListener("click", function () {
            window.open("https://wjchou2.github.io/Learnify/index.html");
        });
        buttonTemplateClone.before(buttonIcon);
    }
    createStudyButton();
    createBessyGradeButton();
    function adjustButtonHoverBrightness(hexColor, percent) {
        percent = Math.max(-100, Math.min(100, percent));
        let r = parseInt(hexColor.slice(1, 3), 16);
        let g = parseInt(hexColor.slice(3, 5), 16);
        let b = parseInt(hexColor.slice(5, 7), 16);
        let adjustmentFactor = Math.round((percent / 100) * 255);
        r = Math.min(255, Math.max(0, r + adjustmentFactor));
        g = Math.min(255, Math.max(0, g + adjustmentFactor));
        b = Math.min(255, Math.max(0, b + adjustmentFactor));
        let newHex = "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2);
        return newHex;
    }
    let headerColor = "#ffffff";
    let headerHoverColor = adjustButtonHoverBrightness(headerColor, -20); // Lighten by 20%
    window.addEventListener("colorChange", function (e) {
        const customEvent = e;
        if (customEvent.detail &&
            typeof customEvent.detail.value !== "undefined") {
            const deleteAssignValue = customEvent.detail.value; // Access the value from the event detail
            headerColor = deleteAssignValue;
            localStorage.setItem("color", headerColor);
            if (isBackgroundDark(headerColor)) {
                headerHoverColor = adjustButtonHoverBrightness(headerColor, 10); // Lighten by 20%
            }
            else {
                headerHoverColor = adjustButtonHoverBrightness(headerColor, -10); // Lighten by 20%
            }
            changeHeaderColor();
        }
        else {
            console.error("No value found in event detail");
        }
    });
    if (localStorage.getItem("color")) {
        headerColor = localStorage.getItem("color");
        if (isBackgroundDark(headerColor)) {
            headerHoverColor = adjustButtonHoverBrightness(headerColor, 10); // Lighten by 20%
        }
        else {
            headerHoverColor = adjustButtonHoverBrightness(headerColor, -10); // Lighten by 20%
        }
    }
    window.addEventListener("resize", changeHeaderColor);
    function changeHeaderColor() {
        function hasHeaderAncestor(element) {
            while (element.parentElement) {
                element = element.parentElement;
                if (element.tagName.toLowerCase() === "header") {
                    return true;
                }
            }
            return false;
        }
        let headerLinkElements = document.getElementsByTagName("a");
        let headerButtonElements = document.getElementsByTagName("button");
        const headerBackground = document.getElementsByClassName("_1tpub _3mp5E _24W2g util-justify-content-space-between-3euFK")[0];
        headerBackground.style.backgroundColor = headerColor;
        document.getElementsByClassName("_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD")[0].style.backgroundColor = headerColor;
        document.getElementsByClassName("_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD")[0].style.borderTop = `3px solid ${headerColor}`;
        let IMGParent = document.getElementsByClassName("util-height-six-3PHnk util-width-auto-1-HYR util-max-width-sixteen-3-tkk fjQuT _1tpub _2JX1Q")[0];
        let headerIconIds = [
            "icon-search-v2-3US0j",
            "icon-app-grid-v2-xZFWs",
            "icon-calendar-v2-16S3z",
            "icon-mail-v2-2Mxyq",
            "icon-bell-v2-3oo-G",
        ];
        for (let i = 0; i < headerIconIds.length; i++) {
            let icon = document.getElementById(headerIconIds[i]);
            let path = icon.firstElementChild;
            if (isBackgroundDark(headerColor)) {
                path.setAttribute("fill", "#ffffff");
            }
            else {
                path.setAttribute("fill", "#333333");
            }
        }
        const SHSHeaderImage = IMGParent.firstElementChild;
        SHSHeaderImage.src =
            "https://i.ibb.co/YpdfP2k/logo-removebg-preview-2.png"; // Replace this with the direct URL of the image
        for (let i = 0; i < headerLinkElements.length; i++) {
            if (hasHeaderAncestor(headerLinkElements[i])) {
                if (headerLinkElements[i].title !== "Home" &&
                    headerLinkElements[i].innerHTML !== "My Courses" &&
                    headerLinkElements[i].role !== "menuitem") {
                    if (headerLinkElements[i] !== null) {
                        if (isBackgroundDark(headerColor)) {
                            headerLinkElements[i].style.color =
                                "#ffffff";
                        }
                        else {
                            headerLinkElements[i].style.color =
                                "#333333";
                        }
                    }
                    headerLinkElements[i].style.backgroundColor = headerColor;
                    headerLinkElements[i].style.borderRadius = "10px";
                    headerLinkElements[i].addEventListener("mouseover", function () {
                        headerLinkElements[i].style.backgroundColor =
                            headerHoverColor;
                    });
                    headerLinkElements[i].addEventListener("mouseleave", function () {
                        headerLinkElements[i].style.backgroundColor =
                            headerColor;
                    });
                }
            }
        }
        for (let i = 0; i < headerButtonElements.length; i++) {
            if (hasHeaderAncestor(headerButtonElements[i])) {
                headerButtonElements[i].style.backgroundColor = headerColor;
                if (headerButtonElements[i]
                    .firstElementChild !== null) {
                    if (isBackgroundDark(headerColor)) {
                        headerButtonElements[i]
                            .firstElementChild.style.color = "#ffffff";
                        headerButtonElements[i].style.color =
                            "#ffffff";
                        let gradebtn = document.getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx")[2];
                        gradebtn.style.color = "#ffffff";
                    }
                    else {
                        headerButtonElements[i]
                            .firstElementChild.style.color = "#333333";
                        headerButtonElements[i].style.color =
                            "#333333";
                        let gradebtn = document.getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx")[2];
                        gradebtn.style.color = "#333333";
                    }
                }
                headerButtonElements[i].style.borderRadius = "10px";
                headerButtonElements[i].addEventListener("mouseover", function () {
                    headerButtonElements[i].style.backgroundColor =
                        headerHoverColor;
                });
                headerButtonElements[i].addEventListener("mouseleave", function () {
                    headerButtonElements[i].style.backgroundColor =
                        headerColor;
                });
            }
        }
    }
    function waitForElement(className, callback) {
        let element = document.querySelector(className);
        if (element) {
            callback(element);
            return;
        }
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
    let courseOpenDebounce = true;
    function changeCourseStyles() {
        setInterval(function () {
            if (courseOpenDebounce) {
                courseOpenDebounce = false;
                waitForElement(".Card-card-data-17m6S", function () {
                    const courseCards = document.getElementsByClassName("Card-card-data-17m6S");
                    const courseImages = document.getElementsByClassName(" _2q19q Card-card-image-uV6Bu");
                    order = ["Other"];
                    for (let i = 0; i < courseCards.length; i++) {
                        const courseDiv = courseCards[i];
                        let firstChild = courseDiv.firstElementChild;
                        let secondChild = firstChild === null || firstChild === void 0 ? void 0 : firstChild.firstElementChild;
                        let className = secondChild === null || secondChild === void 0 ? void 0 : secondChild.innerHTML;
                        let isClassLabel = document.getElementsByClassName("_2wOCj xjR5v _2qcpH _17Z60 _1Aph- gs0RB")[0];
                        if (className && isClassLabel != null) {
                            order.push(className);
                        }
                        const selectedCourseCard = courseCards[i];
                        selectedCourseCard.style.borderRadius =
                            "0  0 15px 15px";
                        let courseCardImage = courseImages[i];
                        courseCardImage.style.borderRadius = " 15px 15px 0 0";
                        const div = selectedCourseCard.parentElement;
                        div.parentElement.style.borderRadius =
                            "15px";
                        const div2 = selectedCourseCard.parentElement;
                        if (div2) {
                            courseCardImage.style.borderColor = "blue";
                            selectedCourseCard.style.borderColor = "blue";
                            div2.style.borderRadius = "15px";
                        }
                    }
                    courseOpenDebounce = true;
                    localStorage.setItem("schedule", JSON.stringify(order));
                });
            }
        }, 100);
    }
    changeCourseStyles();
    let checkboxStates = {};
    if (allowedURLs.includes(window.location.href) ||
        window.location.href.includes("course-dashboard")) {
        let waitForHomePageInterval = setInterval(function () {
            if (document.getElementsByClassName("submissions-title")[0] !==
                undefined &&
                document.getElementsByClassName("submissions-title")[1] !==
                    undefined) {
                clearInterval(waitForHomePageInterval);
                setTimeout(function () {
                    var _a, _b, _c;
                    drawCheckboxes();
                    let p = document.createElement("p");
                    p.innerHTML = "";
                    p.id = "progress";
                    (_a = document.getElementById("todo")) === null || _a === void 0 ? void 0 : _a.appendChild(p);
                    let div = document.createElement("div");
                    div.id = "myProgress";
                    (_b = document.getElementById("todo")) === null || _b === void 0 ? void 0 : _b.appendChild(div);
                    let div2 = document.createElement("div");
                    div2.id = "myProgressFrame";
                    (_c = document.getElementById("todo")) === null || _c === void 0 ? void 0 : _c.appendChild(div2);
                    updateProgressBarState();
                }, 0);
            }
        }, 10);
    }
    function updateProgressBarState() {
        let progressFraction = document.getElementById("progress");
        if (progressFraction) {
            let checkboxElements = document.getElementsByClassName("progressCheck");
            let checks = 0;
            for (let i = 0; i < checkboxElements.length; i++) {
                let selectedCheckboxElement = checkboxElements[i];
                if (selectedCheckboxElement.checked == true) {
                    checks += 1;
                }
            }
            let progressBarDiv = document.getElementById("myProgress");
            let progressIsZero = false;
            if (progressBarDiv) {
                let targetProgressBarWidth = (checks / checkboxElements.length) * 200;
                if (checks == 0) {
                    progressIsZero = true;
                }
                else {
                    progressIsZero = false;
                }
                let currentProgressBarWidth = Number(progressBarDiv.style.width.slice(0, progressBarDiv.style.width.length - 2));
                let incrementIncrease = true;
                if (currentProgressBarWidth < targetProgressBarWidth) {
                    incrementIncrease = true;
                }
                else {
                    incrementIncrease = false;
                }
                let id = setInterval(frame, 8);
                function frame() {
                    if (incrementIncrease &&
                        currentProgressBarWidth >= targetProgressBarWidth) {
                        currentProgressBarWidth = 0;
                        clearInterval(id);
                    }
                    else if (!incrementIncrease &&
                        currentProgressBarWidth <= targetProgressBarWidth) {
                        currentProgressBarWidth = 0;
                        clearInterval(id);
                    }
                    else {
                        if (incrementIncrease) {
                            currentProgressBarWidth++;
                        }
                        else {
                            currentProgressBarWidth--;
                        }
                        if (progressBarDiv) {
                            progressBarDiv.style.width =
                                currentProgressBarWidth + "px";
                            if (progressIsZero) {
                                targetProgressBarWidth = 20;
                                progressBarDiv.innerHTML = "0%";
                            }
                            else {
                                progressBarDiv.innerHTML = `${String(Math.round((currentProgressBarWidth - 20) / 2) + 10)}%`;
                            }
                            progressBarDiv.style.backgroundColor = `rgb(${255 / 2 -
                                (Math.round(currentProgressBarWidth / 2) *
                                    2.25) /
                                    1}, ${(Math.round(currentProgressBarWidth / 2) *
                                2.25) /
                                1.2},${(Math.round(currentProgressBarWidth / 2) *
                                2.25) /
                                2} )`;
                        }
                    }
                }
            }
            progressFraction.innerHTML = `${checks}/${checkboxElements.length}`;
        }
    }
    let upcomingEventsDiv = document.getElementById("upcoming-events");
    if (upcomingEventsDiv) {
        upcomingEventsDiv.style.display = "none";
    }
    function drawCustomAssignments() {
        sortCustomAssignmentsByDate();
        if (document.getElementById("newTaskBtn") == null) {
            let newTaskBtn = document.createElement("button");
            let upcomingCourseEvents = document.getElementById("right-column-inner");
            newTaskBtn.id = "newTaskBtn";
            newTaskBtn.innerHTML = `<span class="material-symbols-outlined">
        add
        </span>`;
            upcomingCourseEvents.style.pointerEvents = "auto";
            upcomingCourseEvents.appendChild(newTaskBtn);
            newTaskBtn.addEventListener("click", function () {
                test();
            });
        }
        Array.from(document.getElementsByClassName("CustomAssignment")).forEach((element) => element.remove());
        let index = 0;
        customAssignments.forEach(([newtitle, newformatted, newclassTag]) => {
            drawCustomAssignment(newtitle, newformatted, newclassTag, index);
            index++;
        });
        closePopup(); //close is. not valid func
        // drawCheckboxes();
    }
    function test() {
        var _a, _b, _c, _d, _e;
        for (let i = 0; i < 10; i++) { }
        document.body.insertAdjacentHTML("beforeend", `
<div id="popups-overlay"></div>

<div
    id="popups-2"
    class="popups-box popups-large calendar-popup-add smart-box allow-overflow s-tinymce-view-lite"
    role="dialog"
    aria-labelledby="popups-2-title"
    aria-modal="true"
    style="top: 107px"
>
    <!-- TITLE BAR -->
    <div class="popups-title">
        <div class="popups-close">
            <a id="close2" role="button"><span class="visually-hidden">Close</span></a>
        </div>
        <div class="title" id="popups-2-title">Create Custom Event</div>
        <div class="clear-block"></div>
    </div>

    <!-- BODY -->
    <div class="popups-body">
        <div class="popups-body-inner">
            <!-- Tabs -->
            <ul id="calender-smartbox-tabs" class="filter-block">
                <li class="filter-item add-label calendar-form-tab">
                    Post: <span class="form-required">*</span>
                </li>
                <li class="filter-item add-event calendar-form-tab active">
                    <span class="smartbox-boxtab" role="button" tabindex="0"
                        >Event</span
                    >
                </li>
            </ul>

            <!-- FORM CONTAINER (Empty for you to fill) -->
            <div id="calendar-form-container" class="smart-box-mid">
                <div class="form-section">
                    <div class="form-item">
                        <label
                            >When: <span class="form-required">*</span></label
                        >
                        <input
                            type="date"
                            class="form-text"
                            placeholder="Start date"
                            id="newEventDate"
                        />
                    </div>

                 

                    <div class="form-item">
                        <label
                            >Title: <span class="form-required">*</span></label
                        >
                        <input style='width:50% ' id="newEventTitle" type="text" class="form-text" />
                    </div>
                                        <div class="form-item">

                        <label
                            >Class: <span class="form-required">*</span></label
                        >

                    <select id="taskClassSelect" style='width:50% ' >
             
                    </select>
                     </div>

                    <!-- Add your custom fields here -->
                    <div id="custom-content">
                        <!-- Your custom UI goes here -->
                    </div>
                </div>

                <!-- BUTTONS -->
                <div class="submit-buttons">
                    <span class="submit-span-wrapper">
                        <input
                            type="button"
                            value="Create"
                            class="form-submit"
                           id="createTask"
                        />
                       
                    </span>
                    <a id="edit-cancel" >Cancel</a>
                </div>
            </div>
        </div>
    </div>

    <div class="popups-buttons"></div>
    <div class="popups-footer"></div>
</div>

  `);
        let newOption = document.createElement("option");
        newOption.innerHTML = "Select Class";
        newOption.disabled = true;
        newOption.selected = true;
        newOption.hidden = true;
        (_a = document.getElementById("taskClassSelect")) === null || _a === void 0 ? void 0 : _a.appendChild(newOption);
        for (let i = 0; i < order.length; i++) {
            let newOption = document.createElement("option");
            newOption.innerHTML = order[i];
            (_b = document.getElementById("taskClassSelect")) === null || _b === void 0 ? void 0 : _b.appendChild(newOption);
        }
        (_c = document
            .getElementById("edit-cancel")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", closePopup);
        (_d = document
            .getElementById("close2")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", closePopup);
        (_e = document
            .getElementById("createTask")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
            let date = document.getElementById("newEventDate").value;
            let title = document.getElementById("newEventTitle").value;
            let classTag = document.getElementById("taskClassSelect").value;
            let [year, month, day] = date.split("-");
            let formatted = new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            customAssignments.push([
                String(title),
                String(formatted),
                String(classTag),
            ]);
            sortCustomAssignmentsByDate();
            localStorage.setItem("customAssignments", JSON.stringify(customAssignments));
            drawCustomAssignments();
            closePopup();
        });
    }
    function drawCustomAssignment(title, date, classTag, index) {
        if (classTag == "Select Class") {
            classTag = "No Class Selected";
        }
        if (String(date) === "Invalid Date") {
            date = "No Date Selected";
        }
        let newEvent = document.getElementsByClassName("upcoming-event upcoming-event-block course-event")[0].cloneNode(true);
        newEvent.classList.add("CustomAssignment");
        let link = newEvent.querySelector(".event-title")
            .children[0];
        if (newEvent.getElementsByClassName("progressCheck")[0] &&
            !checkboxStates[title]) {
            newEvent.getElementsByClassName("progressCheck")[0].checked = false;
        }
        link.innerHTML = title;
        link.removeAttribute("href");
        Array.from(newEvent.getElementsByClassName("customLabel")).forEach((element) => {
            element.remove();
        });
        Array.from(newEvent.getElementsByTagName("img")).forEach((element) => {
            element.remove();
        });
        let dateLabel = newEvent.getElementsByClassName("readonly-title event-subtitle")[0];
        let classLabel = newEvent.getElementsByClassName("readonly-title event-subtitle")[1];
        dateLabel.innerText =
            "Due " + days[new Date(date).getDay()] + ", " + date;
        classLabel.innerText = classTag;
        newEvent.insertAdjacentHTML("beforeend", `<img  style="width:24px; height:24px" id="customLabel${index}" src="https://thumbs2.imgbox.com/6b/db/QgdLghvZ_t.png" class="infotip customLabel" alt="Delete Custom Assignment">`);
        setTimeout(() => {
            var _a;
            (_a = document
                .getElementById(`customLabel${index}`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                if (confirm(`Remove \"${customAssignments[index][0]}\"?`)) {
                    customAssignments.splice(index, 1);
                    drawCustomAssignments();
                    checkboxStates[title] = false;
                    localStorage.setItem("customAssignments", JSON.stringify(customAssignments));
                    localStorage.setItem("saveState", JSON.stringify(checkboxStates));
                }
            });
        }, 0);
        const upcomingCourseEvents = document.querySelectorAll(".upcoming-event.upcoming-event-block.course-event:not(.CustomAssignment)");
        assignmentDates = [];
        for (let j = 0; j < upcomingCourseEvents.length; j++) {
            if (!upcomingCourseEvents[j].className.includes("hidden-important")) {
                assignmentDates[Number(j)] = upcomingCourseEvents[j].getElementsByClassName("readonly-title event-subtitle")[0].innerText;
            }
        }
        assignmentDates = Array.from(assignmentDates);
        let indexMatch = 0;
        console.log(title, indexMatch, date);
        for (let i = assignmentDates.length - 1; i >= 0; i--) {
            if (!assignmentDates[i])
                continue;
            let nextIndex = i - 1;
            if (i == 0) {
                const found = assignmentDates.findIndex((element) => !String(element).toLowerCase().includes("overdue"));
                nextIndex = found + 2;
            }
            else {
                while (nextIndex > 0 &&
                    !assignmentDates[nextIndex] &&
                    String(assignmentDates[i]).indexOf("overdue") == -1) {
                    nextIndex--;
                }
            }
            if (nextIndex < 0)
                break;
            let clean1 = normalizeDateString(assignmentDates[nextIndex]);
            let clean2 = normalizeDateString(date);
            let match = new Date(clean1);
            let assignment = new Date(clean2);
            if (match == "Invalid Date") {
                indexMatch = i;
                break;
            }
            console.log(match, "vs", assignment, "bool", assignment > match);
            if (isNaN(match) || isNaN(match))
                continue;
            if (assignment > match) {
                indexMatch = i;
                break;
            }
        }
        const items = document.querySelectorAll(".upcoming-event.upcoming-event-block.course-event:not(.CustomAssignment)");
        let target = items[indexMatch];
        console.log(title, indexMatch, date);
        if (indexMatch == assignmentDates.length - 1) {
            if (items[indexMatch + 1] == undefined) {
                target.after(newEvent);
            }
            else {
                indexMatch++;
                target = items[indexMatch];
                target.after(newEvent);
            }
        }
        else if (target) {
            target.before(newEvent);
        }
        else {
            items[items.length].after(newEvent);
        }
    }
    function closePopup() {
        var _a, _b;
        (_a = document.getElementById("popups-2")) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById("popups-overlay")) === null || _b === void 0 ? void 0 : _b.remove();
    }
    function drawCheckboxes() {
        assignmentDates = [];
        waitForElement(".upcoming-event.upcoming-event-block.course-event", function () {
            var _a, _b, _c, _d, _e, _f, _g;
            let upcomingCourseEvents = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
            drawCustomAssignments();
            let progressCheck = document.getElementsByClassName("progressCheck");
            Array.from(progressCheck).forEach((element) => {
                element.remove();
            });
            let showMoreButtonInAssignments = false;
            for (let j = 0; j < upcomingCourseEvents.length; j++) {
                if (upcomingCourseEvents[j].className.includes("hidden-important")) {
                    let hiddenAssignmentCheckElement = upcomingCourseEvents[j].getElementsByTagName("img")[0];
                    if (hiddenAssignmentCheckElement == undefined) {
                        showMoreButtonInAssignments = true;
                    }
                }
            }
            if (showMoreButtonInAssignments) {
                if (document.getElementById("todo") !== undefined) {
                    let assignmentListDiv = document.getElementById("todo");
                    if (displayedAllAssignments == false) {
                        assignmentListDiv.innerHTML += `<li class="s-edge-feed-more-link last dropdowndiv" style="display: block;"><a id="dropdownMore" class="active sExtlink-processed sEdgeMore-processed">more</a></li>`;
                        displayedAllAssignments = true;
                    }
                    else {
                        //             asignmentListDiv.innerHTML += `<li class="s-edge-feed-more-link last dropdowndiv" style="display: block;" ><a
                        //  class="active sExtlink-processed sEdgeMore-processed">Less</a></li>`;
                        //             displayedAllAssignments = false;
                    }
                    //dropdownthing
                    (_a = document
                        .getElementById("dropdownMore")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                        var _a;
                        if (document.getElementById("dropdownMore")) {
                            (_a = document
                                .getElementById("dropdownMore")) === null || _a === void 0 ? void 0 : _a.remove();
                        }
                        const loadingImage = document.createElement("img");
                        loadingImage.id = "ajaxloader";
                        loadingImage.className = "dropdowndiv2";
                        loadingImage.src =
                            "https://schoology.shschools.org/sites/all/themes/schoology_theme/images/ajax-loader.gif";
                        assignmentListDiv.appendChild(loadingImage);
                        setTimeout(() => {
                            var _a, _b, _c;
                            (_a = document
                                .getElementById("ajaxloader")) === null || _a === void 0 ? void 0 : _a.remove();
                            let upcoming = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
                            if (document.getElementById("dropdown")) {
                                (_b = document
                                    .getElementById("dropdown")) === null || _b === void 0 ? void 0 : _b.remove();
                            }
                            for (let j = 0; j < upcoming.length; j++) {
                                if (upcoming[j].className.includes("hidden-important")) {
                                    let hiddenAssignmentCheckElement = upcoming[j].getElementsByTagName("img")[0];
                                    if (hiddenAssignmentCheckElement ==
                                        undefined) {
                                        let newHiddenElementClass = upcoming[j].className.replace("hidden-important", "");
                                        (_c = upcoming[j].previousElementSibling) === null || _c === void 0 ? void 0 : _c.className.replace("hidden", "");
                                        upcoming[j].className =
                                            newHiddenElementClass;
                                    }
                                }
                            }
                            drawCheckboxes();
                            updateProgressBarState();
                        }, 300);
                    });
                }
            }
            upcomingCourseEvents = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
            for (let j = 0; j < upcomingCourseEvents.length; j++) {
                if (!upcomingCourseEvents[j].className.includes("hidden-important")) {
                    let checkbox = document.createElement("input");
                    checkbox.className = "progressCheck";
                    checkbox.type = "checkbox";
                    let checkboxState = localStorage.getItem("saveState");
                    upcomingCourseEvents[j].appendChild(checkbox);
                    // assignmentDates[Number(j)] = (
                    //     upcomingCourseEvents[j].getElementsByClassName(
                    //         "readonly-title event-subtitle"
                    //     )[0] as HTMLParagraphElement
                    // ).innerText;
                    let assignmentLabelList = (_d = (_c = (_b = checkbox.parentElement) === null || _b === void 0 ? void 0 : _b.firstElementChild) === null || _c === void 0 ? void 0 : _c.firstElementChild) === null || _d === void 0 ? void 0 : _d.children[1].children;
                    if (assignmentLabelList) {
                        for (let i = 0; i < assignmentLabelList.length; i++) {
                            assignmentLabel =
                                (_g = (_f = (_e = assignmentLabelList[i].parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.parentElement;
                            if (assignmentLabelList[i].className ==
                                "sExtlink-processed") {
                                let selectedAsignmentLabel = assignmentLabelList[i];
                                let labelText = selectedAsignmentLabel.innerText.toLowerCase();
                                if (labelText.includes("quiz") ||
                                    labelText.includes("test") ||
                                    labelText.includes("minor") ||
                                    labelText.includes("c4u") ||
                                    labelText.includes("cfu") ||
                                    labelText.includes("final") ||
                                    labelText.includes("essay") ||
                                    labelText.includes("major")
                                // labelText.includes("hw") == false
                                ) {
                                    checkbox.style.accentColor = "green";
                                    selectedAsignmentLabel.style.color =
                                        "red";
                                }
                                if (checkboxState !== null) {
                                    checkboxStates =
                                        JSON.parse(checkboxState);
                                    if (checkboxStates[selectedAsignmentLabel.innerText]) {
                                        checkbox.checked = true;
                                        assignmentLabelList[i].innerHTML = `<s>${selectedAsignmentLabel.innerText}</s>`;
                                        assignmentLabel.style.opacity =
                                            "0.8";
                                    }
                                    else {
                                        checkbox.checked = false;
                                        assignmentLabel.style.opacity = "1";
                                        assignmentLabelList[i].innerHTML = `${assignmentLabelList[i].innerHTML.replace(/<\/?s>/g, "")}`;
                                    }
                                }
                            }
                        }
                    }
                    let dateHeadersList = document.getElementsByClassName("date-header");
                    Array.from(dateHeadersList).forEach((dateHeader) => {
                        var _a;
                        if (((_a = dateHeader.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains("hidden-important")) == false) {
                            dateHeader.className =
                                dateHeader.className.replace("hidden", "");
                        }
                        let textLabel = dateHeader.firstElementChild;
                        let dateHeaderText = dateHeader
                            .innerText;
                        dateHeaderText = titleCase(dateHeaderText);
                        dateHeader.innerHTML =
                            `<p>` + dateHeaderText + `</p>`;
                        textLabel =
                            dateHeader.firstElementChild;
                        textLabel.className = "h4s";
                    });
                    checkbox.addEventListener("click", function () {
                        var _a, _b, _c, _d, _e, _f;
                        let asignmentDivList = (_c = (_b = (_a = checkbox.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild) === null || _c === void 0 ? void 0 : _c.children[1].children;
                        if (asignmentDivList) {
                            updateProgressBarState();
                            for (let i = 0; i < asignmentDivList.length; i++) {
                                if (asignmentDivList[i].className ==
                                    "sExtlink-processed") {
                                    let asignmentNameElement = asignmentDivList[i];
                                    let asignmentDiv = (_f = (_e = (_d = asignmentNameElement.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement;
                                    if (checkbox.checked) {
                                        checkboxStates[asignmentNameElement.innerText] = true;
                                        localStorage.setItem("saveState", JSON.stringify(checkboxStates));
                                        asignmentDivList[i].innerHTML = `<s>${asignmentNameElement.innerText}</s>`;
                                        asignmentDiv.style.opacity = "0.8";
                                    }
                                    else {
                                        asignmentDiv.style.opacity = "1";
                                        asignmentDivList[i].innerHTML = `${asignmentDivList[i].innerHTML.replace(/<\/?s>/g, "")}`;
                                        checkboxStates[asignmentNameElement.innerText] = false;
                                        localStorage.setItem("saveState", JSON.stringify(checkboxStates));
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }
    function displayGrades() {
        var _a;
        if (window.location.href ==
            "https://schoology.shschools.org/grades/grades") {
            let gradebookCourses = document.getElementsByClassName("gradebook-course-grades");
            for (let i = 0; i < gradebookCourses.length; i++) {
                let selectedCourse = gradebookCourses[i];
                selectedCourse.style.display = "block";
                let parent = document.getElementsByClassName("course-grade-value")[i];
                let grade = ((_a = parent.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild)
                    .innerHTML;
                let gradebookCourseDiv = document.getElementsByClassName("gradebook-course-title")[i];
                gradebookCourseDiv.innerHTML += `  <span style="color:green; font-size:20px;">(${grade})<span>`;
            }
            for (let i = 0; i < gradebookCourses.length; i++) {
                let selectedCourse = gradebookCourses[i];
                selectedCourse.style.display = "none";
            }
        }
    }
    displayGrades();
    function autoOpenRecentlyCompleted() {
        let recentlyCompletedButton = document.getElementsByClassName("refresh-button")[0];
        if (recentlyCompletedButton) {
            recentlyCompletedButton.click();
        }
    }
    autoOpenRecentlyCompleted();
    setTimeout(() => {
        var _a, _b;
        let RecentCompletelist = document.getElementsByClassName("recently-completed-event");
        let popupIndex = 0;
        for (let i = 0; i < RecentCompletelist.length; i++) {
            let elm = RecentCompletelist[i];
            let storedOldGrade = localStorage.getItem("oldGrade");
            let oldGrade = [];
            if (storedOldGrade) {
                oldGrade = JSON.parse(storedOldGrade);
            }
            else {
                oldGrade = [];
            }
            let hasGradeInputted = (_a = RecentCompletelist[i].getElementsByTagName("span")[5]
                .firstElementChild) === null || _a === void 0 ? void 0 : _a.innerHTML;
            if (oldGrade.includes(elm.innerText) == false &&
                hasGradeInputted !== "—") {
                let asignmentURL = (_b = RecentCompletelist[i].firstElementChild) === null || _b === void 0 ? void 0 : _b.getElementsByTagName("span")[1].getElementsByTagName("a")[0];
                asignmentURL = asignmentURL;
                oldGrade.push(elm.innerText);
                localStorage.setItem("oldGrade", JSON.stringify(oldGrade));
                let grade = null;
                let asignmentIframe = document.createElement("iframe");
                document.body.appendChild(asignmentIframe);
                asignmentIframe.src = asignmentURL.href;
                asignmentIframe.onload = () => {
                    if (asignmentIframe.contentDocument) {
                        if (!asignmentURL.href.includes("launch")) {
                            grade =
                                asignmentIframe.contentDocument.getElementsByClassName("grading-grade")[0];
                            if (grade !== undefined &&
                                grade.innerText != null) {
                                grade = grade.innerText;
                                asignmentIframe.remove();
                                grade = grade.replace("Grade:", "").trim();
                                let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${asignmentURL.href}>${asignmentURL.innerText}</a>`;
                                let popupBanner = document.createElement("div");
                                popupBanner.id = "popupBanner";
                                popupBanner.innerHTML = message;
                                popupBanner.style.top = `${20 + popupIndex * 100}px`;
                                popupIndex += 1;
                                document.body.appendChild(popupBanner);
                                setTimeout(() => {
                                    popupBanner.style.right = "20px";
                                }, 100);
                                setTimeout(() => {
                                    popupBanner.style.right = "-300px";
                                }, 7000);
                            }
                            else {
                                let src = asignmentIframe.src.replace("assignment", "assignments");
                                asignmentIframe.src = src + "/mydocument";
                                asignmentIframe.onload = () => {
                                    let content = asignmentIframe.contentDocument;
                                    if (content) {
                                        setTimeout(() => {
                                            grade =
                                                content.getElementsByClassName("document-header-aside-graded-grade-3903705135")[0];
                                            if (grade !== null) {
                                                grade = grade.innerText;
                                                asignmentIframe.remove();
                                                grade = grade
                                                    .replace("Grade:", "")
                                                    .trim();
                                                let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${asignmentURL.href}>${asignmentURL.innerText}</a>`;
                                                let popupBanner = document.createElement("div");
                                                popupBanner.id = "popupBanner";
                                                popupBanner.innerHTML = message;
                                                popupBanner.style.top = `${20 + popupIndex * 100}px`;
                                                popupIndex += 1;
                                                document.body.appendChild(popupBanner);
                                                setTimeout(() => {
                                                    popupBanner.style.right =
                                                        "20px";
                                                }, 100);
                                                setTimeout(() => {
                                                    popupBanner.style.right =
                                                        "-300px";
                                                }, 7000);
                                            }
                                        }, 2000);
                                    }
                                };
                            }
                        }
                    }
                };
            }
        }
    }, 2000);
    const waitForFrameLoad = setInterval(function () {
        let update = document.getElementsByClassName("update-body s-rte")[0];
        if (update) {
            clearInterval(waitForFrameLoad);
            if (localStorage.getItem("oldUpdate") !== update.innerText) {
                localStorage.setItem("oldUpdate", update.innerText);
                let div = document.getElementsByClassName("s-edge-type-update-post sUpdate-processed")[0];
                div.style.borderColor = "#42c5f9";
                div.style.borderWidth = "5px";
                div.style.borderStyle = "solid";
                div.style.borderRadius = "10px";
            }
        }
    }, 10);
    function titleCase(str) {
        let splitStr = str.toLowerCase().split(" ");
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
    }
}
//Toggle extension
let clicked = false;
document.addEventListener("keydown", function (event) {
    if (event.key &&
        event.key.toLowerCase() === "e" &&
        event.shiftKey &&
        (event.metaKey || event.ctrlKey) &&
        !clicked) {
        clicked = true;
        let extensionOn = localStorage.getItem("extensionOn");
        if (extensionOn && extensionOn == "true") {
            localStorage.setItem("extensionOn", "false");
        }
        else {
            localStorage.setItem("extensionOn", "true");
        }
        location.reload();
    }
});
// ©2025 William Chou. All rights reserved.

const listItems = document.getElementById("listItems");
const inputBox = document.getElementById("input-box");

function addItems() {
    if (inputBox.value === "") {
        alert("Please write something \u{1F97A}");
    } else {
        const li = document.createElement("li")
        li.innerHTML = inputBox.value;
        listItems.appendChild(li);

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-xmark");
        icon.style.cursor = "pointer";
        li.appendChild(icon);
    }

    inputBox.value = ""
};

listItems.addEventListener("click", function(e) {
    if (e.target.closest("li")) {
    const li = e.target.closest("li");
    if (e.target.tagName === "I") {
        li.remove();
    } else {
        li.classList.toggle("completion");
    }
}}, false);


// Section 2 --- Pomodoro Clock/Break Timer/Clock //

const slide = document.getElementById("slider");
const buttons = document.querySelectorAll(".buttonClick button");
const startBtn = document.getElementById("startButton");
const pauseBtn = document.getElementById("pauseButton");

//button clicks
let currentMode = null;

buttons.forEach(button => {
    button.addEventListener("click", ()=> {
        const index = button.getAttribute("data-index");
        slide.style.transform = `translateX(-${index * 500}px)`;

        switch(index) {
            case "0":
                currentMode = "clock";
                break;
            case "1":
                currentMode = "pomodoro";
                updateDisplay(30 * 60, "pomodoro");
                break;
            case "2":
                currentMode = "shortBreak";
                updateDisplay(5 * 60, "shortBreak");
                break;
            case "3":
                currentMode = "longBreak";
                updateDisplay(10 * 60, "longBreak");
                break;
        };
    });
});

//Clock
function updateClock() {
    const timeNow = new Date();
    let hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
    const ampm = hours > 12 ? "PM" : "AM";

    //ensure hours are displayed in 12-hour form 
    //ensures minutes < 10 are still displayed in 2 digits instead of one 
    hours = hours % 12 || 12;
    const formatMinutes = minutes < 10 ? "0" + minutes : minutes;

    document.getElementById("digitalClock").textContent = `${hours}:${formatMinutes} ${ampm}`;
};

setInterval(updateClock, 1000);
updateClock();

function updateDisplay(duration, displayID) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60; 
    //let display = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    let display = startcountDown(duration, displayID);
    document.getElementById(displayID).innerText = display;
};

// Shared countdown button 
let countdownInterval;
let remianingTime;
let isPaused = false;

function startcountDown(duration, displayID) {
    if (!isPaused) {
        remainingTime = duration;
    };

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        let minutes = Math.floor(remainingTime/ 60);
        let seconds = remainingTime % 60;

        let display = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        document.getElementById(displayID).innerText = display;

        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            setTimeout(() => alert("TIME IS UP!!! GET BACK TO WORK!"), 1100);
            return;
        };
    }, 1000);

    isPaused = false;
}

function pauseCountdown() {
    clearInterval(countdownInterval);
    isPaused = true;
}

startBtn.addEventListener("click", () => {
    switch(currentMode) {
        case "pomodoro": 
            startcountDown(30 * 60, "pomodoro");
            break;
        case "shortBreak":
            startcountDown(5 * 60, "shortBreak");
            break;
        case "longBreak":
            startcountDown(10 * 60, "longBreak");
            break;
        
    };
});

pauseBtn.addEventListener("click", () => {
    pauseCountdown();
})

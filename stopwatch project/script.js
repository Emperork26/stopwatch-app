let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const themeToggle = document.getElementById("themeToggle");

// Format time (hh:mm:ss:ms)
function timeToString(time) {
  let diffInHrs = Math.floor(time / 3600000);
  let diffInMin = Math.floor((time % 3600000) / 60000);
  let diffInSec = Math.floor((time % 60000) / 1000);
  let diffInMs = Math.floor(time % 1000);

  let formattedHrs = diffInHrs.toString().padStart(2, "0");
  let formattedMin = diffInMin.toString().padStart(2, "0");
  let formattedSec = diffInSec.toString().padStart(2, "0");
  let formattedMs = diffInMs.toString().padStart(3, "0");

  return `${formattedHrs}:${formattedMin}:${formattedSec}.${formattedMs}`;
}

// Update display
function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

// Start
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
});

// Stop
stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
});

// Reset
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
});

// Lap
lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

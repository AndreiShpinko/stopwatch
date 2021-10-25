let title = document.querySelector("title");

let hoursEl = document.querySelector("span[data-goal = hours]"),
  minutesEl = document.querySelector("span[data-goal = minutes]"),
  secondsEl = document.querySelector("span[data-goal = seconds]"),
  mSecondsEl = document.querySelector("span[data-goal = milliseconds]");

let startStopBtn = document.querySelector("button[data-goal = startStop]"),
  lapBtn = document.querySelector("button[data-goal = lap]"),
  resetBtn = document.querySelector("button[data-goal = reset]");

let story = document.querySelector(".story");

let mSeconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

let secondsBuffer, minutesBuffer, hoursBuffer;
let secondsLap, minutesLap, hoursLap;

let time;

// **********************************************
let startFun = () => {
  time = setInterval(() => {
    if (mSeconds < 9) {
      mSeconds++;
    } else {
      mSeconds = 0;
      if (seconds < 59) {
        seconds++;
      } else {
        seconds = 0;
        if (minutes < 59) {
          minutes++;
        } else {
          minutes = 0;
          hours++;
        }
      }
    }
    mSecondsEl.innerHTML = mSeconds;

    secondsBuffer = seconds < 10 ? "0" + seconds : seconds;
    minutesBuffer = minutes < 10 ? "0" + minutes : minutes;
    hoursBuffer = hours < 10 ? "0" + hours : hours;

    secondsEl.innerHTML = secondsBuffer;
    minutesEl.innerHTML = minutesBuffer;
    hoursEl.innerHTML = hoursBuffer;

    title.innerHTML = hoursBuffer + ":" + minutesBuffer + ":" + secondsBuffer;
  }, 100);
};
let stopFun = () => {
  clearTimeout(time);
};
// **********************************************
function startStop() {
  if (startStopBtn.dataset.active) {
    startFun();
    lapBtn.removeAttribute("disabled");
    resetBtn.removeAttribute("disabled");
    startStopBtn.setAttribute("data-active", "");
    startStopBtn.innerHTML = "Stop";
  } else {
    stopFun();
    lapBtn.setAttribute("disabled", "disabled");
    startStopBtn.setAttribute("data-active", "start");
    startStopBtn.innerHTML = "Start";
  }
}
function lap() {
  secondsLap = seconds < 10 ? "0" + seconds : seconds;
  minutesLap = minutes < 10 ? "0" + minutes : minutes;
  hoursLap = hours < 10 ? "0" + hours : hours;
  let sumLi = document.querySelectorAll(".story li").length;
  story.innerHTML =
    `<li><span>Lap ${
      sumLi + 1
    }.</span><span>${hoursLap}:${minutesLap}:${secondsLap}.${mSeconds}</span></li>` +
    story.innerHTML;
}
function reset() {
  stopFun();
  startStopBtn.setAttribute("data-active", "start");
  startStopBtn.innerHTML = "Start";
  resetBtn.setAttribute("disabled", "disabled");
  lapBtn.setAttribute("disabled", "disabled");
  story.innerHTML = "";
  [hours, minutes, seconds, mSeconds] = [0, 0, 0, 0];
  [
    hoursEl.innerHTML,
    minutesEl.innerHTML,
    secondsEl.innerHTML,
    mSecondsEl.innerHTML,
  ] = ["00", "00", "00", "0"];
  title.innerHTML = "00:00:00";
}
function redShadow() {
  let shadowEl = document.querySelector(".shadow");
  shadowEl.style.boxShadow = "0 0 40px 4px #f00";
  setInterval(() => {
    shadowEl.style.boxShadow = "";
  }, 1500);
}
// **********************************************
startStopBtn.onclick = () => startStop();
lapBtn.onclick = () => lap();
resetBtn.onclick = () => reset();
// **********************************************
document.addEventListener("keydown", (e) => {
  if (e.code == "KeyS" || e.code == "Enter" || e.code == "Space") {
    startStop();
  } else if (e.code == "KeyR") {
    reset();
  } else if (e.code == "KeyL") {
    lap();
  } else redShadow();
});

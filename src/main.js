import "./style.css";

const screenStartEl = document.getElementById("screen-start");
const screenSelectEl = document.getElementById("screen-select");
const screenGameEl = document.getElementById("screen-game");

const btnStartEl = document.getElementById("start-btn");
const chooseBtns = document.querySelectorAll("#screen-select button");

const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const msg1El = document.getElementById("msg1");
const msg2El = document.getElementById("msg2");

let selectedSrc = "";
let time = 0;
let score = 0;
let timerId = null;

btnStartEl.addEventListener("click", () => {
  screenStartEl.classList.add("hidden");
  screenSelectEl.classList.remove("hidden");
});

chooseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    selectedSrc = img?.getAttribute("src") || "./src/image/fly.png";
    startGame();
  });
});

function startGame() {
  screenSelectEl.classList.add("hidden");
  screenGameEl.classList.remove("hidden");

  time = 0;
  score = 0;
  timeEl.textContent = "00:00";
  scoreEl.textContent = "0";
  msg1El.classList.add("hidden");
  msg2El.classList.add("hidden");

  startTimer();
  setTimeout(createInsect, 500);
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    time++;
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    timeEl.textContent = `${m}:${s}`;
  }, 1000);
}

function randomPosition() {
  const rect = screenGameEl.getBoundingClientRect();
  const pad = 60;
  const x = Math.random() * (rect.width - pad * 2) + pad;
  const y = Math.random() * (rect.height - pad * 2) + pad;
  return { x, y };
}

function createInsect() {
  const el = document.createElement("img");
  el.src = selectedSrc;
  el.alt = "insect";
  el.className =
    "insect absolute w-[100px] h-[100px] cursor-pointer select-none transition-transform duration-300";
  const { x, y } = randomPosition();
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
  el.addEventListener("click", catchInsect);
  screenGameEl.appendChild(el);
}

function catchInsect(e) {
  const el = e.currentTarget;
  el.classList.add("scale-1");
  setTimeout(() => el.remove(), 200);
  scoreEl.textContent = ++score;

  if (score >= 5) msg1El.classList.remove("hidden");
  if (score >= 10) msg2El.classList.remove("hidden");

  setTimeout(createInsect, 300);
  setTimeout(createInsect, 700);
}

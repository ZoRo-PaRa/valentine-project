
function yesClicked() {
  const loader = document.getElementById("heartLoader");

  // Show beating heart loader
  if (loader) loader.classList.remove("hidden");

  // Disable buttons to avoid double clicks
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);

  // Navigate after heartbeat animation
  setTimeout(() => {
    window.location.href = "love.html";
  }, 2200);
}


const noBtn = document.getElementById("noBtn");
let scale = 1;
let texts = ["NO 😜", "Are you sure? 😢", "Really? 🥺", "Pleaseeee 😭"];
let index = 0;

if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    scale -= 0.1;
    if (scale < 0.4) scale = 0.4;

    noBtn.style.transform = `scale(${scale})`;
    index = (index + 1) % texts.length;
    noBtn.innerText = texts[index];

    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * 80 + "%";
    noBtn.style.top = Math.random() * 80 + "%";
  });
}


function startLove() {
  // Show message + gallery
  document.querySelectorAll(".magic-content").forEach(el => {
    el.classList.add("show");
  });

  // Play background music
  const music = document.getElementById("bgMusic");
  if (music) music.play();

  // Effects
  confettiBlast();
  heartSurprise(); // ❤️ NEW
}


function confettiBlast() {
  for (let i = 0; i < 120; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = `hsl(${Math.random()*360},100%,70%)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }
}

function heartSurprise() {
  const heartCount = 30; // number of hearts

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (2 + Math.random() * 2) + "s";
    heart.style.fontSize = (16 + Math.random() * 20) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}

let heartbeatInterval;
let audioCtx;

function startHeartbeatSound() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  heartbeatInterval = setInterval(() => {
    playBeat(0);
    playBeat(0.18); // second softer beat
  }, 1000); // 60 BPM
}

function playBeat(delay) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = 110; // deep heartbeat tone

  gain.gain.setValueAtTime(0.001, audioCtx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(
    0.25,
    audioCtx.currentTime + delay + 0.05
  );
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + delay + 0.25
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime + delay);
  osc.stop(audioCtx.currentTime + delay + 0.3);
}

function stopHeartbeatSound() {
  clearInterval(heartbeatInterval);
  if (audioCtx) audioCtx.close();
}

window.addEventListener("pageshow", function (event) {
  // If page is restored from back/forward cache
  if (event.persisted) {
    window.location.reload();
  }
});

function resetIndexPage() {
  const loader = document.getElementById("heartLoader");
  if (loader) loader.classList.add("hidden");

  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = false;
  });
}

window.addEventListener("load", resetIndexPage);

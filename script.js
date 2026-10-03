const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const floatingHearts = document.getElementById("floating-hearts");

const PAD = 12;

function spawnFloatingHearts() {
  const count = 14;
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.style.setProperty("--x", `${Math.random() * 100}%`);
    heart.style.setProperty("--delay", `${Math.random() * 8}s`);
    heart.style.setProperty("--dur", `${7 + Math.random() * 6}s`);
    heart.style.background = i % 2 === 0 ? "#e85a7a" : "#ff9eb6";
    floatingHearts.appendChild(heart);
  }
}

function placeNoNearYes() {
  const yesRect = yesBtn.getBoundingClientRect();
  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;

  let left = yesRect.right + 28;
  let top = yesRect.top + (yesRect.height - noHeight) / 2;

  if (left + noWidth > window.innerWidth - PAD) {
    left = yesRect.left - noWidth - 28;
  }

  if (left < PAD) {
    left = Math.max(PAD, (window.innerWidth - noWidth) / 2);
    top = yesRect.bottom + 20;
  }

  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
}

function moveNoAway(clientX, clientY) {
  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;
  const maxLeft = Math.max(PAD, window.innerWidth - noWidth - PAD);
  const maxTop = Math.max(PAD, window.innerHeight - noHeight - PAD);

  let left;
  let top;
  let attempts = 0;

  do {
    left = PAD + Math.random() * maxLeft;
    top = PAD + Math.random() * maxTop;
    attempts += 1;

    const centerX = left + noWidth / 2;
    const centerY = top + noHeight / 2;
    const dx = centerX - clientX;
    const dy = centerY - clientY;
    const distance = Math.hypot(dx, dy);

    if (distance > 140 || attempts > 20) break;
  } while (true);

  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
}

function onNoFlee(event) {
  const point =
    "touches" in event && event.touches[0]
      ? event.touches[0]
      : event;

  moveNoAway(point.clientX, point.clientY);
}

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

noBtn.addEventListener("mouseenter", onNoFlee);
noBtn.addEventListener("mousemove", onNoFlee);
noBtn.addEventListener("touchstart", onNoFlee, { passive: true });
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  onNoFlee(event);
});

window.addEventListener("resize", placeNoNearYes);

spawnFloatingHearts();
placeNoNearYes();

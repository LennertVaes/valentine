const floatingHearts = document.getElementById("floating-hearts");

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

function burstHearts() {
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight / 2;

  for (let i = 0; i < 28; i += 1) {
    const heart = document.createElement("span");
    heart.className = "confetti-heart";
    const angle = (Math.PI * 2 * i) / 28;
    const dist = 80 + Math.random() * 180;
    heart.style.setProperty("--x", `${originX}px`);
    heart.style.setProperty("--y", `${originY}px`);
    heart.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    heart.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
    heart.style.setProperty("--dur", `${1.2 + Math.random() * 0.8}s`);
    heart.style.background =
      i % 3 === 0 ? "#c93b5d" : i % 3 === 1 ? "#e85a7a" : "#ff9eb6";
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2200);
  }
}

spawnFloatingHearts();
burstHearts();

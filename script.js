const intro = document.getElementById("intro");
const letterSection = document.getElementById("letterSection");
const closing = document.getElementById("closing");
const song = document.getElementById("song");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const toast = document.getElementById("toast");

function showScreen(screen) {
  [intro, letterSection, closing].forEach(section => {
    const active = section === screen;
    section.classList.toggle("active", active);
    section.setAttribute("aria-hidden", String(!active));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateMusicButton() {
  const playing = !song.paused;
  musicLabel.textContent = playing ? "Pause our song" : "Play our song";
  musicToggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  musicToggle.classList.toggle("is-playing", playing);
}

async function toggleMusic() {
  if (song.paused) {
    try {
      await song.play();
      updateMusicButton();
    } catch (error) {
      showToast("Tap play again to start the song ♡");
    }
  } else {
    song.pause();
    updateMusicButton();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

musicToggle.addEventListener("click", toggleMusic);
song.addEventListener("play", updateMusicButton);
song.addEventListener("pause", updateMusicButton);

document.getElementById("openLetter").addEventListener("click", async () => {
  showScreen(letterSection);
  if (song.paused) {
    try { await song.play(); } catch (error) { updateMusicButton(); }
  }
  updateMusicButton();
});

document.getElementById("showThought").addEventListener("click", () => showScreen(closing));
document.getElementById("replay").addEventListener("click", () => showScreen(intro));

// Add a few gentle floating sparkles without relying on external libraries.
const starLayer = document.querySelector(".stars");
for (let i = 0; i < 18; i++) {
  const star = document.createElement("span");
  star.textContent = i % 4 === 0 ? "✦" : "·";
  star.style.position = "absolute";
  star.style.left = `${(i * 37 + 11) % 100}%`;
  star.style.top = `${(i * 53 + 7) % 100}%`;
  star.style.color = i % 3 === 0 ? "#e9a9bb" : "#f7eff2";
  star.style.opacity = `${0.18 + (i % 5) * 0.1}`;
  star.style.fontSize = `${8 + (i % 4) * 4}px`;
  star.style.animation = `twinkle ${2.5 + (i % 4)}s ease-in-out ${i * 0.17}s infinite alternate`;
  starLayer.appendChild(star);
}
const style = document.createElement("style");
style.textContent = "@keyframes twinkle { from { transform: translateY(0) scale(.8); opacity:.15 } to { transform: translateY(-9px) scale(1.2); opacity:.75 } }";
document.head.appendChild(style);

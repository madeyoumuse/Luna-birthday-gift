const revealButton = document.querySelector("#revealSong");
const audioWrap = document.querySelector("#audioWrap");
const birthdaySong = document.querySelector("#birthdaySong");
const celebration = document.querySelector("#celebration");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function playSongOnceRevealed() {
  const playAttempt = birthdaySong.play();

  if (playAttempt !== undefined) {
    playAttempt.catch(() => {
      birthdaySong.focus();
    });
  }
}

function createCelebration() {
  if (reducedMotion.matches) {
    return;
  }

  const symbols = ["\u2661", "\u2726", "\u266a", "\u2727", "\u2665"];

  for (let index = 0; index < 18; index += 1) {
    const symbol = document.createElement("span");
    symbol.textContent = symbols[index % symbols.length];
    symbol.style.setProperty("--x", `${8 + Math.random() * 84}%`);
    symbol.style.setProperty("--size", `${0.9 + Math.random() * 1.1}rem`);
    symbol.style.animationDelay = `${Math.random() * 0.45}s`;
    celebration.appendChild(symbol);
  }

  window.setTimeout(() => {
    celebration.replaceChildren();
  }, 2500);
}

revealButton.addEventListener("click", () => {
  const isFirstReveal = audioWrap.hidden;

  if (isFirstReveal) {
    audioWrap.hidden = false;
    revealButton.classList.remove("pulse");
    revealButton.textContent = "Geniet jou lied, Mamma \u2764\uFE0F";
    playSongOnceRevealed();
    createCelebration();
    audioWrap.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
    return;
  }

  if (birthdaySong.paused) {
    playSongOnceRevealed();
  }
});

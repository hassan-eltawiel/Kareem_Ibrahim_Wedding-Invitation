// ================= COUNTDOWN =================
const eventDate = new Date(2026, 4, 29, 16, 0, 0).getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const countdown = setInterval(() => {
  const now = Date.now();
  const distance = eventDate - now;

  if (distance <= 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "🎉 It's the day!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  // 2 digits لكل القيم
  daysEl.innerText = String(days).padStart(2, "0");
  hoursEl.innerText = String(hours).padStart(2, "0");
  minutesEl.innerText = String(minutes).padStart(2, "0");
  secondsEl.innerText = String(seconds).padStart(2, "0");
}, 1000);

// ================= INTRO VIDEO =================
const intro = document.getElementById("intro");
const video = document.getElementById("envelopeVideo");

function openPage() {
  intro.style.transition = "1s ease";
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";
    window.scrollTo(0, 0);
    document.body.classList.add("show-page");

    if (typeof animateHero === "function") animateHero();
    if (typeof startScrollReveal === "function") startScrollReveal();
  }, 700);
}

intro.addEventListener("click", async () => {
  try {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      await playPromise;
    }

    // ⏱️ بعد ثانيتين
    setTimeout(() => {
      if (!video.paused) {
        video.pause();
      }
      openPage();
    }, 2000);
  } catch (e) {
    openPage();
  }
});

/* ================= HERO ANIMATION ================= */
function animateHero() {
  const items = document.querySelectorAll(
    ".hero .content > *, .hero .confirmation",
  );

  items.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
      el.style.filter = "blur(0)";
    }, index * 250);
  });
}

/* ================= SCROLL REVEAL ================= */
function startScrollReveal() {
  const sections = document.querySelectorAll(
    ".countdown-section, .preLocation, .location, .poweredBy",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  sections.forEach((sec) => {
    sec.classList.add("reveal"); // مهم جدًا
    observer.observe(sec);
  });
}

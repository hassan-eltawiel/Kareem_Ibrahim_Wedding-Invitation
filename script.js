// ================= COUNTDOWN =================
const eventDate = new Date("May 29, 2026 00:00:00").getTime();

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

  // تخلي الرقم دايمًا 2 digits
  daysEl.innerText = days;
  hoursEl.innerText = String(hours).padStart(2, "0");
  minutesEl.innerText = String(minutes).padStart(2, "0");
  secondsEl.innerText = String(seconds).padStart(2, "0");
}, 1000);

// ================= INTRO VIDEO =================
// const intro = document.getElementById("intro");
// const video = document.getElementById("envelopeVideo");

// intro.addEventListener("click", () => {
//   video.play();

//   // يختفي بعد ما الفيديو يخلص فعليًا
//   video.onended = () => {
//     intro.style.display = "none";
//   };
// });

const intro = document.getElementById("intro");
const video = document.getElementById("envelopeVideo");

function openPage() {
  intro.style.transition = "1s ease";
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";
    window.scrollTo(0, 0);
    document.body.classList.add("show-page");
    animateHero();
    startScrollReveal();
  }, 700);
}

intro.addEventListener("click", async () => {
  try {
    await video.play();
  } catch (e) {
    openPage();
    return;
  }

  video.onended = openPage;

  setTimeout(() => {
    if (!video.ended) openPage();
  }, 5000);
});

//#######################
// const intro = document.getElementById("intro");
// const video = document.getElementById("envelopeVideo");

// intro.addEventListener("click", async () => {
//   try {
//     await video.play();

//     video.onended = () => {
//       // اختفاء intro
//       intro.style.display = "none";

//       // تشغيل الموقع (hero يظهر فقط)

//       intro.style.transition = "1s ease";
//       intro.style.opacity = "0";

//       setTimeout(() => {
//         window.scrollTo(0, 0);

//         // تشغيل الموقع
//         document.body.classList.add("show-page");

//         // Hero animation
//         animateHero();

//         // Scroll reveal
//         startScrollReveal();
//       }, 1000);
//     };
//   } catch (e) {
//     console.log("play blocked:", e);
//   }
// });
// const intro = document.getElementById("intro");
// const video = document.getElementById("envelopeVideo");

// video.addEventListener("click", () => {
//   video.play();
// });

// video.addEventListener("ended", () => {
//   intro.style.transition = "1s ease";
//   intro.style.opacity = "0";

//   setTimeout(() => {
//     window.scrollTo(0, 0);
//     intro.style.display = "none";

//     // تشغيل الموقع
//     document.body.classList.add("show-page");

//     // Hero animation
//     animateHero();

//     // Scroll reveal
//     startScrollReveal();
//   }, 1000);
// });

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

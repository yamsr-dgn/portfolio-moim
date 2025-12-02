// ===========================
// MODE DARK / LIGHT
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("yamsar-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    body.setAttribute("data-theme", savedTheme);
  } else {
    body.setAttribute("data-theme", "dark"); // par défaut : mood soir
  }

  updateThemeLabel();

  themeToggle?.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", next);
    localStorage.setItem("yamsar-theme", next);
    animateThemeSwitch();
    updateThemeLabel();
  });

  function updateThemeLabel() {
    const current = body.getAttribute("data-theme");
    const iconSpan = document.querySelector(".theme-toggle-icon");
    const labelSpan = document.querySelector(".theme-toggle-label");
    if (!iconSpan || !labelSpan) return;

    if (current === "dark") {
      iconSpan.textContent = "🌙";
      labelSpan.textContent = "Mode nuit";
    } else {
      iconSpan.textContent = "☀️";
      labelSpan.textContent = "Mode jour";
    }
  }

  function animateThemeSwitch() {
    body.style.transition = "background 0.35s ease, color 0.35s ease";
    setTimeout(() => {
      body.style.transition = "";
    }, 400);
  }

  // ===========================
  // NAV MOBILE
  // ===========================
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  navToggle?.addEventListener("click", () => {
    mainNav?.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  // fermer le menu lorsqu'on clique sur un lien
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav?.classList.remove("open");
      navToggle?.classList.remove("open");
    });
  });

  // ===========================
  // ANIMATIONS SCROLL (REVEAL)
  // ===========================
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // fallback
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ===========================
  // LIGHTBOX PHOTOGRAPHIE
  // ===========================
  const photoItems = document.querySelectorAll(".photo-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  photoItems.forEach((img) => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      if (lightboxCaption) {
        lightboxCaption.textContent = img.dataset.caption || img.alt || "";
      }
      lightbox.classList.add("open");
    });
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox?.classList.remove("open");
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox?.classList.remove("open");
    }
  });

  // ===========================
  // FORMULAIRE CONTACT (feedback visuel simple)
  // ===========================
  const contactForm = document.getElementById("contact-form");
  const contactFeedback = document.getElementById("contact-feedback");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!contactFeedback) return;
    contactFeedback.textContent =
      "Merci pour votre message ! Je vous réponds dès que possible.";
    contactFeedback.style.opacity = "1";

    setTimeout(() => {
      contactFeedback.style.opacity = "0";
    }, 4000);

    contactForm.reset();
  });
});

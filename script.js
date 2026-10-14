"use strict";

// Año automático en el pie de página
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Detectar la preferencia de movimiento del usuario
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Crear las estrellas del fondo
const starfield = document.getElementById("starfield");

if (starfield && !reducedMotion) {
  const starCount = 45;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.setAttribute("aria-hidden", "true");

    const size = Math.random() * 2.5 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * -5;

    star.style.setProperty("--size", `${size}px`);
    star.style.setProperty("--x", `${x}%`);
    star.style.setProperty("--y", `${y}%`);
    star.style.setProperty("--duration", `${duration}s`);
    star.style.setProperty("--delay", `${delay}s`);

    fragment.appendChild(star);
  }

  starfield.appendChild(fragment);
}

// Animaciones de entrada al desplazarse
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  document.body.classList.add("js-ready");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

console.log("✦ ¡Bienvenido al universo de SmartDrop! ✦");
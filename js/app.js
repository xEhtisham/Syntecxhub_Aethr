/* =========================================================
   AETHR — APP
   GSAP Motion System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------------------
  // GSAP INITIAL STATE
  // -----------------------------------------------------

  gsap.set(".logo", {
    opacity: 0,
    y: -15,
  });

  gsap.set(".header__right", {
    opacity: 0,
    y: -15,
  });

  gsap.set(".search", {
    opacity: 0,
    y: 20,
  });

  gsap.set(".hero__eyebrow", {
    opacity: 0,
    y: 15,
  });

  gsap.set(".city-name", {
    opacity: 0,
    y: 30,
  });

  gsap.set(".weather-description", {
    opacity: 0,
    y: 20,
  });

  gsap.set(".temperature", {
    opacity: 0,
    y: 40,
    scale: 0.92,
  });

  gsap.set(".weather-icon", {
    opacity: 0,
    scale: 0.6,
  });

  gsap.set(".feels-like", {
    opacity: 0,
    y: 15,
  });

  gsap.set(".detail", {
    opacity: 0,
    y: 20,
  });

  gsap.set(".section-heading", {
    opacity: 0,
    y: 15,
  });

  gsap.set(".forecast-day", {
    opacity: 0,
    y: 25,
  });

  gsap.set(".footer", {
    opacity: 0,
    y: 15,
  });
  // -----------------------------------------------------
  // PAGE ENTRANCE
  // -----------------------------------------------------

  const entrance = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  entrance
    .to(".logo", {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })

    .to(
      ".header__right",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.5",
    )

    .to(
      ".search",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.3",
    )

    .to(
      ".hero__eyebrow",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.2",
    )

    .to(
      ".city-name",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.3",
    )

    .to(
      ".weather-description",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.5",
    )

    .to(
      ".temperature",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.6",
    )

    .to(
      ".weather-icon",
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      "-=0.8",
    )

    .to(
      ".feels-like",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.5",
    )

    .to(
      ".detail",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
      },
      "-=0.2",
    )

    .to(
      ".section-heading",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.2",
    )

    .to(
      ".forecast-day",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
      },
      "-=0.3",
    )

    .to(
      ".footer",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.2",
    );

  // -----------------------------------------------------
  // AMBIENT BACKGROUND
  // -----------------------------------------------------

  gsap.to(".atmosphere__glow--one", {
    x: "8vw",
    y: "5vh",
    scale: 1.1,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".atmosphere__glow--two", {
    x: "-7vw",
    y: "-6vh",
    scale: 1.15,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // -----------------------------------------------------
  // TEMPERATURE MICRO-MOTION
  // -----------------------------------------------------

  gsap.to(".temperature", {
    y: -4,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // -----------------------------------------------------
  // WEATHER ICON MICRO-MOTION
  // -----------------------------------------------------

  gsap.to(".weather-icon", {
    y: -5,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

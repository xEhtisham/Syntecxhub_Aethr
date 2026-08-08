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
/* =========================================================
   AETHR — WEATHER STATE SYSTEM
   ========================================================= */

const weatherIcon = document.getElementById("weatherIcon");

function setWeatherState(weather) {
  if (!weatherIcon) return;

  const states = ["clear", "clouds", "rain", "snow", "thunderstorm", "mist"];

  const state = states.includes(weather) ? weather : "clear";

  // Animate current visual out
  gsap.to(weatherIcon, {
    scale: 0.8,
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",
    onComplete: () => {
      weatherIcon.dataset.weather = state;

      updateAtmosphere(state);

      // Animate new state in
      gsap.fromTo(
        weatherIcon,
        {
          scale: 0.8,
          opacity: 0,
          rotation: -8,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
      );
    },
  });
}
/* =========================================================
   TEMPORARY WEATHER TEST
   Remove this after API integration.
   ========================================================= */

setTimeout(() => {
  setWeatherState("rain");
}, 3000);
function updateAtmosphere(weather) {
  const atmosphere = document.querySelector(".atmosphere");

  if (!atmosphere) return;

  const colors = {
    clear: {
      primary: "#A8FFEA",
      secondary: "#A78BFA",
    },

    clouds: {
      primary: "#B8C7D9",
      secondary: "#8FA6C9",
    },

    rain: {
      primary: "#5DE2E7",
      secondary: "#6D7CFF",
    },

    snow: {
      primary: "#DDF7FF",
      secondary: "#A9C8FF",
    },

    thunderstorm: {
      primary: "#8B7CFF",
      secondary: "#5A4FBF",
    },

    mist: {
      primary: "#C4CBD4",
      secondary: "#7E8794",
    },
  };

  const palette = colors[weather] || colors.clear;

  gsap.to(":root", {
    "--accent": palette.primary,
    "--accent-secondary": palette.secondary,
    duration: 1.5,
    ease: "power2.out",
  });
}
/* =========================================================
   HERO ATMOSPHERIC MOTION
   ========================================================= */

gsap.to(".hero__temperature::before", {
  scale: 1.08,
  opacity: 0.8,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

gsap.to(".hero__temperature", {
  y: -3,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

gsap.to(".weather-icon::after", {
  rotation: 360,
  duration: 8,
  repeat: -1,
  ease: "none",
});

/* =========================================================
   AETHR — WEATHER APP
   ========================================================= */

/* ---------------------------------------------------------
   01. API CONFIGURATION
   --------------------------------------------------------- */

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

/* ---------------------------------------------------------
   02. DOM ELEMENTS
   --------------------------------------------------------- */

const weatherIcon = document.getElementById("weatherIcon");

const appStatus = document.getElementById("appStatus");
const statusLabel = document.getElementById("statusLabel");
const statusMessage = document.getElementById("statusMessage");

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

/* ---------------------------------------------------------
   03. GSAP — PAGE ENTRANCE
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Initial positions

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

  // Entrance timeline

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

  /* -----------------------------------------------------
       AMBIENT BACKGROUND MOTION
       ----------------------------------------------------- */

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

  /* -----------------------------------------------------
       TEMPERATURE MICRO MOTION
       ----------------------------------------------------- */

  gsap.to(".temperature", {
    y: -4,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /* -----------------------------------------------------
       WEATHER ICON MICRO MOTION
       ----------------------------------------------------- */

  gsap.to(".weather-icon", {
    y: -5,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

/* ---------------------------------------------------------
   04. WEATHER STATE SYSTEM
   --------------------------------------------------------- */

function setWeatherState(weather) {
  if (!weatherIcon) return;

  const states = ["clear", "clouds", "rain", "snow", "thunderstorm", "mist"];

  const state = states.includes(weather) ? weather : "clear";

  gsap.to(weatherIcon, {
    scale: 0.8,
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",

    onComplete: () => {
      weatherIcon.dataset.weather = state;

      updateAtmosphere(state);

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

/* ---------------------------------------------------------
   05. ATMOSPHERE / WEATHER COLORS
   --------------------------------------------------------- */

function updateAtmosphere(weather) {
  if (!document.querySelector(".atmosphere")) {
    return;
  }

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

/* ---------------------------------------------------------
   06. APPLICATION STATUS
   --------------------------------------------------------- */

function showStatus(label, message) {
  if (!appStatus) return;

  appStatus.classList.remove("is-error");

  statusLabel.textContent = label;
  statusMessage.textContent = message;

  appStatus.classList.add("is-visible");
}

function showError(label, message) {
  if (!appStatus) return;

  statusLabel.textContent = label;
  statusMessage.textContent = message;

  appStatus.classList.add("is-error");
  appStatus.classList.add("is-visible");
}

function hideStatus() {
  if (!appStatus) return;

  appStatus.classList.remove("is-visible");

  setTimeout(() => {
    appStatus.classList.remove("is-error");
  }, 500);
}

/* ---------------------------------------------------------
   07. OPENWEATHERMAP API
   --------------------------------------------------------- */

async function fetchWeather(city) {
  const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  // Safe console logging — API key is hidden

  console.log("AETHR API URL:", url.replace(API_KEY, "[HIDDEN]"));

  const response = await fetch(url);

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from weather service.");
  }

  console.log("AETHR API RESPONSE:", data);
  console.log("AETHR HTTP STATUS:", response.status);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid or inactive API key.");
    }

    if (response.status === 404) {
      throw new Error("City not found.");
    }

    if (response.status === 429) {
      throw new Error("API request limit reached.");
    }

    throw new Error(
      data.message || `Weather request failed (${response.status}).`,
    );
  }

  return data;
}

/* ---------------------------------------------------------
   08. UPDATE WEATHER UI
   --------------------------------------------------------- */

function updateWeatherUI(data) {
  const cityName = document.getElementById("cityName");

  const weatherDescription = document.getElementById("weatherDescription");

  const temperature = document.getElementById("temperature");

  const feelsLike = document.getElementById("feelsLike");

  const humidity = document.getElementById("humidity");

  const wind = document.getElementById("wind");

  const pressure = document.getElementById("pressure");

  const visibility = document.getElementById("visibility");

  /* -----------------------------------------------------
       Basic weather data
       ----------------------------------------------------- */

  cityName.textContent = data.name;

  weatherDescription.textContent = data.weather[0].description;

  temperature.textContent = `${Math.round(data.main.temp)}°`;

  feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;

  humidity.textContent = `${data.main.humidity}%`;

  wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

  pressure.textContent = `${data.main.pressure} hPa`;

  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

  /* -----------------------------------------------------
       Determine AETHR weather state
       ----------------------------------------------------- */

  const condition = data.weather[0].main.toLowerCase();

  let weatherState = "clear";

  if (condition.includes("thunderstorm")) {
    weatherState = "thunderstorm";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    weatherState = "rain";
  } else if (condition.includes("snow")) {
    weatherState = "snow";
  } else if (condition.includes("cloud")) {
    weatherState = "clouds";
  } else if (
    [
      "mist",
      "smoke",
      "haze",
      "dust",
      "fog",
      "sand",
      "ash",
      "squall",
      "tornado",
    ].some((type) => condition.includes(type))
  ) {
    weatherState = "mist";
  }

  setWeatherState(weatherState);
}

/* ---------------------------------------------------------
   09. SEARCH
   --------------------------------------------------------- */

if (searchForm && cityInput) {
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
      cityInput.focus();

      return;
    }

    showStatus("SEARCHING ATMOSPHERE", `Reading conditions in ${city}...`);

    try {
      const weatherData = await fetchWeather(city);

      updateWeatherUI(weatherData);

      hideStatus();

      cityInput.value = "";
    } catch (error) {
      console.error("AETHR WEATHER ERROR:", error);

      showError("WEATHER ERROR", error.message);
    }
  });
}

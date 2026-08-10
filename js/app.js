/* =========================================================
   AETHR — WEATHER APP
   ========================================================= */

/* ---------------------------------------------------------
   01. API CONFIGURATION
   --------------------------------------------------------- */

const API_KEY = AETHR_CONFIG.API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

/* ---------------------------------------------------------
   02. DOM ELEMENTS
   --------------------------------------------------------- */

const weatherIcon = document.getElementById("weatherIcon");

const appStatus = document.getElementById("appStatus");
const statusLabel = document.getElementById("statusLabel");
const statusMessage = document.getElementById("statusMessage");

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

const forecastList = document.getElementById("forecastList");

/* ---------------------------------------------------------
   TEMPERATURE UNIT
   --------------------------------------------------------- */

let currentUnit = "celsius";

let currentWeatherData = null;
let currentForecastData = null;

/* ---------------------------------------------------------
   03. GSAP — PAGE ENTRANCE
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
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

  /* Ambient background */

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

  /* Temperature motion */

  gsap.to(".temperature", {
    y: -4,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /* Weather icon motion */

  gsap.to(".weather-icon", {
    y: -5,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

/* ---------------------------------------------------------
   04. WEATHER STATE
   --------------------------------------------------------- */

function getWeatherState(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("thunderstorm")) {
    return "thunderstorm";
  }

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return "rain";
  }

  if (condition.includes("snow")) {
    return "snow";
  }

  if (condition.includes("cloud")) {
    return "clouds";
  }

  if (
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
    return "mist";
  }

  return "clear";
}

/* ---------------------------------------------------------
   05. SET WEATHER STATE
   --------------------------------------------------------- */

function setWeatherState(weather) {
  if (!weatherIcon) {
    console.warn("AETHR: weatherIcon not found.");
    return;
  }

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
   06. ATMOSPHERE
   --------------------------------------------------------- */

function updateAtmosphere(weather) {
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
   07. APPLICATION STATUS
   --------------------------------------------------------- */

function showStatus(label, message) {
  if (!appStatus) {
    console.warn("AETHR: appStatus not found.");
    return;
  }

  appStatus.classList.remove("is-error");

  statusLabel.textContent = label;
  statusMessage.textContent = message;

  appStatus.classList.add("is-visible");
}

function showError(label, message) {
  if (!appStatus) {
    console.error("AETHR ERROR:", label, message);
    return;
  }

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
   08. CURRENT WEATHER API
   --------------------------------------------------------- */

async function fetchWeather(city) {
  const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  console.log(
    "AETHR CURRENT WEATHER REQUEST:",
    url.replace(API_KEY, "[HIDDEN]"),
  );

  const response = await fetch(url);

  const data = await response.json();

  console.log("AETHR CURRENT WEATHER:", data);

  console.log("AETHR CURRENT STATUS:", response.status);

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
   09. FORECAST API
   --------------------------------------------------------- */

async function fetchForecast(city) {
  const url = `${FORECAST_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  console.log("AETHR FORECAST REQUEST:", url.replace(API_KEY, "[HIDDEN]"));

  const response = await fetch(url);

  const data = await response.json();

  console.log("AETHR FORECAST RESPONSE:", data);

  console.log("AETHR FORECAST STATUS:", response.status);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Forecast API rejected the API key.");
    }

    if (response.status === 404) {
      throw new Error("Forecast city not found.");
    }

    if (response.status === 429) {
      throw new Error("Forecast API request limit reached.");
    }

    throw new Error(
      data.message || `Forecast request failed (${response.status}).`,
    );
  }

  if (!Array.isArray(data.list)) {
    throw new Error("Forecast data is missing.");
  }

  return data;
}
/* ---------------------------------------------------------
   TEMPERATURE CONVERSION
   --------------------------------------------------------- */

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function formatTemperature(celsius) {
  const value =
    currentUnit === "celsius" ? celsius : celsiusToFahrenheit(celsius);

  return `${Math.round(value)}°`;
}
/* ---------------------------------------------------------
   10. UPDATE CURRENT WEATHER
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

  cityName.textContent = data.name;

  weatherDescription.textContent = data.weather[0].description;

  temperature.textContent = formatTemperature(data.main.temp);

  feelsLike.textContent = formatTemperature(data.main.feels_like);

  humidity.textContent = `${data.main.humidity}%`;

  wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

  pressure.textContent = `${data.main.pressure} hPa`;

  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

  const condition = data.weather[0].main;

  const weatherState = getWeatherState(condition);

  setWeatherState(weatherState);
}

/* ---------------------------------------------------------
   11. UPDATE FORECAST
   --------------------------------------------------------- */

function updateForecastUI(data) {
  if (!forecastList) {
    throw new Error("Forecast container #forecastList was not found.");
  }

  if (!data.list || data.list.length === 0) {
    throw new Error("No forecast data was returned.");
  }

  console.log(
    "AETHR: Building forecast...",
    data.list.length,
    "forecast entries received.",
  );

  /*
       Group forecasts by local calendar date.
    */

  const dailyForecasts = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);

    const dateKey = date.toLocaleDateString("en-CA");

    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = [];
    }

    dailyForecasts[dateKey].push(item);
  });

  const days = Object.values(dailyForecasts).slice(0, 5);

  console.log("AETHR: Daily forecast groups:", days.length);

  forecastList.innerHTML = "";

  days.forEach((day, index) => {
    /*
           Find the forecast closest to 12:00.
        */

    const middayForecast = day.reduce((closest, current) => {
      const currentHour = new Date(current.dt * 1000).getHours();

      const closestHour = new Date(closest.dt * 1000).getHours();

      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12)
        ? current
        : closest;
    });

    const date = new Date(middayForecast.dt * 1000);

    const dayName =
      index === 0
        ? "TODAY"
        : date
            .toLocaleDateString("en-US", {
              weekday: "short",
            })
            .toUpperCase();

    const temperature = formatTemperature(middayForecast.main.temp);

    const condition = middayForecast.weather[0].description;

    const weatherState = getWeatherState(middayForecast.weather[0].main);

    const forecastItem = document.createElement("article");

    forecastItem.className = "forecast-day";

    forecastItem.innerHTML = `

            <span class="forecast-day__name">
                ${dayName}
            </span>

            <div
                class="forecast-day__icon"
                data-weather="${weatherState}"
            ></div>

            <span class="forecast-day__condition">
                ${condition}
            </span>

            <span class="forecast-day__temperature">
                ${temperature}
            </span>

        `;

    forecastList.appendChild(forecastItem);
  });

  /*
       Animate generated forecast items.
    */

  gsap.fromTo(
    forecastList.querySelectorAll(".forecast-day"),

    {
      opacity: 0,
      y: 20,
    },

    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
    },
  );

  console.log("AETHR: Forecast UI updated successfully.");
}

/* ---------------------------------------------------------
   12. SEARCH
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
      console.log("AETHR: Searching for:", city);

      const weatherData = await fetchWeather(city);

      currentWeatherData = weatherData;

      console.log("AETHR: Current weather received.");

      updateWeatherUI(weatherData);

      const forecastData = await fetchForecast(city);

      currentForecastData = forecastData;

      console.log("AETHR: Forecast received.");

      updateForecastUI(forecastData);

      hideStatus();

      cityInput.value = "";
    } catch (error) {
      console.error("AETHR WEATHER ERROR:", error);

      showError("WEATHER ERROR", error.message);
    }
  });
} else {
  console.error("AETHR: Search form or city input not found.");
}
/* ---------------------------------------------------------
   °C / °F TOGGLE
   --------------------------------------------------------- */

const celsiusBtn = document.getElementById("celsiusBtn");

const fahrenheitBtn = document.getElementById("fahrenheitBtn");

function setTemperatureUnit(unit) {
  currentUnit = unit;

  if (celsiusBtn) {
    celsiusBtn.classList.toggle("active", unit === "celsius");
  }

  if (fahrenheitBtn) {
    fahrenheitBtn.classList.toggle("active", unit === "fahrenheit");
  }

  /*
   * Redraw existing weather data
   */

  if (currentWeatherData) {
    updateWeatherUI(currentWeatherData);
  }

  if (currentForecastData) {
    updateForecastUI(currentForecastData);
  }
}

if (celsiusBtn) {
  celsiusBtn.addEventListener("click", () => {
    setTemperatureUnit("celsius");
  });
}

if (fahrenheitBtn) {
  fahrenheitBtn.addEventListener("click", () => {
    setTemperatureUnit("fahrenheit");
  });
}

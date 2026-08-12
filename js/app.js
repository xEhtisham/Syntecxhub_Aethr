/* =========================================================
   AETHR — WEATHER APP
   ========================================================= */

/* ---------------------------------------------------------
   01. API CONFIGURATION
   --------------------------------------------------------- */

const API_KEY = AETHR_CONFIG.API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

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

const searchSuggestions = document.getElementById("searchSuggestions");

const localTimeEl = document.getElementById("localTime");

/* ---------------------------------------------------------
   TEMPERATURE UNIT
   --------------------------------------------------------- */

let currentUnit = "celsius";

let currentWeatherData = null;
let currentForecastData = null;
let clockInterval = null;

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

  gsap.set(".hero__time", {
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
      ".hero__time",
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

  /* Initial data load */
  const savedLocation = localStorage.getItem("aethr_last_location");
  if (savedLocation) {
    try {
      const locationQuery = JSON.parse(savedLocation);
      performSearch(locationQuery);
    } catch (e) {
      performSearch(savedLocation);
    }
  } else {
    fetchUserLocation();
  }
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

async function fetchWeather(query) {
  let url;
  if (typeof query === "object" && query.lat && query.lon) {
    url = `${WEATHER_API_URL}?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
  } else {
    url = `${WEATHER_API_URL}?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
  }

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
   08.5. GEOCODING API
   --------------------------------------------------------- */

async function fetchSuggestions(query) {
  const url = `${GEO_API_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const response = await fetch(url);

  if (!response.ok) return [];

  const data = await response.json();
  return data.results || [];
}

/* ---------------------------------------------------------
   09. FORECAST API
   --------------------------------------------------------- */

async function fetchForecast(query) {
  let url;
  if (typeof query === "object" && query.lat && query.lon) {
    url = `${FORECAST_API_URL}?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
  } else {
    url = `${FORECAST_API_URL}?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
  }

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

function startLocalTimeClock(timezoneOffset) {
  if (clockInterval) {
    clearInterval(clockInterval);
  }

  const updateClock = () => {
    // Current UTC time in milliseconds
    const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    // Local time = UTC time + timezone offset
    const localTime = new Date(utcTime + (timezoneOffset * 1000));
    
    if (localTimeEl) {
      localTimeEl.textContent = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // Run immediately then every second
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
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
  const localTimeEl = document.getElementById("localTime");

  const animatedElements = [
    cityName,
    weatherDescription,
    localTimeEl,
    temperature,
    feelsLike,
    humidity,
    wind,
    pressure,
    visibility,
  ];

  // If this is the very first load, elements are already at opacity 0 from CSS/GSAP setup.
  // We can just set data and fade in.
  // But if it's an update, they are opacity 1 and need to fade out.
  // Using gsap.to to fade out, then onComplete we swap the data.
  gsap.to(animatedElements, {
    opacity: 0,
    y: 10,
    duration: 0.3,
    stagger: 0.02,
    ease: "power2.in",
    onComplete: () => {
      cityName.textContent = data.name;
      weatherDescription.textContent = data.weather[0].description;
      temperature.textContent = formatTemperature(data.main.temp);
      feelsLike.textContent = formatTemperature(data.main.feels_like);
      humidity.textContent = `${data.main.humidity}%`;
      wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
      pressure.textContent = `${data.main.pressure} hPa`;
      visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

      startLocalTimeClock(data.timezone);

      const condition = data.weather[0].main;
      const weatherState = getWeatherState(condition);
      const iconName = getWeatherIcon(
        data.weather[0].description,
        data.weather[0].icon,
      );
      const iconURL = getWeatherIconURL(iconName);

      weatherIcon.innerHTML = `
        <img
            src="${iconURL}"
            alt="${data.weather[0].description}"
            class="weather-icon__image"
        >
      `;

      setWeatherState(weatherState);

      // Fade back in
      gsap.to(animatedElements, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        clearProps: "all",
      });
    }
  });
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
  const existingCards = forecastList.querySelectorAll(".forecast-day");

  const renderForecastCards = () => {
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

      const iconName = getWeatherIcon(
        middayForecast.weather[0].description,
        middayForecast.weather[0].icon,
      );
      const iconURL = getWeatherIconURL(iconName);

      const forecastItem = document.createElement("article");

      forecastItem.className = "forecast-day";

      forecastItem.innerHTML = `

            <span class="forecast-day__name">
                ${dayName}
            </span>

            <div
                class="forecast-day__icon"
                data-weather="${weatherState}"
            >
                <img src="${iconURL}" alt="${condition}" class="forecast-icon__image">
            </div>

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
  };

  if (existingCards.length > 0) {
    gsap.to(existingCards, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: renderForecastCards,
    });
  } else {
    renderForecastCards();
  }

  console.log("AETHR: Forecast UI updated successfully.");
}

/* ---------------------------------------------------------
   12. SEARCH
   --------------------------------------------------------- */

async function performSearch(query) {
  showStatus("SEARCHING ATMOSPHERE", `Reading conditions...`);

  try {
    console.log("AETHR: Searching for:", query);

    const weatherData = await fetchWeather(query);

    // Override OpenWeatherMap's matched city name with our exact location name
    if (typeof query === "object" && query.name) {
      weatherData.name = query.name;
    }

    currentWeatherData = weatherData;
    console.log("AETHR: Current weather received.");
    updateWeatherUI(weatherData);

    const forecastData = await fetchForecast(query);
    currentForecastData = forecastData;
    console.log("AETHR: Forecast received.");
    updateForecastUI(forecastData);

    hideStatus();
    
    // Save successful search to localStorage so it persists on reload
    if (typeof query === "object") {
      localStorage.setItem("aethr_last_location", JSON.stringify(query));
    } else {
      localStorage.setItem("aethr_last_location", query);
    }

    // Close suggestions on successful search
    if (searchSuggestions) {
      searchSuggestions.classList.remove("is-active");
    }

    if (cityInput) {
      cityInput.value = "";
    }
  } catch (error) {
    console.error("AETHR WEATHER ERROR:", error);
    showError("WEATHER ERROR", error.message);
  }
}

async function fetchUserLocation() {
  const defaultCity = "New York";

  const fallbackToIP = async () => {
    try {
      console.log("AETHR: Attempting IP-based geolocation fallback...");
      const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
      if (!response.ok) throw new Error("IP Geolocation failed");

      const data = await response.json();
      const lat = data.latitude;
      const lon = data.longitude;
      const city = data.city;

      console.log(`AETHR: IP Geolocation successful (${lat}, ${lon}, ${city}).`);
      
      if (city) {
        performSearch({ lat, lon, name: city });
      } else {
        performSearch({ lat, lon });
      }
    } catch (error) {
      console.log("AETHR: IP Geolocation failed too. Falling back to default.");
      performSearch(defaultCity);
    }
  };

  if (!navigator.geolocation) {
    console.log("AETHR: Geolocation is not supported by your browser.");
    fallbackToIP();
    return;
  }

  showStatus("LOCATING", "Finding your coordinates...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(`AETHR: Geolocation successful (${lat}, ${lon}).`);
      performSearch({ lat, lon });
    },
    (error) => {
      console.log("AETHR: HTML5 Geolocation failed or denied.", error.message);
      fallbackToIP();
    },
    { timeout: 10000 },
  );
}

if (searchForm && cityInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
      cityInput.focus();
      return;
    }

    performSearch(city);
  });
} else {
  console.error("AETHR: Search form or city input not found.");
}

/* ---------------------------------------------------------
   13. SEARCH SUGGESTIONS LOGIC
   --------------------------------------------------------- */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function renderSuggestions(cities) {
  if (!searchSuggestions) return;

  searchSuggestions.innerHTML = "";

  if (cities.length === 0) {
    searchSuggestions.classList.remove("is-active");
    return;
  }

  cities.forEach((city, index) => {
    const li = document.createElement("li");
    li.className = "search__suggestion-item";

    li.tabIndex = 0;
    li.dataset.index = index;

    const locationName = `${city.name}, ${city.country_code}`;

    li.innerHTML = `
      <i class="ph ph-map-pin search__suggestion-icon"></i>
      <span class="search__suggestion-name">${city.name}</span>
      <span class="search__suggestion-context">${city.admin1 ? city.admin1 + ", " : ""}${city.country}</span>
    `;

    const handleSelect = () => {
      cityInput.value = locationName;
      searchSuggestions.classList.remove("is-active");
      performSearch({
        lat: city.latitude,
        lon: city.longitude,
        name: city.name,
      });
    };

    li.addEventListener("click", handleSelect);
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSelect();
      }
    });

    searchSuggestions.appendChild(li);
  });

  searchSuggestions.classList.add("is-active");
}

if (cityInput) {
  const handleInput = debounce(async (event) => {
    const query = event.target.value.trim();

    if (query.length < 2) {
      if (searchSuggestions) searchSuggestions.classList.remove("is-active");
      return;
    }

    try {
      const cities = await fetchSuggestions(query);
      renderSuggestions(cities);
    } catch (error) {
      console.error("Geocoding API Error:", error);
    }
  }, 100);

  cityInput.addEventListener("input", handleInput);

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target) && searchSuggestions) {
      searchSuggestions.classList.remove("is-active");
    }
  });

  // Handle keyboard navigation
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchSuggestions) {
      searchSuggestions.classList.remove("is-active");
      return;
    }

    if (
      searchSuggestions &&
      searchSuggestions.classList.contains("is-active")
    ) {
      const items = searchSuggestions.querySelectorAll(
        ".search__suggestion-item",
      );
      if (items.length > 0 && e.key === "ArrowDown") {
        e.preventDefault();
        items[0].focus();
      }
    }
  });

  if (searchSuggestions) {
    searchSuggestions.addEventListener("keydown", (e) => {
      const items = Array.from(
        searchSuggestions.querySelectorAll(".search__suggestion-item"),
      );
      const index = items.indexOf(document.activeElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (index < items.length - 1) items[index + 1].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (index > 0) {
          items[index - 1].focus();
        } else {
          cityInput.focus();
        }
      } else if (e.key === "Escape") {
        cityInput.focus();
        searchSuggestions.classList.remove("is-active");
      }
    });
  }
}

/* ---------------------------------------------------------
   14. °C / °F TOGGLE
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
function getWeatherIcon(condition, iconCode) {
  const isNight = iconCode?.endsWith("n");

  condition = condition.toLowerCase();

  if (condition.includes("thunderstorm")) {
    return isNight ? "thunderstorms-night-rain" : "thunderstorms-day-rain";
  }

  if (condition.includes("drizzle")) {
    return "drizzle";
  }

  if (condition.includes("rain")) {
    return "rain";
  }

  if (condition.includes("snow")) {
    return "snow";
  }

  if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    return isNight ? "fog-night" : "fog-day";
  }

  if (condition.includes("cloud")) {
    return isNight ? "partly-cloudy-night" : "partly-cloudy-day";
  }

  return isNight ? "clear-night" : "clear-day";
}
function getWeatherIconURL(iconName) {
  return `https://cdn.jsdelivr.net/npm/@meteocons/svg/monochrome/${iconName}.svg`;
}

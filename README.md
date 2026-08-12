# AETHR — Atmospheric Weather Experience

![Aethr](https://img.shields.io/badge/Status-Live-success) ![Vite](https://img.shields.io/badge/Built_with-Vite-646CFF?logo=vite&logoColor=white) ![GSAP](https://img.shields.io/badge/Animated_with-GSAP-88CE02)

**Aethr** is a premium, beautifully crafted weather dashboard designed to provide an immersive atmospheric experience. Built with a focus on fluid animations, glassmorphism, and responsive design.

**🌍 Live Demo:** [https://aethr-weather.vercel.app/](https://aethr-weather.vercel.app/)

## ✨ Features
- **Fluid GSAP Animations**: Every element smoothly cascades into place on load and gracefully transitions when searching for new locations.
- **Precision Geolocation**: Click the "Locate Me" (`⌖`) button to instantly snap to your exact GPS coordinates.
- **Saved Cities**: Star your favorite cities for 1-click access. Favorites are saved locally in your browser so they're always there when you return.
- **Comprehensive Data**: View real-time temperature, condition, humidity, wind speed, pressure, visibility, and a 5-day forecast.
- **Global Toggles**: Instantly switch the entire application between Celsius and Fahrenheit.
- **Responsive Design**: Carefully crafted layouts that look stunning on both desktop and mobile devices.

## 🛠️ Technology Stack
- **Core**: Vanilla HTML, CSS, and Javascript
- **Bundler**: [Vite](https://vitejs.dev/)
- **Animations**: [GSAP (GreenSock)](https://gsap.com/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **APIs**: 
  - [OpenWeatherMap](https://openweathermap.org/) (Weather & Forecast Data)
  - [Open-Meteo](https://open-meteo.com/) (Geocoding & City Search)

## 🚀 Running Locally

To run this project on your own machine, you will need Node.js installed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/xEhtisham/Syntecxhub_Aethr.git
   cd Syntecxhub_Aethr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 📦 Deployment
This project is configured out-of-the-box for seamless deployment on platforms like Vercel and Netlify via the included `vercel.json` and `netlify.toml` files. Ensure you add your `VITE_OPENWEATHER_API_KEY` to your deployment platform's Environment Variables.

import { addToHistory } from './history.js';
import { setupDownloadButton } from './download.js';

const apiKey = "335693caab24c80dc3e31365307b3f55";

export const fetchWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
  .then(response => {
    if (!response.ok) {
      alert("No weather found.");
      throw new Error("No weather found.");
    }
    return response.json();
  })
  .then(data => {
    displayWeather(data);
    addToHistory(city);
    setupDownloadButton(data);
    const timezoneOffsetSeconds = data.timezone;
    const currentTimeUTC = new Date();
    const currentTimeLocal = new Date(currentTimeUTC.getTime() + timezoneOffsetSeconds * 1000 + new Date().getTimezoneOffset() * 60000);
    const hours = currentTimeLocal.getHours();
    const minutes = currentTimeLocal.getMinutes();
const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
document.querySelector(".current-time").innerText = "Current time: " + timeString;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    alert("Failed to fetch weather data.");
  });
};

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const weatherDescriptions = data.weather.map(weather => weather.description);
  const formattedDescriptions = weatherDescriptions.join(', ');
  document.querySelector(".city").innerText = `Weather in ${name}`;
  document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".description").innerText = formattedDescriptions;
  document.querySelector(".temp").innerText = `${temp}°C`;
  document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
};

export const searchWeather = () => {
  const city = document.querySelector(".search-bar").value;
  fetchWeather(city);
};
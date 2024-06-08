import { addToHistory } from './history.js';
import { setupDownloadButton } from './download.js';

const apiKey = "335693caab24c80dc3e31365307b3f55";

export const fetchWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
  .then(response => {
    if (!response.ok) {
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

  fetchUnsplashImage(name)
    .then(imageUrl => {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
    })
    .catch(error => {
      console.error("Error fetching image:", error);
      document.body.style.backgroundImage = `url('default_image_url')`; // fallback image
    });
};

const fetchUnsplashImage = async (query) => {
  const accessKey = 'pCYB8oXTX92eWS9F5G2tdft18IN6Y6sDNhB4HeNIlM4';
  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.urls.regular; // Return the URL of the image
};


export const searchWeather = () => {
  const city = document.querySelector(".search-bar").value;
  fetchWeather(city).catch(error => console.error('Error fetching weather for searched city:', error));
};

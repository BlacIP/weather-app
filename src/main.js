import { renderApp } from './components/templates.js';
import { fetchWeather, searchWeather } from './components/weather.js';
import { loadHistory, clearHistory } from './components/history.js';
import { setupDownloadButton } from './components/download.js';
import { setupShareButton } from './components/share.js';

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  loadHistory();
  fetchWeather("Lagos");

  document.querySelector(".search button").addEventListener("click", () => {
    searchWeather();
  });

  document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchWeather();
    }
  });

  document.querySelector(".toggle-history").addEventListener("click", () => {
    document.querySelector(".history").classList.toggle("active");
  });

  document.querySelector(".clear-history").addEventListener("click", () => {
    clearHistory();
  });

  // Initialize download button
  setupDownloadButton();
  // Initialize share button
  setupShareButton();
});

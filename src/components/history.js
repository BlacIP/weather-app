import { fetchWeather } from './weather.js';

export const addToHistory = (city) => {
  let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderHistory();
  }
};

export const loadHistory = () => {
  renderHistory();
};

const renderHistory = () => {
    const historyContainer = document.querySelector('.history-content');
    historyContainer.innerHTML = '<h3>Search History:</h3>';
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    history.forEach(city => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
  
      const cityElement = document.createElement('p');
      cityElement.innerText = city;
      cityElement.addEventListener('click', () => {
        fetchWeather(city);
        document.querySelector('.history').classList.remove('active'); // Hide history after selection
      });
  
      historyItem.appendChild(cityElement);
      historyContainer.appendChild(historyItem);
    });
  };
  

export const clearHistory = () => {
  localStorage.removeItem('weatherHistory');
  renderHistory();
};

export const setupShareButton = () => {
    const modal = document.getElementById('share-modal');
    const shareTextArea = document.getElementById('share-text');
    const copyButton = document.getElementById('copy-button');
    const closeButton = document.querySelector('.close-button');
  
    const openModal = () => {
      const weatherDetails = getWeatherDetails();
      const cityName = document.querySelector('.city').innerText.replace('Weather in ', '');
      const searchLink = `${window.location.origin}/search?city=${encodeURIComponent(cityName)}`;
      const shareText = `${weatherDetails}\n\nSearch for more details: ${searchLink}\n\nPowered by openweather.com`;
  
      shareTextArea.value = shareText;
      modal.style.display = 'flex';
    };
  
    const closeModal = () => {
      modal.style.display = 'none';
    };
  
    const copyToClipboard = () => {
      shareTextArea.select();
      document.execCommand('copy');
      alert('Copied to clipboard');
    };
  
    document.querySelector('.share').addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    copyButton.addEventListener('click', copyToClipboard);
  
    // Close modal if clicked outside of the content
    window.onclick = (event) => {
      if (event.target == modal) {
        closeModal();
      }
    };
  };
  
  const getWeatherDetails = () => {
    const city = document.querySelector('.city').innerText;
    const temp = document.querySelector('.temp').innerText;
    const description = document.querySelector('.description').innerText;
    const humidity = document.querySelector('.humidity').innerText;
    const wind = document.querySelector('.wind').innerText;
  
    return `${city}\nTemperature: ${temp}\nDescription: ${description}\nHumidity: ${humidity}\nWind Speed: ${wind}`;
  };
  
import html2canvas from 'html2canvas';

export const setupDownloadButton = () => {
  const downloadButton = document.querySelector('.download');
  downloadButton.addEventListener('click', async () => {
    const cityName = document.querySelector('.city').innerText.replace('Weather in ', '');
    await downloadPageAsImage(cityName);
  });
};

const downloadPageAsImage = async (cityName) => {
  const searchElement = document.querySelector('.search');
  const toggleButton = document.querySelector('.toggle-history');
  const downloadButton = document.querySelector('.download');
  const shareButton = document.querySelector('.share');

  // Hide the search, toggle, download, and share elements before taking the screenshot
  searchElement.style.display = 'none';
  toggleButton.style.display = 'none';
  downloadButton.style.display = 'none';
  shareButton.style.display = 'none';

  // Use html2canvas to capture the screenshot of the entire body element
  const canvas = await html2canvas(document.body, { useCORS: true });
  const imageUrl = canvas.toDataURL('image/png');

  // Create a download link
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `${cityName}_weather_design.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Restore the search, toggle, download, and share elements visibility
  searchElement.style.display = 'flex';
  toggleButton.style.display = 'block';
  downloadButton.style.display = 'block';
  shareButton.style.display = 'block';

  return imageUrl;
};

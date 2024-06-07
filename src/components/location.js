import { fetchWeather } from './weather.js';

const apiKey = "335693caab24c80dc3e31365307b3f55";

export const detectLocationAndFetchWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Log latitude and longitude
        fetchLocationName(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error); // Log geolocation error
        fetchWeather("Lagos"); // Fallback to Lagos if location detection fails
      }
    );
  } else {
    console.error('Geolocation not supported'); // Log if geolocation is not supported
    fetchWeather("Lagos"); // Fallback to Lagos if Geolocation API is not supported
  }
};

const fetchLocationName = (lat, lon) => {
  fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch location name");
      }
      return response.json();
    })
    .then(data => {
      console.log('Reverse Geocoding API Response:', data); // Log reverse geocoding API response
      if (data && data.length > 0) {
        const { name, state, country } = data[0];
        console.log(`Detected Location: ${name}, State: ${state}, Country: ${country}`);
        fetchWeatherWithFallback(name, state, country);
      } else {
        console.warn('No location name found in response'); // Log if no location name is found
        fetchWeatherWithFallback(null, null, null); // Fallback with null values
      }
    })
    .catch(error => {
      console.error('Error fetching location name:', error); // Log error fetching location name
      fetchWeatherWithFallback(null, null, null); // Fallback with null values
    });
};

const fetchWeatherWithFallback = (city, state, country) => {
  if (city) {
    fetchWeather(city)
      .catch(() => {
        if (state) {
          fetchWeather(state)
            .catch(() => {
              if (country) {
                fetchWeather(country)
                  .catch(() => {
                    fetchWeather("Lagos"); // Use the most popular name as the last fallback
                  });
              } else {
                fetchWeather("Lagos"); // Use the most popular name as the last fallback
              }
            });
        } else {
          if (country) {
            fetchWeather(country)
              .catch(() => {
                fetchWeather("Lagos"); // Use the most popular name as the last fallback
              });
          } else {
            fetchWeather("Lagos"); // Use the most popular name as the last fallback
          }
        }
      });
  } else {
    if (state) {
      fetchWeather(state)
        .catch(() => {
          if (country) {
            fetchWeather(country)
              .catch(() => {
                fetchWeather("Lagos"); // Use the most popular name as the last fallback
              });
          } else {
            fetchWeather("Lagos"); // Use the most popular name as the last fallback
          }
        });
    } else {
      if (country) {
        fetchWeather(country)
          .catch(() => {
            fetchWeather("Lagos"); // Use the most popular name as the last fallback
          });
      } else {
        fetchWeather("Lagos"); // Use the most popular name as the last fallback
      }
    }
  }
};

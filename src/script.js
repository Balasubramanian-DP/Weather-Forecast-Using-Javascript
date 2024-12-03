const apiKey = '028d8db7f3eb88605a2fe12486504283';  //API key
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to search by city name
function searchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  
  if (city === '') {
    alert('Please enter a city name!');
    return;
  }

  fetchWeather(city)
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
        return fetchForecast(city);
      } else {
        throw new Error(data.message);
      }
    })
    .then(forecastData => displayForecast(forecastData))
    .catch(error => alert(`Error: ${error.message}`));
}

// Function to search by current location
function searchCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoordinates(latitude, longitude);
    }, () => {
      alert('Unable to retrieve your location. Please check your browser settings.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Fetch weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
  try {
    const response = await fetch(`${currentWeatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
      fetchForecastByCoordinates(lat, lon);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Fetch forecast by coordinates
async function fetchForecastByCoordinates(lat, lon) {
  try {
    const response = await fetch(`${forecastWeatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    alert('Error fetching forecast data.');
  }
}

// Fetch weather by city name
async function fetchWeather(city) {
  const response = await fetch(`${currentWeatherUrl}?q=${city}&appid=${apiKey}&units=metric`);
  return await response.json();
}

// Fetch forecast by city name
async function fetchForecast(city) {
  const response = await fetch(`${forecastWeatherUrl}?q=${city}&appid=${apiKey}&units=metric`);
  return await response.json();
}

// Function to display current weather
function displayWeather(data) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  weatherDisplay.classList.remove('hidden');

  document.getElementById('cityName').textContent = data.name;
  document.getElementById('date').textContent = new Date().toLocaleDateString();
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('weatherDescription').textContent = data.weather[0].description;
  document.getElementById('temperature').textContent = `${data.main.temp}°C`;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
}

// Function to display 5-day forecast
function displayForecast(data) {
  const forecastDisplay = document.getElementById('forecastDisplay');
  forecastDisplay.innerHTML = ''; // Clear previous forecast
  forecastDisplay.classList.remove('hidden');

  const dailyData = getDailyForecast(data);

  dailyData.forEach(day => {
    const forecastCard = document.createElement('div');
    forecastCard.className = 'p-4 bg-white bg-opacity-20 rounded-lg text-center';

    forecastCard.innerHTML = `
      <p class="font-bold">${day.date}</p>
      <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="Weather Icon" class="mx-auto">
      <p class="capitalize">${day.description}</p>
      <p class="font-medium">Temp: ${day.temp}°C</p>
      <p class="font-medium">Wind: ${day.wind} m/s</p>
      <p class="font-medium">Humidity: ${day.humidity}%</p>
    `;

    forecastDisplay.appendChild(forecastCard);
  });
}

// Helper function to process and group daily forecasts
function getDailyForecast(data) {
  const dailyForecast = {};

  data.list.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        date: date,
        temp: item.main.temp.toFixed(1),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        wind: item.wind.speed.toFixed(1),
        humidity: item.main.humidity
      };
    }
  });

  return Object.values(dailyForecast).slice(0, 5);
}

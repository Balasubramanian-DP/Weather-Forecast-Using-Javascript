
# Weather Forecast Application

A simple weather forecast application that allows users to search for current weather and a 5-day weather forecast for a given city or based on their current location. This app uses the **OpenWeatherMap API** to fetch weather data and displays it in a responsive and modern layout, styled using **Tailwind CSS**.

## Features
- Search weather by **city name**.
- Get the weather based on your **current location**.
- Displays current weather conditions such as **temperature**, **humidity**, and **wind speed**.
- 5-day weather forecast with data like **temperature**, **humidity**, **wind speed**, and weather **icons**.
- Responsive design for both **desktop** and **mobile** devices.

## Technologies Used
- **HTML**: Structure and content of the web pages.
- **CSS (Tailwind CSS)**: Styling the app with a modern, responsive design.
- **JavaScript**: Fetching data from the OpenWeatherMap API, handling user input, and dynamically updating the UI.
- **OpenWeatherMap API**: Used to fetch real-time weather data.

## Setup Instructions

### Prerequisites
1. You will need an **OpenWeatherMap API key**. You can get one by registering on [OpenWeatherMap](https://openweathermap.org/).
2. Make sure you have a text editor and a modern web browser for development and testing.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
```

### 2. Add Your API Key
- Replace the placeholder `YOUR_API_KEY` in the `script.js` file with your **OpenWeatherMap API key**.

```javascript
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
```

### 3. Open the Application
- Open the `index.html` file in your browser to view and test the app locally.

### 4. (Optional) Set Up a Local Server (For Advanced Users)
If you prefer to serve the app using a local server, you can use **Live Server** extension in Visual Studio Code or use any web server of your choice.

## Usage
1. **Search by City**: Type the name of a city in the input box and click "Search by City" to view current weather and 5-day forecast.
2. **Use Current Location**: Click the "Use Current Location" button to fetch weather data based on your geolocation.
3. **Weather Details**: The app displays:
   - Current weather (temperature, wind speed, humidity).
   - A 5-day forecast with weather icons and details.
4. **Responsive**: The app is responsive, so it will work on desktop, tablet, and mobile devices.

## Error Handling
- If an invalid city is entered or if the geolocation cannot be determined, the app will display an appropriate error message.

## Contributing
If you'd like to contribute to the project, feel free to fork the repository, make improvements, and submit a pull request. We welcome suggestions for new features or bug fixes.
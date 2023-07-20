// Date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

let currentTime = new Date();
let todayDayTime = document.querySelector("#current-day-time");
todayDayTime.innerHTML = formatDate(currentTime);

// Week 5
// In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function showCityData(response) {
  let cityName = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = cityName;

  celsiusTemperature = response.data.main.temp;

  let cityTemperature = Math.round(celsiusTemperature);
  let temperature = document.querySelector("#temperature-number");
  temperature.innerHTML = cityTemperature;

  //  <!-- if I change to °F and search another city it will changed automatically to °C. -->
  let celcSign = document.querySelector("#basic-temp-sign");
  celcSign.innerHTML = `°C`;
  let fahrSign = document.querySelector("#convert-temp-link");
  fahrSign.innerHTML = `°F`;

  let cityDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = cityDescription;

  let weatherPicture = response.data.weather[0].icon;
  let picture = document.querySelector("#weather-icon");
  picture.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherPicture}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "eeeac55847ebc465f9151518c7d7b9b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityData);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value; //input
  searchCity(cityInput);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", handleSubmit);

searchCity("Wexford");

// 🙀 Bonus point:
// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "eeeac55847ebc465f9151518c7d7b9b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityData);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", showCurrentCity);

// 🙀Bonus Feature Week 4
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function showCelsius() {
  let tempNumber = document.querySelector("#temperature-number");
  tempNumber.innerHTML = Math.round(celsiusTemperature);

  let celcSign = document.querySelector("#basic-temp-sign");
  celcSign.innerHTML = `°C`;
  let fahrSign = document.querySelector("#convert-temp-link");
  fahrSign.innerHTML = `°F`;
}

function showFahrenheit() {
  let convertedTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let tempNumber = document.querySelector("#temperature-number");
  tempNumber.innerHTML = convertedTemperature;

  let celcSign = document.querySelector("#basic-temp-sign");
  celcSign.innerHTML = `°F`;
  let fahrSign = document.querySelector("#convert-temp-link");
  fahrSign.innerHTML = `°C`;
}

function convertTemp(event) {
  event.preventDefault();
  clickCount++;

  if (clickCount % 2 === 0) {
    showCelsius();
  } else {
    showFahrenheit();
  }
}

let celsiusTemperature = null;
let convertLink = document.querySelector("#convert-temp-link");
let clickCount = 0;
convertLink.addEventListener("click", convertTemp);

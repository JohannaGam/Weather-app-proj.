function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;

  let windspeedElement = document.querySelector("#windspeed");
  let windspeed = response.data.wind.speed;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed}km/h`;
  descriptionElement.innerHTML = description;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `
    <img src="${response.data.condition.icon_url}" class="emoji" />
  `;
  console.log(response.data.condition.icon_url);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  return `${day} ${hours}:${minutes}`;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

function searchCity(city) {
  let apiKey = "a0fa4tbdafo43564612e4338dfba95b2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);

function getForecast(city) {
  let apiKey = "a0fa4tbdafo43564612e4338dfba95b2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeForecast);
}

function changeForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
      <div class="forecast-day">${day}</div>
    <div class = "forecast-icon"><img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png"
      alt=""
      width="50"
    /></div>
    <div class="forecast-temperature">
      <span class="temp-max">20° </span>
      <span class="temp-min"> 10°</span>
    </div>
    </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Vienna");

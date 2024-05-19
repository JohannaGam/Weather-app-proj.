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
}

function formatDate(date) {
  let minutes = date.getMinutes();
  console.log(minutes);
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

searchCity("Vienna");

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

  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed}km/h`;
  descriptionElement.innerHTML = description;
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

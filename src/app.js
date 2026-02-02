function adjustHeaderSize(cityName, header) {
  let inputSplit = cityName;
  console.log(inputSplit);
  let inputLetterCount = inputSplit.length;
  console.log(inputLetterCount);

  if (inputLetterCount >= 10) {
    header.classList.add(`smallerFont`);
    if (inputLetterCount >= 16) {
      header.classList.add(`smallestFont`);
    }
  } else {
    header.classList.remove(`smallerFont`);
    header.classList.remove(`smallestFont`);
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  console.log(date);
  let time = `${hours}:${minutes}`;
  return time;
}

function changeDisplay(response) {
  console.log(response.data);

  let h1 = document.querySelector("h1");
  let temperature = document.querySelector("#degrees");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#weather-icon");
  let mainDay = document.querySelector("#mainDay");
  let mainTime = document.querySelector("#mainTime");
  let weatherDescription = document.querySelector("#weather-description");

  h1.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed * 10) / 10}km/h`;
  console.log(response.data.condition.icon_url);
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="main weather icon" class="mainEmoji">`;
  mainDay.innerHTML = `${formatDay(response.data.time)}day`;
  mainTime.innerHTML = `${formatTime(response.data.time)}`;
  weatherDescription.innerHTML = response.data.condition.description;

  adjustHeaderSize(response.data.city, h1);
}

function displayForecast(response) {
  let days = ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = ``;
  let iconUrl = response.data.daily[0].condition.icon_url;
  console.log(iconUrl);

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-flexbox">
  <div class="day">
      <div class="forecast-day figTree">${formatDay(day.time)}</div>
   <img src="${day.condition.icon_url}" alt="weather icons" class="emoji">
    <div class="forecast-temperatures">
        <span class="temp-max">${Math.round(day.temperature.maximum)}°</span><span class="temp-min">${Math.round(day.temperature.minimum)}°</span>
    </div>
    </div>
  </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiForecastKey = `033479d334coa33b0517ta6857d46eaf`;
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiForecastKey}`;
  console.log(apiForecastUrl);
  axios.get(apiForecastUrl).then(displayForecast);
}

function getWeather(city) {
  let apiKey = `033479d334coa33b0517ta6857d46eaf`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(changeDisplay);
}

function userSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  getWeather(cityInput.value);
  getForecast(cityInput.value);
}

getWeather("Paris");
getForecast("Paris");
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", userSubmit);

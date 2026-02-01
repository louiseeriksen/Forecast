function changeDisplay(response) {
  console.log(response.data);

  let h1 = document.querySelector("h1");
  let temperature = document.querySelector("#degrees");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  h1.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed * 10) / 10}km/h`;

  let inputSplit = response.data.city.split(``);
  console.log(inputSplit);
  let inputLetterCount = inputSplit.length;
  console.log(inputLetterCount);

  if (inputLetterCount >= 10) {
    h1.classList.add(`smallerFont`);
  } else {
    h1.classList.remove(`smallerFont`);
  }
}

function userSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);

  let apiKey = `033479d334coa33b0517ta6857d46eaf`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}`;
  axios.get(apiUrl).then(changeDisplay);
}

function displayForecast() {
  let days = ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = ``;

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-flexbox">
  <div class="day">
      <div class="forecast-day figTree">${day}</div>
   <div class="emoji">🌥️</div>
    <div class="forecast-temperature">
        <span class="head-temp">21°</span><span>12°</span>
    </div>
    </div>
  </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", userSubmit);
displayForecast();

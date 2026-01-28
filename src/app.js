function ChangeInfo(response) {
  console.log(response.data);

  let h1 = document.querySelector("h1");
  let temperature = document.querySelector("#degrees");

  h1.innerHTML = response.data.city;
  temperature.innerHTML = response.data.temperature.current;
}

function userSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  axios.get(apiUrl).then(ChangeInfo);
}

let apiKey = `033479d334coa33b0517ta6857d46eaf`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}`;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", userSubmit);

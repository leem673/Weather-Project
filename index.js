function showDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let hoursFormat = hours.toString().padStart(2, "0");
  let minutes = now.getMinutes();
  let minutesFormat = minutes.toString().padStart(2, "0");
  let liveDateTime = document.querySelector(".date-time");
  liveDateTime.innerHTML = `${day} ${hoursFormat}:${minutesFormat}`;
}
showDateTime();

function displayWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".high-degrees").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low-degrees").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let displayCity = document.querySelector("#city-form");
displayCity.addEventListener("submit", handleSubmit);

function switchHighCelsius() {
  let highCelsiusTemp = document.querySelector(".high-degrees");
  let highCelsius = highCelsiusTemp.innerHTML;
  highCelsiusTemp.innerHTML = Math.round((5 / 9) * (highCelsius - 32));
}
let showHighCelsius = document.querySelector(".high-celsius");
showHighCelsius.addEventListener("click", switchHighCelsius);

function switchLowCelsius() {
  let lowCelsiusTemp = document.querySelector(".low-degrees");
  let lowCelsius = lowCelsiusTemp.innerHTML;
  lowCelsiusTemp.innerHTML = Math.round((5 / 9) * (lowCelsius - 32));
}
let showLowCelsius = document.querySelector(".low-celsius");
showLowCelsius.addEventListener("click", switchLowCelsius);

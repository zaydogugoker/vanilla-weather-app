let now = new Date();
let h2 = document.querySelector("h2");

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
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;

///////////////////////////

function getCity(event) {
  let cityInput = document.querySelector("#form1");
  event.preventDefault();
  getTemparature(cityInput.value);
}

function getTemparature(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5bbb701eea5355bfe05de5f48cfd3289&units=metric`;
  axios.get(apiUrl).then(showTemparature);
}

function showTemparature(response) {
  console.log(response);
  let h3 = document.querySelector("h3");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  let description = document.querySelector("#weather");
  let city = document.querySelector("h1");
  h3.innerHTML = `${Math.round(response.data.main.temp)}°`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  description.innerHTML = response.data.weather[0].main;
  city.innerHTML = `${response.data.name},${response.data.sys.country}`;
}

let cityName = document.querySelector("#form-info");
cityName.addEventListener("submit", getCity);
getTemparature("Amsterdam");

///////////////////////////

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5bbb701eea5355bfe05de5f48cfd3289&lang=en&units=metric`;
  axios.get(geoApi).then(showTemparature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentIcon = document.querySelector("#icon");
currentIcon.addEventListener("click", getCurrentPosition);

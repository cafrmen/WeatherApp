//Shows the actual time
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
      if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `Last update, ${day} ${hours}:${minutes}`
}

//Shows the actual weather data of the default city
function showTemperature(response) {
  //console.log(response.data);
    let city = response.data.name;
    let country = response.data.sys.country;
    let cityCountry = document.querySelector("h2");
    cityCountry.innerHTML = `${city}, ${country}.`;
    
    let description = document.querySelector("h5");
    description.innerHTML = response.data.weather[0].description;
  
    let icon = document.querySelector("#img");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);

    let temperature = document.querySelector("#temperature");
    //Here is where the null variable enter
    celsiusTemperature = response.data.main.temp;
    temperature.innerHTML = Math.round(celsiusTemperature);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let wind = document.querySelector("#windSpeed");
    wind.innerHTML = Math.round(response.data.wind.speed);

    let date = document.querySelector("h4");
    date.innerHTML = formatDate(response.data.dt * 1000);
}

//Searching engine

function search(city) {
  let apiKey = "a899961427dc9d3ac320aeea78474c0d";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(showTemperature);
}

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  search(cityInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#searchEngine");
form.addEventListener("submit", searchInput);

//This is for the C/F links
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

//This is for the current location button
function searchLocation(position) {
  let apiKey = "a899961427dc9d3ac320aeea78474c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Default city
search("Mexico City");
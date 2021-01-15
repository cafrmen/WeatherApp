//This changes the name of the current city
function currentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#typeCity");

 let apiKey = "a899961427dc9d3ac320aeea78474c0d";
let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}`;

      function showTemperature(response) {
        console.log(response);

        let temperature = Math.round(response.data.main.temp);
        console.log(temperature);

        let ciudad = (response.data.sys.country);
        console.log(ciudad);

        let h2 = document.querySelector("h2");
  if (cityInput.value) {
    h2.innerHTML = `${cityInput.value}, ${ciudad}.`;
  } 

        let h3 = document.querySelector("#currentTemperature");
        h3.innerHTML = `${temperature} °C`;

        //change weather description
        let weatherDescription = (response.data.weather[0].description);
        let description = document.querySelector("#description");
        description.innerHTML = `${weatherDescription}`;
        
        console.log(weatherDescription);

        //change humidity
        let currentHumidity = (response.data.main.humidity);
        let humid = document.querySelector("#humidity");
        humid.innerHTML = `Humidity: ${currentHumidity}%`;
        
        console.log(currentHumidity);

        //change wind speed
        let currentWind = Math.round(response.data.wind.speed);
        let wind = document.querySelector("#windSpeed");
        wind.innerHTML = `Wind Speed: ${currentWind} km/h`;
        
        console.log(currentWind);
      }

      axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

}

let form = document.querySelector("#searchCity");
form.addEventListener("submit", currentCity);

//This is the current location botton
function currentLocationButton(event) {
  event.preventDefault();
  function showTemperature(response) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `Actual temperature (nothing more)`;

        let temperature = Math.round(response.data.main.temp);
        let h3 = document.querySelector("#currentTemperature");
        h3.innerHTML = `${temperature} °C`;
      }

      function showPosition(position) {
        console.log(position);
        let lat = position.coords.latitude;
        console.log(lat);
        let long = position.coords.longitude;
        console.log(long);

        let apiKey = "a899961427dc9d3ac320aeea78474c0d";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
        console.log(apiUrl);

        axios.get(apiUrl).then(showTemperature);
      }

      navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", currentLocationButton);

//This is for the current day & hour
let currentTime = new Date();
let h4 = document.querySelector("h4");

let days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"] 
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h4.innerHTML = `${day} ${hour}:${minutes}`;
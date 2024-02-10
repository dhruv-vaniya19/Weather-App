const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("button");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
  const api_key = "1ca6941a9a136fb7e8993f353e87a7b5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  console.log(weather_data);

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");

    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity} %`;

  wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weatherImg.src = "/Assets/cloud.png";
      break;

    case "Clear":
      weatherImg.src = "/Assets/clear.png";
      break;

    case "Rain":
      weatherImg.src = "/Assets/rain.png";
      break;

    case "Mist":
      weatherImg.src = "/Assets/mist.png";
      break;

    case "Snow":
      weatherImg.src = "/Assets/snow.png";
      break;
  }

}



searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

const API_KEY = "66f5ace1e16bcd03e0b960f49c10a9d2";
const input = document.getElementById("search");
const button = document.getElementById("submitButton");
const weatherCard = document.getElementById("content");
button.addEventListener("click", function () {
  getWeather();
});

async function getWeather() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + input.value +
      "&appid=66f5ace1e16bcd03e0b960f49c10a9d2&units=metric",
  );
  if (response.status === 404) {
    alert("City not found");
    return;
  }
  const data = await response.json();
  console.log(data);
  weatherCard.innerHTML = "";
  weatherCard.style.border = "2px solid black";

  const cityName = data.name;
  const city = document.createElement("h1");
  city.textContent = cityName;
  weatherCard.appendChild(city);

  const icon = data.weather[0].icon;
  const iconImg = document.createElement("img");
  iconImg.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  weatherCard.appendChild(iconImg);

  const description = data.weather[0].description;
  const weatherDescription = document.createElement("p");
  weatherDescription.textContent = description;
  weatherCard.appendChild(weatherDescription);

  const temp = data.main.temp;
  const temperature = document.createElement("p");
  temperature.textContent = temp + "°C";
  weatherCard.appendChild(temperature);
  if (temp > 15) {
    weatherCard.style.background = "rgb(233,148,0)";
    weatherCard.style.background =
      "linear-gradient(0deg, rgba(233,148,0,1) 0%, rgba(255,255,255,1) 100%)";
    // let audio1 = new Audio("./sounds/audio1.mp3");
    // audio1.play();
  } else if (temp < 10) {
    weatherCard.style.background = "rgb(0,13,170)";
    weatherCard.style.background =
      "linear-gradient(0deg, rgba(0,13,170,1) 0%, rgba(255,255,255,1) 100%)";
    // let audio1 = new Audio("./sounds/audio1.mp3");
    // audio1.play();
  } else {
    weatherCard.style.backgroundColor = "white";
  }
  const wind = data.wind.speed;
  const windSpeed = document.createElement("p");
  windSpeed.textContent = "Wind: " + wind + "m/s";
  weatherCard.appendChild(windSpeed);
}

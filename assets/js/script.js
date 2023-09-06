const form = document.querySelector("form");
const apiKey = "1bebb0f7f9034991b1622653230309";
const toggle = document.querySelector("#toggle");
let tempSymbol = "°C";

const fetchData = async (searchLocation) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=1&aqi=no`
    );
    return await response.json();
  } catch (error) {
    throw new Error("Please input a valid location");
  }
};

const extractData = (responseData) => {
  const data = {
    condition: responseData.current.condition.text,
    locationName: responseData.location.name,
    locationRegion: responseData.location.region,
    currentTempC: responseData.current.temp_c,
    feelsLikeC: responseData.current.feelslike_c,
    currentTempF: responseData.current.temp_f,
    feelsLikeF: responseData.current.feelslike_f,
    currentHumidity: responseData.current.humidity,
    chanceOfRain: responseData.forecast.forecastday[0].day.daily_chance_of_rain,
    weatherIcon: responseData.current.condition.icon,
    windSpeedKph: responseData.current.wind_kph,
    windSpeedMph: responseData.current.wind_mph,
  };
  return data;
};

const displayData = (data) => {
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");
  const date = document.querySelector("#date");
  const time = document.querySelector("#time");
  const icon = document.querySelector("#icon");
  const humidity = document.querySelector("#humidity");
  const chanceOfRain = document.querySelector("#rain-chance");

  condition.textContent = data.condition;
  location.textContent = `${data.locationName}, ${data.locationRegion}`;
  date.textContent = new Date().toDateString();
  time.textContent = new Date().toLocaleTimeString();
  icon.src = data.weatherIcon;
  humidity.textContent = `${data.currentHumidity}%`;
  chanceOfRain.textContent = `${data.chanceOfRain}%`;

  displayToggleableData(data);
  displayImage();
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const loadingGif = document.querySelector(".loading.hidden");
  const location = document.querySelector("input").value;

  try {
    form.reset();
    loadingGif.classList.toggle("hidden");
    const responseData = await fetchData(location);
    const data = extractData(responseData);
    displayData(data);
  } catch (error) {
    alert("please enter a valid location!");
  } finally {
    loadingGif.classList.toggle("hidden");
  }
};

form.addEventListener("submit", (e) => handleSubmit(e));

const handleToggleClick = async () => {
  tempSymbol = toggleSymbols();
  const location = document.querySelector("#location").textContent;
  const responseData = await fetchData(location);
  const data = extractData(responseData);
  displayToggleableData(data);
};

const displayToggleableData = (data) => {
  const temp = document.querySelector("#temp");
  const windSpeed = document.querySelector("#wind-speed");
  if (tempSymbol == "°C") {
    temp.textContent = `${data.currentTempC}${tempSymbol} feels like ${data.feelsLikeC}${tempSymbol}`;
    windSpeed.textContent = `${data.windSpeedKph}km/h`;
  } else {
    temp.textContent = `${data.currentTempF}${tempSymbol} feels like ${data.feelsLikeF}${tempSymbol}`;
    windSpeed.textContent = `${data.windSpeedMph}mi/h`;
  }
};

const toggleSymbols = () => (tempSymbol === "°C" ? "℉" : "°C");

toggle.addEventListener("click", handleToggleClick);

(async () => {
  try {
    const initialData = await fetchData('cabarroguis');
    const data = extractData(initialData);
    displayData(data);
  } catch (error) {
    alert("please enter a valid location!");
  }
})();

const displayImage = () => {
  const weatherConditionQuery =
    document.querySelector("#condition").textContent;
  fetch(
    `https://api.unsplash.com/search/photos?client_id=KiZqmkfKihIE9mgzFSXGRZA9ye-lTFOGsOmlIsQGfEM&query=${weatherConditionQuery}&orientation=landscape`,
    { method: "GET", mode: "cors" }
  )
    .then((response) => response.json())
    .then((responseData) => (imageUrl = responseData.results[0].urls.regular))
    .then((url) => {
      setImageAsBackground(url)
      setFooterLink(url)
    }
    );
    // setImageAsBackground('https://images.unsplash.com/photo-1597621864521-93dfdb10c6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1930&q=80')
    // setFooterLink('https://images.unsplash.com/photo-1597621864521-93dfdb10c6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1930&q=80')
  // (
};

const setImageAsBackground = (imageUrl) => {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
};

const setFooterLink = (photoLink) =>{
  const unsplashLink = document.querySelector('a') 
  unsplashLink.href = `${photoLink}`
}

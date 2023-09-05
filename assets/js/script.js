const form = document.querySelector("form");
const apiKey = "1bebb0f7f9034991b1622653230309";

//   try {
//     const response = await fetch(
//       `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=1&aqi=no`
//     );
//     const responseData = await response.json();
//     let data = {
//       condition: responseData.current.condition.text,
//       locationName: responseData.location.name,
//       locationRegion: responseData.location.region,
//       currentTempC: responseData.current.temp_c,
//       feelsLikeC: responseData.current.feelslike_c,
//       currentTempF: responseData.current.temp_f,
//       feelsLikeF: responseData.current.feelslike_f,
//       currentHumidity: responseData.current.humidity,
//       chanceOfRain:
//         responseData.forecast.forecastday[0].day.daily_chance_of_rain,
//       weatherIcon: responseData.current.condition.icon,
//       windSpeedKph: responseData.current.wind_kph,
//       windSpeedMph: responseData.current.wind_mph,
//     };
//     return data;
//   } catch (error) {
//     alert("Please input a valid location");
//   }
// };
const fetchData = async (searchLocation = "cabarroguis") => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=1&aqi=no`
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
  const temp = document.querySelector("#temp");
  const icon = document.querySelector("#icon");
  const tempSymbol = "°C";

  condition.textContent = data.condition;
  location.textContent = `${data.locationName}, ${data.locationRegion}`;
  date.textContent = new Date().toDateString();
  time.textContent = new Date().toLocaleTimeString();
  temp.textContent = `${data.currentTempC}${tempSymbol} feels like ${data.feelsLikeC}${tempSymbol}`;
  icon.src = data.weatherIcon;
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
(async () => {
  try {
    const initialData = await fetchData();
    const data = extractData(initialData);
    displayData(data);
  } catch (error) {
    alert("please enter a valid location!");
  }
})();

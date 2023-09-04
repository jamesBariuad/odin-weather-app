const apiKey = "1bebb0f7f9034991b1622653230309";

const getData = async () => {
  let location = "cabarroguis";
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no`
  );
  const responseData = await response.json();
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

const displayData = async (neededData) => {
  const data = await neededData;
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");
  const date = document.querySelector("#date");
  const time = document.querySelector("#time");
  const temp = document.querySelector("#temp");
  const icon = document.querySelector("#icon");
  let tempSymbol = "°C";

  condition.textContent = data.condition;
  location.textContent = `${data.locationName}, ${data.locationRegion}`;
  date.textContent = new Date().toDateString();
  time.textContent = new Date().toLocaleTimeString();
  temp.textContent = `${data.currentTempC}${tempSymbol} feels like ${data.feelsLikeC}${tempSymbol}`;
  icon.src = data.weatherIcon;
};

displayData(getData());

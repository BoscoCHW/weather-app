import axios from "axios";

export const fetchCurrentWeather = async (city: string) => {
  const API_KEY = "";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const response = await axios.get(url);
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    visibility,
    wind,
    sys,
    name,
  } = response.data;

  return {
    weather: weather[0],
    main: {
      temp: temp - 273.15,
      feels_like: feels_like - 273.15,
      temp_min: temp_min - 273.15,
      temp_max: temp_max - 273.15,
      pressure,
      humidity,
    },
    visibility,
    wind,
    sys,
    name,
  };
};

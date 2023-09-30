import axios from "axios";
import { kelvinToCelcius } from "./math";

const API_KEY = "";

export const fetchCurrentWeather = async (city: string) => {
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
      temp: kelvinToCelcius(temp),
      feels_like: kelvinToCelcius(feels_like),
      temp_min: kelvinToCelcius(temp_min),
      temp_max: kelvinToCelcius(temp_max),
      pressure,
      humidity,
    },
    visibility,
    wind,
    sys,
    name,
  };
};

export const fetchForecastWeather = async (city: string) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  const response = await axios.get(url);
  const { list } = response.data;

  return list;
};

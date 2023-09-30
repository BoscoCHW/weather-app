import axios from 'axios';

export const fetchCurrentWeather = async (city: string) => {
  const API_KEY = '';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

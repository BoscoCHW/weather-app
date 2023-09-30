import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCurrentWeather } from '../utils/api';

interface RouteParams {
  cityName?: string;
}

const CityDetails: React.FC = () => {
  const { cityName } = useParams() as any;
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    // Fetch detailed weather data using OpenWeatherMap API
    // Note: Replace YOUR_API_KEY with your actual OpenWeatherMap API key
    const fetchData = async () => {
      try {
        const response = await fetchCurrentWeather(cityName);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  // Check if data is still loading
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{cityName}</h1>
      {/* Display detailed weather data here using weatherData state */}
    </div>
  );
};

export default CityDetails;

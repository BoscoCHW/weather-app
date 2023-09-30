import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Accordion } from 'react-bootstrap';
import { fetchCurrentWeather } from '../utils/api';

type RouteParams = {
  cityName: string;
}

const CityDetails: React.FC = () => {
  const { cityName } = useParams<RouteParams>() as any;
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    // Fetch detailed weather data using OpenWeatherMap API
    // Note: Replace YOUR_API_KEY with your actual OpenWeatherMap API key
    const fetchData = async () => {
      if (!cityName) return;
      try {
        const data = await fetchCurrentWeather(cityName);
        setWeatherData(data);
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

  const { name, main, weather, wind, clouds, visibility, sys } = weatherData;
  const [currentWeather] = weather;

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>{cityName}</h1>
      </div>

      <Card>
        <Card.Body>
          <Card.Title>Current Weather</Card.Title>
          <Card.Text>Temperature: {main.temp}</Card.Text>
          <Card.Text>Feels Like: {main.feels_like}</Card.Text>
          <Card.Text>Condition: {currentWeather.description}</Card.Text>
        </Card.Body>
      </Card>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Wind</Accordion.Header>
          <Accordion.Body>
            Wind Speed: {wind.speed}, Direction: {wind.deg}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Clouds</Accordion.Header>
          <Accordion.Body>
            Cloudiness: {clouds.all}%
          </Accordion.Body>
        </Accordion.Item>

        {/* You can add more accordions for visibility, pressure, humidity, etc. */}
      </Accordion>
    </div>
  );
};

export default CityDetails;

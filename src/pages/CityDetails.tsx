import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Accordion, Container } from "react-bootstrap";
import { fetchCurrentWeather, fetchForecastWeather } from "../utils/api";
import { useTemperature } from "../TemperatureContext";
import { celciusToFahrenheit, kelvinToCelcius } from "../utils/math";

type RouteParams = {
  cityName: string;
};

const CityDetails: React.FC = () => {
  const { cityName } = useParams<RouteParams>() as any;
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const { unit } = useTemperature();

  useEffect(() => {
    const fetchData = async () => {
      if (!cityName) return;
      try {
        const data = await fetchCurrentWeather(cityName);
        setWeatherData(data);
        const forecastData = await fetchForecastWeather(cityName);
        setForecastData(forecastData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  // Check if data is still loading
  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather, wind, sys, visibility } = weatherData;

  return (
    <Container>
      <div className="text-center m-4">
        <h1>{`${name}, ${sys.country}`}</h1>
      </div>

      <Card>
        <Card.Body>
          <Card.Title>Current Weather</Card.Title>
          <div className="d-flex flex-wrap">
            <Card.Body>
              <Card.Subtitle>Temperatures</Card.Subtitle>
              <div>
                Temperature:{" "}
                {unit === "C"
                  ? main.temp.toFixed(1)
                  : celciusToFahrenheit(main.temp).toFixed(1)}
              </div>
              <div>
                Feels Like:{" "}
                {unit === "C"
                  ? main.temp.toFixed(1)
                  : celciusToFahrenheit(main.temp).toFixed(1)}
              </div>
              <div>Condition: {weather.description}</div>
            </Card.Body>

            <Card.Body>
              <Card.Subtitle>Visibility</Card.Subtitle>
              <div>{visibility}</div>
            </Card.Body>

            <Card.Body>
              <Card.Subtitle>Sunrise/Sunset</Card.Subtitle>
              <div>
                {`Sunrise: ${new Date(sys.sunrise * 1000).toTimeString()}`},
              </div>
              <div>
                {`Sunset: ${new Date(sys.sunset * 1000).toTimeString()}`}
              </div>
            </Card.Body>
          </div>
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
          <Accordion.Header>Forecasts 3-hour / 5 day</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex flex-wrap gap-3">
              {forecastData.map((data: any) => {
                return (
                  <Card>
                    <Card.Body>
                      <Card.Title>{data.dt_txt}</Card.Title>
                      <Card.Text>
                        <div>{`Temperature: ${
                          unit === "C"
                            ? kelvinToCelcius(data.main.temp).toFixed(1)
                            : celciusToFahrenheit(
                                kelvinToCelcius(data.main.temp)
                              ).toFixed(1)
                        }°${unit === "C" ? "C" : "F"}`}</div>
                        <div>{`Condition: ${data.weather[0].description}`}</div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default CityDetails;

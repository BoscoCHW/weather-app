import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../utils/api";
import CityCard from "../components/CityCard";
import SearchPopup from "../components/SearchPopup";
import { CITIES } from "../constants";
import { Container } from "react-bootstrap";

const Dashboard: React.FC = () => {
  const [displayedCities] = useState<string[]>(
    CITIES.map((c) => c.toLowerCase())
  );
  const [allWeatherData, setAllWeatherData] = useState<any[]>([]);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchDisplayedCities = async () => {
      const allData = await Promise.all(
        displayedCities.map((city) => fetchCurrentWeather(city))
      );
      setAllWeatherData((prev) => [...prev, ...allData]);
    };

    fetchDisplayedCities();
  }, [displayedCities]);

  const toggleFavorite = (cityName: string) => {
    setFavoriteCities((prev) => {
      if (prev.includes(cityName)) {
        return prev.filter((city) => city !== cityName);
      } else {
        return [...prev, cityName];
      }
    });
  };

  const cityToCard = (city: string, index: number) => {
    const weatherData = allWeatherData.find(
      (data) => data.name.toLowerCase() === city
    );
    if (!weatherData) return null;
    return (
      <div key={index}>
        <CityCard
          cityName={weatherData.name}
          temperature={weatherData.main.temp}
          condition={weatherData.weather[0].description}
          isFavorite={favoriteCities.includes(city)}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    );
  };

  const handleSearch = async (query: string) => {
    // Perform the API call to search for the city and update `searchResults`.
    try {
      const data = await fetchCurrentWeather(query);
      setAllWeatherData((prev) => [...prev, data]);
      const cityCard = (
        <CityCard
          cityName={data.name}
          temperature={data.main.temp}
          condition={data.weather[0].description}
          isFavorite={favoriteCities.includes(data.name.toLowerCase())}
          onToggleFavorite={toggleFavorite}
        />
      );
      setSearchResults([cityCard]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Container>
      <div className="text-center mt-5">
        <h1>Weather Dashboard</h1>
      </div>

      <div className="text-end">
        <button
          className="btn btn-link p-3 fs-3"
          onClick={() => setShowSearchPopup(true)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>

      <div className="mb-5">
        <h2>Favourite Cities</h2>
        <div className="d-flex flex-wrap justify-content-start gap-3">
          {favoriteCities.length === 0
            ? `You don't have any favorite city.`
            : favoriteCities.map(cityToCard)}
        </div>
      </div>

      <div>
        <h2>Explore</h2>
        <div className="d-flex flex-wrap justify-content-start gap-3">
          {displayedCities
            .filter((c) => !favoriteCities.includes(c))
            .map(cityToCard)}
        </div>
      </div>

      <SearchPopup
        show={showSearchPopup}
        onHide={() => setShowSearchPopup(false)}
        onSearch={handleSearch}
        cityCards={searchResults.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      />
    </Container>
  );
};

export default Dashboard;

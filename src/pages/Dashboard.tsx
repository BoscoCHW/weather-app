import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../utils/api";
import CityCard from "../components/CityCard";
import SearchPopup from "../components/SearchPopup";
import { CITIES } from "../constants";

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
      setAllWeatherData(prev => [...prev, ...allData]);
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

  const handleSearch = async (query: string) => {
    // Perform the API call to search for the city and update `searchResults`.
    const data = await fetchCurrentWeather(query);
    setAllWeatherData((prev) => [...prev, data]);
    const cityCard = (
      <CityCard
        cityName={data.name}
        temperature={data.main.temp}
        description={data.weather[0].description}
        isFavorite={favoriteCities.includes(data.name.toLowerCase())}
        onToggleFavorite={toggleFavorite}
      />
    );
    setSearchResults((prev) => [...prev, cityCard]);
  };

  return (
    <div className="p-3">
      <div className="text-center">
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

      <div>
        <h2>Favourite Cities</h2>
        <div className="d-flex flex-wrap justify-content-start gap-3">
          {favoriteCities.length <= allWeatherData.length &&
            favoriteCities.map((city, index) => {
              const weatherData = allWeatherData.find(
                (data) => data.name.toLowerCase() === city
              );
              return (
                <div key={index}>
                  <CityCard
                    cityName={weatherData.name}
                    temperature={weatherData.main.temp}
                    description={weatherData.weather[0].description}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <h2>Explore</h2>
        <div className="d-flex flex-wrap justify-content-start gap-3">
          {displayedCities.length <= allWeatherData.length &&
            displayedCities
              .filter((c) => !favoriteCities.includes(c))
              .map((city, index) => {
                const weatherData = allWeatherData.find(
                  (data) => data.name.toLowerCase() === city
                );
                return (
                  <div key={index}>
                    <CityCard
                      cityName={weatherData.name}
                      temperature={weatherData.main.temp}
                      description={weatherData.weather[0].description}
                      isFavorite={false}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                );
              })}
        </div>
      </div>

      
      <SearchPopup
        show={showSearchPopup}
        onHide={() => setShowSearchPopup(false)}
        onSearch={handleSearch}
        cityCards={searchResults.map((result, index) => (<div key={index}>{result}</div>))}
      />
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useTemperature } from "../TemperatureContext";
import { celciusToFahrenheit } from "../utils/math";

interface CityCardProps {
  cityName: string;
  country: string;
  temperature: number;
  condition: string;
  isFavorite: boolean;
  onToggleFavorite: (cityName: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({
  cityName,
  country,
  temperature,
  condition,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/city/${cityName}`);
  };
  const { unit } = useTemperature();
  const displayTemperature =
    unit === "C" ? temperature : celciusToFahrenheit(temperature);

  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title
          onClick={goToDetails}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            cursor: isHovered ? "pointer" : "initial",
            color: isHovered ? "blue" : "black",
          }}
        >
          {`${cityName}, ${country}`}
        </Card.Title>
        <Card.Text>
          <div>{`Temperature: ${displayTemperature.toFixed(1)}°${
            unit === "C" ? "C" : "F"
          }`}</div>
          <div>{`Condition: ${condition}`}</div>
        </Card.Text>

        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={() => onToggleFavorite(cityName.toLowerCase())}
        >
          {isFavorite ? "Remove from Favourite" : "Add to Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CityCard;

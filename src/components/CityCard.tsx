import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';

interface CityCardProps {
  cityName: string;
  temperature: number;
  description: string;
  isFavorite: boolean;
  onToggleFavorite: (cityName: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({
  cityName,
  temperature,
  description,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/city/${cityName}`);
  };

  const makeDescription = (temperature: number, description: string) =>
    `Temperature: ${temperature}°\nCondition: ${description}`;
  return (
    <Card onClick={goToDetails} style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>{cityName}</Card.Title>
        <Card.Text>
          <pre>{makeDescription(temperature, description)}</pre>
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

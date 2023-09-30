import React from "react";
import { Navbar, Container } from "react-bootstrap";

const BrandBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Weather App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default BrandBar;

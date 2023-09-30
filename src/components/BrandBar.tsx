import React from "react";
import { Navbar, Container } from "react-bootstrap";

const BrandBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Weather App</Navbar.Brand>
        {/* You can add more navigation links here if needed */}
      </Container>
    </Navbar>
  );
};

export default BrandBar;

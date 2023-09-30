import React from "react";
import { Navbar, Container } from "react-bootstrap";
import {SwitchButton} from './SwitchButton';

const BrandBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Weather App</Navbar.Brand>
        <SwitchButton />
      </Container>
    </Navbar>
  );
};

export default BrandBar;

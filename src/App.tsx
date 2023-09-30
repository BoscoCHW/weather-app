import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetails from "./pages/CityDetails";
import BrandBar from "./components/BrandBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrandBar />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/city/:cityName" element={<CityDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

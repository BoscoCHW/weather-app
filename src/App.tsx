import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CityDetails from './pages/CityDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/city/:cityName" element={<CityDetails />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};


export default App;

import React, { createContext, useState, useContext } from 'react';

interface TemperatureContextProps {
  unit: 'C' | 'F';
  toggleUnit: () => void;
}

const TemperatureContext = createContext<TemperatureContextProps | undefined>(undefined);

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};

interface TemperatureProviderProps {
  children: React.ReactNode;
}

export const TemperatureProvider: React.FC<TemperatureProviderProps> = ({ children }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

# Weather Dashboard

## Overview

This is a single-page application that allows users to view the current weather in various cities and save their favorite cities for quick access. Built with React.js, TypeScript, and Bootstrap.

## Features

- Search for cities and view current weather conditions.
- Save favorite cities for easy access.
- Click on a city to view detailed weather information, including 3-hour/5-day forecasts, wind, rain, and more.
- Toggle between Fahrenheit and Celsius.

## Prerequisites

- Node.js >= 14.x
- Yarn >= 1.22.x

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   ```

2. Navigate to the project folder:
   ```bash
   cd weather-dashboard
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Configuration

1. Create a \`.env\` file in the project root.
2. Add your OpenWeatherMap API Key:
   ```
   REACT_APP_OPEN_WEATHER_API_KEY=your_api_key_here
   ```

## Running the Development Server

To start the development server:

```bash
yarn start
```

This will open a new browser window pointing to \`http://localhost:3000/\`.

## Assumptions

- The OpenWeatherMap API Key is confidential and should not be exposed. Therefore, it's stored as an environment variable.
- The app is optimized for the latest versions of Chrome, Firefox, and Safari. Compatibility with Internet Explorer is not guaranteed.
- The app is made during a time constraint so the code might not be in its most optimized form. 
  
## Additional Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Bootstrap](https://react-bootstrap.github.io/) for styling components.

import { createContext, useState } from 'react';

const WeatherContext = createContext(undefined);

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({
    current: {
      feels_like: 0,
      temp: 0,
      weather: [{ icon: '01d', description: '--' }],
    },
    daily: [],
  });

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };

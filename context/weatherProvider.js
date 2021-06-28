/* eslint-disable react/jsx-filename-extension */
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WeatherContext = createContext(undefined);

const WeatherProvider = ({ children }) => {
  const [theme, setTheme] = useState('cold');
  const [weatherData, setWeatherData] = useState({
    current: {
      weather: { icon: '01d', description: '--' },
    },
    daily: [],
  });

  useEffect(() => {
    if (weatherData.current?.temp <= 15) setTheme('cold');
    else if (weatherData.current?.temp <= 27) setTheme('mild');
    else if (weatherData.current?.temp > 27) setTheme('hot');
  }, [weatherData.current?.temp]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        theme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { WeatherProvider, WeatherContext };

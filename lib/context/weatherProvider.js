/* eslint-disable react/jsx-filename-extension */
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { LocationContext } from './locationProvider';
import { getWeather } from '../api';

const WeatherContext = createContext(undefined);

const WeatherProvider = ({ children }) => {
  const [theme, setTheme] = useState('cold');
  const [weatherData, setWeatherData] = useState({});
  // Update weather on location change
  const {
    location: { latitude, longitude },
  } = useContext(LocationContext);
  useEffect(() => {
    (async () => {
      if (latitude !== 0 && longitude !== 0) {
        const weather = await getWeather(latitude, longitude);
        weather !== 0 && setWeatherData(weather);
      }
    })();
  }, [latitude, longitude]);
  // Update theme based on temp
  useEffect(() => {
    if (weatherData.current?.temp <= 15) setTheme('cold');
    else if (weatherData.current?.temp <= 27) setTheme('mild');
    else if (weatherData.current?.temp > 27) setTheme('hot');
  }, [weatherData.current?.temp]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
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

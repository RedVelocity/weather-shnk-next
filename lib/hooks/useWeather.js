import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { getWeather } from '../api';
import useWeatherStore from '../store/useWeatherStore';
import useLocation from './useLocation';

const useWeather = () => {
  const weatherData = useWeatherStore((state) => state.weatherData, shallow);
  const theme = useWeatherStore((state) => state.theme);
  const setTheme = useWeatherStore((state) => state.setTheme);
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const {
    location: { latitude, longitude },
  } = useLocation();

  // Update weather on location change
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
    if (weatherData.current?.temp <= 15) setTheme('cool');
    else if (weatherData.current?.temp <= 27) setTheme('mild');
    else if (weatherData.current?.temp > 27) setTheme('hot');
  }, [weatherData.current?.temp]);

  return { weatherData, theme };
};

export default useWeather;

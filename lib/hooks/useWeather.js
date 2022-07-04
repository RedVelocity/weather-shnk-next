import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeAtom, weatherAtom } from '../store';
import useLocation from './useLocation';
import { getWeather } from '../api';

const useWeather = () => {
  const [weatherData, setWeatherData] = useAtom(weatherAtom);
  const [theme, setTheme] = useAtom(themeAtom);
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

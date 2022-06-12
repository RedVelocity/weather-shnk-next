import { useEffect } from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import shallow from 'zustand/shallow';
import { getWeather } from '../api';
import useLocation from './useLocation';

const useStore = create(
  immer((set) => ({
    theme: 'cool',
    setTheme: (theme) =>
      set((state) => {
        // eslint-disable-next-line no-param-reassign
        state.theme = theme;
      }),
    weatherData: {},
    setWeatherData: (weather) =>
      set((state) => {
        // eslint-disable-next-line no-param-reassign
        state.weatherData = weather;
      }),
  }))
);
const useWeather = () => {
  const weatherData = useStore((state) => state.weatherData, shallow);
  const { theme, setTheme, setWeatherData } = useStore();
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

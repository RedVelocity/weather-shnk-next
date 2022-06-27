import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../store/useWeatherStore';

const useWeather = () => {
  const weatherData = useStore((state) => state.weatherData, shallow);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  // Update theme based on temp
  useEffect(() => {
    if (weatherData.current?.temp <= 15) setTheme('cool');
    else if (weatherData.current?.temp <= 27) setTheme('mild');
    else if (weatherData.current?.temp > 27) setTheme('hot');
  }, [weatherData.current?.temp]);

  return { weatherData, theme };
};

export default useWeather;

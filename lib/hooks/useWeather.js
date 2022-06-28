import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeAtom, weatherAtom } from '../store';

const useWeather = () => {
  const [weatherData] = useAtom(weatherAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  // Update theme based on temp
  useEffect(() => {
    if (weatherData.current?.temp <= 15) setTheme('cool');
    else if (weatherData.current?.temp <= 27) setTheme('mild');
    else if (weatherData.current?.temp > 27) setTheme('hot');
  }, [weatherData.current?.temp]);

  return { weatherData, theme };
};

export default useWeather;

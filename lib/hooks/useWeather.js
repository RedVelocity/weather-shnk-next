import { useContext } from 'react';
import { WeatherContext } from '../context/weatherProvider';

const useWeather = () => {
  const { weatherData, theme } = useContext(WeatherContext);
  return { weatherData, theme };
};

export default useWeather;

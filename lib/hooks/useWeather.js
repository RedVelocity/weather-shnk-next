import { useAtom } from 'jotai';
import { weatherAtom } from '@/lib/store';

const useWeather = () => {
  const [weatherData] = useAtom(weatherAtom);
  return { weatherData };
};

export default useWeather;

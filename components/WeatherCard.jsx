import Image from 'next/image';
import { LazyMotion, m, domAnimation } from 'framer-motion';

import useWeather from '../lib/hooks/useWeather';
import useLocation from '../lib/hooks/useLocation';
import Icon from './Icon';
import Skeleton from './Skeleton';

const WeatherCard = () => {
  const {
    location: { name: locationName },
  } = useLocation();
  const {
    weatherData: { current },
    theme,
  } = useWeather();
  let additionalInfo;

  if (current?.weather) {
    additionalInfo = `Feels Like: ${Math.round(
      current.feels_like
    )}°C | Humidity: ${current.humidity} | UV: ${current.uvi}`;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className={`card p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
      >
        {current?.weather ? (
          <>
            <div className="flex items-center gap-6 p-4 text-center justify-evenly">
              <Icon icon={current.weather.icon} size={64} />
              <m.h1 layout className="text-2xl font-bold capitalize">
                {current.weather.description}
              </m.h1>
              <m.div layout>
                Currently
                <h1 className="text-4xl">{`${Math.round(current.temp)}°C`}</h1>
              </m.div>
            </div>
            <span className="block p-2 mt-2 mb-4 text-sm tracking-wide text-center bg-gray-200 rounded">
              {additionalInfo}
            </span>
          </>
        ) : (
          <Skeleton rows={4} />
        )}
        <div className="flex items-center space-x-2 text-sm">
          <Image
            src="https://img.icons8.com/material-outlined/20/000000/marker.png"
            height={20}
            width={20}
            alt="location"
          />
          <h5 className="ml-1">{locationName}</h5>
        </div>
      </div>
    </LazyMotion>
  );
};

export default WeatherCard;

import { useContext } from 'react';
import Image from 'next/image';
import { LazyMotion, m, domAnimation } from 'framer-motion';

import { weatherIcons } from '../lib/utils/icons';
import { WeatherContext } from '../lib/context/weatherProvider';
import { LocationContext } from '../lib/context/locationProvider';

const WeatherCard = () => {
  const {
    location: { name: locationName },
  } = useContext(LocationContext);
  const {
    weatherData: { current },
    theme,
  } = useContext(WeatherContext);
  let temp = '--';
  let additionalInfo = '--';

  if (current.weather.description !== '--') {
    temp = `${Math.round(current.temp)}°C`;
    additionalInfo = `Feels Like: ${Math.round(
      current.feels_like
    )}°C | Humidity: ${current.humidity} | UV: ${current.uvi}`;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className={`card p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
      >
        <div className="flex items-center gap-6 p-4 text-center justify-evenly">
          <m.img
            layout="position"
            className="w-20 h-20"
            alt="icon"
            src={`/assets/weather-icons/${
              weatherIcons[current.weather.icon]
            }.svg`}
          />
          <m.h1 layout className="text-2xl font-bold capitalize">
            {current.weather.description}
          </m.h1>
          <m.div layout>
            Currently
            <h1 className="text-4xl">{temp}</h1>
          </m.div>
        </div>
        <span className="block p-2 text-sm tracking-wide text-center bg-gray-200 rounded">
          {additionalInfo}
        </span>
        <div className="flex items-center pt-4 space-x-2 text-sm">
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

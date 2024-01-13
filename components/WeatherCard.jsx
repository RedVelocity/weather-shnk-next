'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import colors from '@/styles/colors';
import useWeather from '@/lib/hooks/useWeather';
import useLocation from '@/lib/hooks/useLocation';
import Icon from '@/components/Icon';

const WeatherCard = () => {
  const {
    location: { name: locationName },
  } = useLocation();
  const {
    weatherData: { current, daily },
    theme,
  } = useWeather();
  let additionalInfo;
  const { min: minTemp, max: maxTemp } = daily[0].temp;

  if (current?.weather) {
    additionalInfo = `Feels Like: ${Math.round(
      current.feels_like
    )}°C | Humidity: ${current.humidity}% | UV: ${current.uvi}`;
  }

  let backgroundPosition;
  switch (theme) {
    case 'cool':
      backgroundPosition = 'left';
      break;
    case 'mild':
      backgroundPosition = 'center';
      break;
    case 'hot':
      backgroundPosition = 'right';
      break;
    default:
      backgroundPosition = 'left';
      break;
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(140deg, ${colors.cool} 0%, ${colors.mild} 30%, ${colors.milder} 60%, ${colors.hot} 100%)`,
        backgroundSize: '1800px',
        backgroundPosition,
        transition: 'background-position 500ms linear',
      }}
      className="flex flex-col flex-1 p-4 text-gray-900 card justify-evenly"
    >
      <>
        <div className="flex items-center gap-6 p-4 text-center justify-evenly">
          <Icon icon={current.weather.icon} size={64} />
          <motion.h2
            key={current.weather.description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="capitalize"
          >
            {current.weather.description}
          </motion.h2>
          <div>
            <motion.h1
              key={current.temp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >{`${Math.round(current.temp)}°C`}</motion.h1>
            <h4>{`${Math.round(minTemp)}°C / ${Math.round(maxTemp)}°C`}</h4>
          </div>
        </div>
        <span className="block p-2 mt-2 mb-4 font-semibold tracking-wide text-center bg-gray-200 rounded md:px-4 md:py-3">
          {additionalInfo}
        </span>
      </>
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/weather-icons/location.png"
          height={20}
          width={20}
          alt="location"
        />
        <h4 className="ml-1 tracking-wide">{locationName}</h4>
      </div>
    </div>
  );
};

export default WeatherCard;

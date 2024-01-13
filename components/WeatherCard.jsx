'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import colors from '@/styles/colors';
import useWeather from '@/lib/hooks/useWeather';
import useLocation from '@/lib/hooks/useLocation';
import Icon from '@/components/Icon';

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  initial: { opacity: 0, y: 10 },
  transition: { duration: 0.5 },
};

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
        <div className="grid grid-cols-3 gap-4 py-4 place-items-center">
          <Icon icon={current.weather.icon} size={64} animate />
          <motion.h2
            key={current.weather.description}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center capitalize"
          >
            {current.weather.description}
          </motion.h2>
          <motion.h1
            key={current.temp}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {`${Math.round(current.temp)}°C`}
          </motion.h1>
        </div>
        <motion.p
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-right"
        >{`Min ${Math.round(minTemp)}°C • Max ${Math.round(
          maxTemp
        )}°C`}</motion.p>
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
        <p className="ml-1 tracking-wide">{locationName}</p>
      </div>
    </div>
  );
};

export default WeatherCard;

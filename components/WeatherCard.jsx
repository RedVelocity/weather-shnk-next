import Image from 'next/image';
import { m } from 'framer-motion';

import colors from '../styles/colors';
import useWeather from '../lib/hooks/useWeather';
import useLocation from '../lib/hooks/useLocation';
import Icon from './Icon';

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
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(140deg, ${colors.cool} 0%, ${colors.mild} 30%, ${colors.milder} 70%, ${colors.hot} 100%)`,
          backgroundSize: '1800px',
          backgroundPosition,
          transition: 'background-position 500ms linear',
        }}
        className="card flex-1 flex flex-col justify-evenly p-4 font-semibold"
      >
        <>
          <div className="flex items-center gap-6 p-4 text-center justify-evenly">
            <Icon icon={current.weather.icon} size={64} />
            <m.h1 layout className="text-2xl md:text-3xl font-bold capitalize">
              {current.weather.description}
            </m.h1>
            <m.div layout>
              <span className="text-xl">Currently</span>
              <h1 className="text-4xl">{`${Math.round(current.temp)}°C`}</h1>
            </m.div>
          </div>
          <span className="block p-2 md:px-4 md:py-3 mt-2 mb-4 tracking-wide text-center bg-gray-200 rounded">
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
          <h5 className="ml-1">{locationName}</h5>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;

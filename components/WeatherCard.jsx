import Image from 'next/image';
import { LazyMotion, m, domAnimation } from 'framer-motion';

import colors from '../styles/colors';
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
    <LazyMotion features={domAnimation} strict>
      <div
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.cool} 0%, ${colors.mild} 30%, ${colors.milder} 70%, ${colors.hot} 100%)`,
          backgroundSize: '1500px',
          backgroundPosition,
          transition: 'background-position 1000ms linear',
        }}
        className="card flex-1 flex flex-col justify-evenly p-4 font-semibold"
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
            <span className="block p-2 md:p-4 mt-2 mb-4 tracking-wide text-center bg-gray-200 rounded">
              {additionalInfo}
            </span>
          </>
        ) : (
          <Skeleton rows={3} />
        )}
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
    </LazyMotion>
  );
};

export default WeatherCard;

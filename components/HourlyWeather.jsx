import dayjs from 'dayjs';
import { useContext } from 'react';
import { WeatherContext } from '../lib/context/weatherProvider';
import Skeleton from './Skeleton';
import SummaryCard from './SummaryCard';

const HourlyWeather = () => {
  const {
    weatherData: { hourly },
  } = useContext(WeatherContext);
  return (
    <>
      {hourly ? (
        <div className="grid min-h-full grid-cols-2 text-gray-200 divide-x divide-y md:grid-cols-5 card bg-dark divide-gray-50/25">
          {hourly.slice(0, 10).map((item, i) => (
            <SummaryCard
              key={i}
              icon={item.weather.icon}
              temperature={`${Math.round(item.temp)}°C`}
              time={i !== 0 ? dayjs.unix(item.dt).format('HH:mm') : 'Now'}
              //   condition={item.weather.description}
            />
          ))}
        </div>
      ) : (
        <Skeleton rows={5} />
      )}
    </>
  );
};

export default HourlyWeather;

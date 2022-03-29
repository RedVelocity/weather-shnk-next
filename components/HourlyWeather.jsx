import dayjs from 'dayjs';
import { useContext } from 'react';
import { WeatherContext } from '../lib/context/weatherProvider';
import { getBreakpointValue } from '../lib/utils/getCurrentBreakpoint';
import Skeleton from './Skeleton';
import SummaryCard from './SummaryCard';
import useWindowSize from '../lib/hooks/useWindowSize';

const HourlyWeather = () => {
  const {
    weatherData: { hourly },
  } = useContext(WeatherContext);
  const { width } = useWindowSize();

  return (
    <>
      {hourly ? (
        <div className="grid min-h-full grid-cols-3 text-gray-200 divide-x divide-y md:grid-cols-5 card bg-dark divide-gray-50/25">
          {hourly
            .slice(0, width <= getBreakpointValue('md') ? 6 : 10)
            .map((item, i) => (
              <SummaryCard
                key={i}
                icon={item.weather.icon}
                title={`${Math.round(item.temp)}°C`}
                subtitle={i !== 0 ? dayjs.unix(item.dt).format('HH:mm') : 'Now'}
              />
            ))}
        </div>
      ) : (
        <Skeleton rows={4} withContainer />
      )}
    </>
  );
};

export default HourlyWeather;

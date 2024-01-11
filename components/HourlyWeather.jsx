'use client';

import dayjs from 'dayjs';
import { getBreakpointValue } from '../lib/utils/getCurrentBreakpoint';
import useWindowSize from '../lib/hooks/useWindowSize';
import useWeather from '../lib/hooks/useWeather';
import Grid from './Grid';
import Icon from './Icon';

const HourlyWeather = () => {
  const {
    weatherData: { hourly },
  } = useWeather();
  const { width } = useWindowSize();
  return (
    <div className="min-h-full p-4 text-lg tracking-wide text-gray-200 card bg-dark">
      <h3>Hourly Forecast</h3>
      <Grid minColSize="grid-cols-2" maxColSize="sm:grid-cols-2" gap="gap-1">
        {hourly
          .slice(0, width <= getBreakpointValue('md') ? 12 : 12)
          .map((item, i) => (
            <div
              className="grid items-center justify-around grid-cols-3 gap-2 mini-card sm:grid-cols-4"
              key={`hourly ${i}`}
            >
              <h4 className="tracking-wider">
                {i !== 0 ? `${dayjs.unix(item.dt).format('HH:mm')} ` : 'Now'}
              </h4>
              <div className="flex items-center justify-center sm:col-span-2 sm:gap-3">
                <Icon size={26} icon={item.weather.icon} />
                <span className="hidden w-full text-center md:text-left sm:block">
                  {item.weather.description}
                </span>
              </div>
              <span className="">{`${Math.round(item.temp)}°C`}</span>
            </div>
          ))}
      </Grid>
    </div>
  );
};

export default HourlyWeather;

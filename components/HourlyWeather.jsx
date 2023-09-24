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
    <div className="min-h-full card bg-dark p-4 tracking-wide text-lg">
      <h1 className="text-xl font-semibold text-gray-200">Hourly Forecast</h1>
      <Grid minColSize="grid-cols-2" maxColSize="sm:grid-cols-2" gap="gap-1">
        {hourly
          .slice(0, width <= getBreakpointValue('md') ? 12 : 12)
          .map((item, i) => (
            <div
              className="mini-card sm:grid flex sm:grid-cols-4 gap-2 text-slate-50 items-center justify-around"
              key={`hourly ${i}`}
            >
              <span className="font-medium tracking-wider">
                {i !== 0 ? `${dayjs.unix(item.dt).format('HH:mm')} ` : 'Now'}
              </span>
              <div className="sm:col-span-2 items-center justify-center sm:gap-3 flex">
                <Icon size={26} icon={item.weather.icon} />
                <span className="text-center w-full md:text-left hidden sm:block">
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

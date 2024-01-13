'use client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import useWeather from '@/lib/hooks/useWeather';
import Grid from '@/components/Grid';
import Icon from '@/components/Icon';

dayjs.extend(utc);
dayjs.extend(timezone);

const DailyWeather = () => {
  const {
    weatherData: { daily, timezone: TZ },
  } = useWeather();
  dayjs.tz(daily[0].dt, TZ);
  return (
    <div className="p-4 tracking-wide text-gray-200 card bg-dark">
      <h3>Daily Forecast</h3>
      <Grid minColSize="grid-cols-2" maxColSize="sm:grid-cols-3">
        {daily.map((item, i) => (
          <div
            className="grid grid-cols-2 gap-1 p-4 place-items-center card bg-white/5"
            key={`summary-${i}`}
          >
            <div className="flex flex-col items-center justify-center">
              <Icon icon={item.weather.icon} size={40} />
              <h3 className="mt-3 leading-4">
                {i !== 0
                  ? dayjs.tz(dayjs.unix(item.dt), TZ).format('ddd DD')
                  : 'Today'}
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{item.weather.description}</p>
              <h4 className="flex-1 leading-4">
                <span className="text-base">{`${Math.round(
                  item.temp.min
                )}°C`}</span>
                {` / ${Math.round(item.temp.max)}°C`}
              </h4>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default DailyWeather;

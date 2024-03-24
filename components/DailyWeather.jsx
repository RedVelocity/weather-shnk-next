'use client';

import useWeather from '@/lib/hooks/useWeather';
import dayjsExtended from '@/lib/utils/dayjsExtended';
import Icon from '@/components/Icon';

const DailyWeather = () => {
  const {
    weatherData: { daily, timezone: TZ },
  } = useWeather();
  dayjsExtended.tz(daily[0].dt, TZ);

  return (
    <div className="p-4 tracking-wide card backdrop-blur-sm bg-white/20">
      <h3>Daily Forecast</h3>
      <div className="grid gap-2 mt-4 text-center capitalize sm:grid-cols-2">
        {daily.map((item, i) => (
          <div
            className="grid grid-cols-2 gap-1 p-4 place-items-center card"
            key={`summary-${i}`}
          >
            <div className="flex items-center justify-center gap-3">
              <Icon icon={item.weather.icon} size={48} />
              <h4 className="leading-4">
                {i !== 0
                  ? dayjsExtended
                      .tz(dayjsExtended.unix(item.dt), TZ)
                      .format('ddd DD')
                  : 'Today'}
              </h4>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span>{item.weather.description}</span>
              <h4>{`${Math.round(item.temp.min)}°C • ${Math.round(
                item.temp.max
              )}°C`}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeather;

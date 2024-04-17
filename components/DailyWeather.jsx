/* eslint-disable react/prop-types */

// import useWeather from '@/lib/hooks/useWeather';
import dayjsExtended from '@/lib/utils/dayjsExtended';
import WeatherIcon from '@/components/Icon/WeatherIcon';

const DailyWeather = ({ weather }) => {
  const { daily, timezone: TZ } = weather;
  dayjsExtended.tz(daily[0].dt, TZ);

  return (
    <div className="wrapper">
      <h3>8-Day Forecast</h3>
      <div className="grid gap-2 mt-4 text-center capitalize sm:grid-cols-2">
        {daily.map((item, i) => (
          <div
            className="grid grid-cols-2 gap-1 p-4 place-items-stretch card bg-surfaceLight/30"
            key={`summary-${i}`}
          >
            <div className="flex items-center gap-3">
              <WeatherIcon icon={item.weather.icon} size="medium" />
              <h4 className="leading-4">
                {i !== 0
                  ? dayjsExtended
                      .tz(dayjsExtended.unix(item.dt), TZ)
                      .format('ddd DD')
                  : 'Today'}
              </h4>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <span className="text-lg">{item.weather.description}</span>
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

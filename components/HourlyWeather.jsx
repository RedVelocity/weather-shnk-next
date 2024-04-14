/* eslint-disable react/prop-types */

// import { getBreakpointValue } from '@/lib/utils/getCurrentBreakpoint';
// import useWindowSize from '@/lib/hooks/useWindowSize';
// import useWeather from '@/lib/hooks/useWeather';
import dayjsExtended from '@/lib/utils/dayjsExtended';
import WeatherIcon from './Icon/WeatherIcon';

const HourlyWeather = ({ weather }) => {
  const { hourly, timezone: TZ } = weather;
  // const { width } = useWindowSize();
  return (
    <div className="min-h-full wrapper">
      <h3>12-Hour Forecast</h3>
      {/* <p>Local Time {dayjs.tz(dayjs.unix(hourly[0].dt), TZ).format('HH:mm')}</p> */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-center capitalize sm:grid-cols-3">
        {hourly.slice(0, 12).map((item, i) => (
          <div
            className="grid items-center grid-cols-3 gap-2 px-4 py-2 justify-evenly bg-white/5 card"
            key={`hourly ${i}`}
          >
            <div>
              <h4 className="tracking-wider">
                {i !== 0
                  ? `${dayjsExtended
                      .tz(dayjsExtended.unix(item.dt), TZ)
                      .format('HH:mm')}`
                  : 'Now'}
              </h4>
              <span className="block text-lg">{`${Math.round(
                item.temp
              )}°C`}</span>
            </div>
            <div className="flex flex-col items-center justify-start col-span-2 gap-1 sm:flex-row sm:gap-3">
              <WeatherIcon size="small" icon={item.weather.icon} />
              <span className="w-full text-lg text-center sm:text-left">
                {item.weather.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;

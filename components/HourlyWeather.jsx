import dayjs from 'dayjs';
import { getBreakpointValue } from '../lib/utils/getCurrentBreakpoint';
import useWeather from '../lib/hooks/useWeather';
import Skeleton from './Skeleton';
import SummaryCard from './SummaryCard';
import useWindowSize from '../lib/hooks/useWindowSize';

const HourlyWeather = () => {
  const {
    weatherData: { hourly },
  } = useWeather();
  const { width } = useWindowSize();
  useWeather();

  return (
    <div className="min-h-full card bg-dark p-4">
      <h1 className="text-xl font-semibold text-gray-200 tracking-wide">
        Hourly Forecast
      </h1>
      {hourly ? (
        <div className="grid grid-cols-2 md:grid-cols-4 text-gray-200 gap-2 mt-4">
          {hourly
            .slice(0, width <= getBreakpointValue('md') ? 6 : 8)
            .map((item, i) => (
              <SummaryCard key={i} icon={item.weather.icon}>
                <h2 className="mt-2 tracking-wide text-lg">
                  <span className="font-medium tracking-widest">
                    {i !== 0
                      ? `${dayjs.unix(item.dt).format('HH:mm')}-`
                      : 'Now-'}
                  </span>
                  {`${Math.round(item.temp)}°C`}
                </h2>
              </SummaryCard>
            ))}
        </div>
      ) : (
        <Skeleton rows={6} withContainer />
      )}
    </div>
  );
};

export default HourlyWeather;

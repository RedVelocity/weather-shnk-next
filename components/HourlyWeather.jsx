import dayjs from 'dayjs';
import { getBreakpointValue } from '../lib/utils/getCurrentBreakpoint';
import useWeather from '../lib/hooks/useWeather';
import Skeleton from './Skeleton';
import SummaryCard from './SummaryCard';
import useWindowSize from '../lib/hooks/useWindowSize';
import Grid from './Grid';

const HourlyWeather = () => {
  const {
    weatherData: { hourly },
  } = useWeather();
  const { width } = useWindowSize();
  useWeather();

  return (
    <div className="min-h-full card bg-dark p-4 tracking-wide text-lg">
      <h1 className="text-xl font-semibold text-gray-200">Hourly Forecast</h1>
      {hourly ? (
        <Grid minColSize={2} maxColSize={4}>
          {hourly
            .slice(0, width <= getBreakpointValue('md') ? 6 : 8)
            .map((item, i) => (
              <SummaryCard key={i} icon={item.weather.icon}>
                <h2 className="mt-2">
                  <span className="font-medium tracking-widest text-xl">
                    {i !== 0
                      ? `${dayjs.unix(item.dt).format('HH:mm')} `
                      : 'Now '}
                  </span>
                  {`${Math.round(item.temp)}°C`}
                </h2>
              </SummaryCard>
            ))}
        </Grid>
      ) : (
        <Skeleton rows={5} withContainer />
      )}
    </div>
  );
};

export default HourlyWeather;

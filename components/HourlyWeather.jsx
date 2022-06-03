import dayjs from 'dayjs';
import { getBreakpointValue } from '../lib/utils/getCurrentBreakpoint';
import useWindowSize from '../lib/hooks/useWindowSize';
import useWeather from '../lib/hooks/useWeather';
import Skeleton from './Skeleton';
import Grid from './Grid';
import MiniCard from './MiniCard';
import Icon from './Icon';

const HourlyWeather = () => {
  const {
    weatherData: { hourly },
  } = useWeather();
  const { width } = useWindowSize();
  return (
    <div className="min-h-full card bg-dark p-4 tracking-wide text-lg">
      <h1 className="text-xl font-semibold text-gray-200">Hourly Forecast</h1>
      {hourly ? (
        <Grid minColSize="grid-cols-1" maxColSize="sm:grid-cols-2" gap="gap-2">
          {hourly
            .slice(0, width <= getBreakpointValue('md') ? 12 : 12)
            .map((item, i) => (
              <MiniCard
                key={`hourly-${i}`}
                header={
                  i !== 0 ? `${dayjs.unix(item.dt).format('HH:mm')} ` : 'Now'
                }
                footer={`${Math.round(item.temp)}°C`}
              >
                <div className="col-span-2 flex items-center gap-2">
                  <Icon size={27} icon={item.weather.icon} />
                  <span className="text-center w-full md:text-left">
                    {item.weather.description}
                  </span>
                </div>
              </MiniCard>
            ))}
        </Grid>
      ) : (
        <Skeleton rows={5} withContainer />
      )}
    </div>
  );
};

export default HourlyWeather;

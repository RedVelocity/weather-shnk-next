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
        <Grid minColSize="grid-cols-1" maxColSize="md:grid-cols-2">
          {hourly
            .slice(0, width <= getBreakpointValue('md') ? 5 : 12)
            .map((item, i) => (
              <MiniCard
                key={`hourly-${i}`}
                header={
                  i !== 0 ? `${dayjs.unix(item.dt).format('HH:mm')} ` : 'Now'
                }
                footer={`${Math.round(item.temp)}°C`}
              >
                <span className="col-span-2 flex items-center">
                  <Icon size={25} icon={item.weather.icon} className="mr-2" />
                  {item.weather.description}
                </span>
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

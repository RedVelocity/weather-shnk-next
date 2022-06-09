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
      <Grid minColSize="grid-cols-1" maxColSize="sm:grid-cols-2" gap="gap-1">
        {hourly
          .slice(0, width <= getBreakpointValue('md') ? 12 : 12)
          .map((item, i) => (
            <div className="mini-card grid grid-cols-4 gap-2 text-slate-50 items-center">
              <span className="font-medium">
                {i !== 0 ? `${dayjs.unix(item.dt).format('HH:mm')} ` : 'Now'}
              </span>
              <div className="col-span-2 flex items-center gap-3">
                <Icon size={26} icon={item.weather.icon} />
                <span className="text-center w-full md:text-left">
                  {item.weather.description}
                </span>
              </div>
              <span className="font-semibold">{`${Math.round(
                item.temp
              )}°C`}</span>
            </div>
          ))}
      </Grid>
    </div>
  );
};

export default HourlyWeather;

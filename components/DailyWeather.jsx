import dayjs from 'dayjs';
import useWeather from '../lib/hooks/useWeather';
import SummaryCard from './SummaryCard';
import Skeleton from './Skeleton';
import Grid from './Grid';

const DailyWeather = () => {
  const {
    weatherData: { daily },
  } = useWeather();

  return (
    <div className="min-h-full card bg-dark p-4 tracking-wide text-lg">
      <h1 className="text-xl font-semibold text-gray-200">Daily Forecast</h1>
      <Grid minColSize="grid-cols-2" maxColSize="sm:grid-cols-3 md:grid-cols-4">
        {daily.map((item, i) => (
          <SummaryCard key={i} icon={item.weather.icon}>
            <h2 className="mt-2 font-semibold leading-4">
              {i !== 0 ? dayjs.unix(item.dt).format('ddd DD') : 'Today'}
            </h2>
            {item.weather.description}
            <h2 className="text-xl font-medium leading-4">
              <span className="text-base">{`${Math.round(
                item.temp.min
              )}°C`}</span>

              {` / ${Math.round(item.temp.max)}°C`}
            </h2>
          </SummaryCard>
        ))}
      </Grid>
    </div>
  );
};

export default DailyWeather;

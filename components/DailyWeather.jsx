import dayjs from 'dayjs';
import useWeather from '../lib/hooks/useWeather';
import Grid from './Grid';
import Skeleton from './Skeleton';
import SummaryCard from './SummaryCard';

const DailyWeather = () => {
  const {
    weatherData: { daily },
  } = useWeather();

  return (
    <div className="min-h-full card bg-dark p-4 tracking-wide text-lg">
      <h1 className="text-xl font-semibold text-gray-200">Daily Forecast</h1>
      {daily ? (
        <Grid minColSize={2} maxColSize={4}>
          {daily.map((item, i) => (
            <SummaryCard key={i} icon={item.weather.icon}>
              <h2 className="mt-2 font-semibold">
                {i !== 0 ? dayjs.unix(item.dt).format('ddd DD') : 'Today'}
              </h2>
              {item.weather.description}
              <h2 className="text-xl font-medium">
                <span className="text-base">{`${Math.round(
                  item.temp.min
                )}°C`}</span>

                {` / ${Math.round(item.temp.max)}°C`}
              </h2>
            </SummaryCard>
          ))}
        </Grid>
      ) : (
        <Skeleton rows={7} withContainer />
      )}
    </div>
  );
};

export default DailyWeather;

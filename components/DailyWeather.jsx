import dayjs from 'dayjs';
import useWeather from '../lib/hooks/useWeather';
import Skeleton from './Skeleton';
import SummaryCard from './SummaryCard';

const DailyWeather = () => {
  const {
    weatherData: { daily },
  } = useWeather();

  return (
    <div className="min-h-full card bg-dark p-4">
      <h1 className="text-xl font-semibold text-gray-200 tracking-wide">
        Daily Forecast
      </h1>
      {daily ? (
        <div className="grid grid-cols-2 md:grid-cols-4 text-gray-200 gap-2 mt-4 text-center capitalize text-lg tracking-wide">
          {daily.map((item, i) => (
            <SummaryCard
              //   border
              key={i}
              icon={item.weather.icon}
            >
              <h2 className="mt-2 font-semibold">
                {i !== 0 ? `${dayjs.unix(item.dt).format('ddd DD')}` : 'Today'}
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
        </div>
      ) : (
        <Skeleton rows={7} withContainer />
      )}
    </div>
  );
};

export default DailyWeather;

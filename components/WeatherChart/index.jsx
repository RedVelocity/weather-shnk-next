import { useContext } from 'react';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';

import Skeleton from '../Skeleton';
import shapeChartData from './config';
import { WeatherContext } from '../../utils/context/weatherProvider';

const WeatherChart = () => {
  let data = {};
  let options = {};
  const { weatherData } = useContext(WeatherContext);
  if (weatherData.daily) [data, options] = shapeChartData(weatherData);

  return (
    <div className="flex flex-col min-h-full gap-4 px-6 py-4 text-gray-200 card justify-evenly bg-dark">
      {weatherData.daily[0] ? (
        <>
          <h1 className="text-lg font-semibold capitalize md:text-xl">
            {`${weatherData.daily[0].weather.description} on ${dayjs
              .unix(weatherData.daily[0].dt)
              .format('dddd')}`}
          </h1>
          <Bar height={100} data={data} options={options} />
        </>
      ) : (
        <Skeleton rows={4} />
      )}
    </div>
  );
};

export default WeatherChart;

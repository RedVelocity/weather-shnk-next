import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';

import Skeleton from '../Skeleton';
import { WeatherContext } from '../../context/weatherProvider';
import { options, shapeChartData } from './config';

const WeatherChart = () => {
  let data = {};
  const { weatherData } = useContext(WeatherContext);
  if (weatherData.daily) data = shapeChartData(weatherData);

  return (
    <div className="flex flex-col min-h-full px-6 py-4 space-y-4 text-gray-200 md:space-y-0 card justify-evenly bg-dark">
      {weatherData.daily[0] ? (
        <>
          <h1 className="mb-4 text-xl font-semibold tracking-wide capitalize">
            {`${weatherData.daily[0].weather[0].description} on ${dayjs
              .unix(weatherData.daily[0].dt)
              .format('dddd')}`}
          </h1>
          <Bar height={100} data={data} options={options} />
        </>
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </div>
  );
};

export default WeatherChart;

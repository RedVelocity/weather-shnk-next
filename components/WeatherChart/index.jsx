import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';

import Skeleton from '../Skeleton';
import shapeChartData from './config';
import { WeatherContext } from '../../lib/context/weatherProvider';
import { getCurrentBreakpoint } from '../../lib/utils/getCurrentBreakpoint';

const WeatherChart = () => {
  const { weatherData } = useContext(WeatherContext);
  const [data, options, title] = shapeChartData(weatherData);
  return (
    <>
      {title ? (
        <div className="flex flex-col px-6 py-4 text-gray-200 justify-evenly h-80 md:h-96 card bg-dark">
          <h1 className="mb-4 text-lg font-semibold tracking-wide capitalize md:my-4 md:text-xl">
            {title}
          </h1>
          <Bar
            height={getCurrentBreakpoint() === 'sm' ? 130 : 90}
            data={data}
            options={options}
          />
        </div>
      ) : (
        <Skeleton rows={5} />
      )}
    </>
  );
};

export default WeatherChart;

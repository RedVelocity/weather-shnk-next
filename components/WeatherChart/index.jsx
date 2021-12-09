import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';

import Skeleton from '../Skeleton';
import shapeChartData from './config';
import { WeatherContext } from '../../utils/context/weatherProvider';
import { getCurrentBreakpoint } from '../../utils/getCurrentBreakpoint';

const WeatherChart = () => {
  const { weatherData } = useContext(WeatherContext);
  const [data, options, title] = shapeChartData(weatherData);
  return (
    <div className="flex flex-col min-h-full gap-4 px-6 py-4 text-gray-200 card justify-evenly bg-dark">
      {title ? (
        <>
          <h1 className="text-lg font-semibold tracking-wide capitalize md:text-xl">
            {title}
          </h1>
          <Bar
            height={getCurrentBreakpoint() === 'sm' ? 130 : 100}
            data={data}
            options={options}
          />
        </>
      ) : (
        <Skeleton rows={4} />
      )}
    </div>
  );
};

export default WeatherChart;

import { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Skeleton from '../Skeleton';
import shapeChartData from './config';
import { WeatherContext } from '../../lib/context/weatherProvider';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const WeatherChart = () => {
  const { weatherData } = useContext(WeatherContext);
  const [data, options, title] = shapeChartData(weatherData);
  return (
    <>
      {title ? (
        <div className="px-6 py-4 text-gray-200 card h-80 md:h-96 bg-dark">
          <h1 className="pb-4 text-xl font-semibold text-gray-200 capitalize">
            {title}
          </h1>
          <div className="flex items-center justify-center h-[80%]">
            <Bar data={data} options={options} />
          </div>
        </div>
      ) : (
        <Skeleton rows={5} withContainer />
      )}
    </>
  );
};

export default WeatherChart;

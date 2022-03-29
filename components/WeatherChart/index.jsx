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
        <div className="p-4 text-gray-200 h-80 md:h-96 card bg-dark flex flex-col gap-4">
          <h1 className="text-xl font-semibold text-gray-200 capitalize">
            {title}
          </h1>
          <div className="grow">
            <Bar data={data} options={options} />
          </div>
        </div>
      ) : (
        <Skeleton rows={4} withContainer />
      )}
    </>
  );
};

export default WeatherChart;

import { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Skeleton from '../Skeleton';
import shapeChartData from './config';
import { WeatherContext } from '../../lib/context/weatherProvider';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const WeatherChart = () => {
  const { weatherData } = useContext(WeatherContext);
  const [data, options] = shapeChartData(weatherData);
  return (
    <>
      {weatherData.daily ? (
        <div className="flex items-center justify-center px-6 py-4 text-gray-200 h-80 md:h-96 card bg-dark">
          <Bar height="100%" data={data} options={options} />
        </div>
      ) : (
        <Skeleton rows={5} withContainer />
      )}
    </>
  );
};

export default WeatherChart;

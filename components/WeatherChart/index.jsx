import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from 'chart.js';
// import { Bar } from 'react-chartjs-2';

import useWeather from '../../lib/hooks/useWeather';
import Skeleton from '../Skeleton';
import shapeChartData from './config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const WeatherChart = () => {
  const { weatherData } = useWeather();
  const [title] = shapeChartData(weatherData);
  return (
    <>
      {title ? (
        <div className="flex flex-col gap-4 p-4 text-gray-200 h-80 md:h-96 card bg-dark">
          <h1 className="text-xl font-semibold text-gray-200 capitalize">
            {title}
          </h1>
          <div className="grow">
            {/* <Bar data={data} options={options} /> */}
          </div>
        </div>
      ) : (
        <Skeleton rows={4} withContainer />
      )}
    </>
  );
};

export default WeatherChart;

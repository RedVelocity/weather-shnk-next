import dayjs from 'dayjs';
import { cool, mild, hot } from '../../styles/colors';

const stepSize = 10;
const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'lightgray',
        font: {
          family: ['Montserrat', 'sans-serif'],
          size: 13,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'lightgray',
        font: {
          family: ['Montserrat', 'sans-serif'],
          size: 13,
        },
        stepSize,
      },
    },
  },
};

const shapeChartData = (weatherData) => {
  const labels = [];
  const lowTempData = [];
  const averageTempData = [];
  const highTempData = [];
  let data = {};
  let title = '';
  if (weatherData.daily) {
    title = `${weatherData.daily[0].weather.description} on ${dayjs
      .unix(weatherData.daily[0].dt)
      .format('dddd')}`;
    weatherData.daily.forEach((daily) => {
      labels.push(dayjs.unix(daily.dt).format('dd-DD'));
      lowTempData.push(Math.round(daily.temp.min));
      averageTempData.push(Math.round((daily.temp.max + daily.temp.min) / 2));
      highTempData.push(Math.round(daily.temp.max));
    });
    // Set min step for bar chart based on lowtemp value
    const min = Math.min(...lowTempData);
    options.scales.y.ticks.suggestedMin =
      min % stepSize === 0 ? min - stepSize : min - (min % stepSize);
    // Shape data element
    data = {
      labels,
      datasets: [
        {
          label: 'Low',
          fill: true,
          data: lowTempData,
          backgroundColor: cool,
          hoverBackgroundColor: '#DDD',
        },
        {
          label: 'Average',
          fill: true,
          data: averageTempData,
          backgroundColor: mild,
          hoverBackgroundColor: '#DDD',
        },
        {
          label: 'High',
          fill: true,
          data: highTempData,
          backgroundColor: hot,
          hoverBackgroundColor: '#DDD',
        },
      ],
    };
  }
  return [data, options, title];
};

export default shapeChartData;

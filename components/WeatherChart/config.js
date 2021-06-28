import dayjs from 'dayjs';
import { cool, mild, hot } from '../../styles/colors';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'lightgray',
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 13,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'lightgray',
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 13,
          stepSize: 5,
        },
      },
    ],
  },
};

const shapeChartData = (weatherData) => {
  const labels = [];
  const lowTempData = [];
  const averageTempData = [];
  const highTempData = [];
  weatherData.daily.forEach((daily) => {
    labels.push(dayjs.unix(daily.dt).format('dd-DD'));
    lowTempData.push(Math.round(daily.temp.min));
    averageTempData.push(Math.round((daily.temp.max + daily.temp.min) / 2));
    highTempData.push(Math.round(daily.temp.max));
  });
  options.scales.yAxes[0].ticks.suggestedMin = Math.min(...lowTempData) - 5;
  const data = {
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
  return [data, options];
};

export default shapeChartData;

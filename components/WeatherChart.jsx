import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { WeatherContext } from '../context/weatherProvider';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false,
    // labels: {
    //   fontFamily: ['Montserrat', 'sans-serif'],
    // },
    // position: 'bottom',
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
          // callback: (tick, index, values) =>
          // index === values.length - 1 ? '' : tick,
        },
      },
    ],
  },
};

const WeatherChart = () => {
  const { weatherData } = useContext(WeatherContext);
  const labels = [];
  const lowTempData = [];
  const averageTempData = [];
  const highTempData = [];
  weatherData.daily?.forEach((daily) => {
    labels.push(dayjs.unix(daily.dt).format('dd-DD'));
    lowTempData.push(Math.round(daily.temp.min));
    averageTempData.push(Math.round((daily.temp.max + daily.temp.min) / 2));
    highTempData.push(Math.round(daily.temp.max));
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'Low',
        data: lowTempData,
        fill: true,
        // borderWidth: 3,
      },
      {
        label: 'Average',
        data: averageTempData,
        fill: true,
        // borderWidth: 3,
      },
      {
        label: 'High',
        data: highTempData,
        fill: true,
        // borderWidth: 3,
      },
    ],
  };

  useEffect(() => {
    data.datasets[0].backgroundColor = getComputedStyle(
      document.body
    ).getPropertyValue('--cool');
    data.datasets[1].backgroundColor = getComputedStyle(
      document.body
    ).getPropertyValue('--mild');
    data.datasets[2].backgroundColor = getComputedStyle(
      document.body
    ).getPropertyValue('--hot');

    // eslint-disable-next-line no-param-reassign
    data.datasets.forEach((dataset) => (dataset.hoverBackgroundColor = '#DDD'));
  }, []);

  return (
    <div className="flex flex-col min-h-full px-6 py-4 text-gray-200 card justify-evenly bg-dark">
      <h1 className="mb-4 text-xl font-semibold tracking-wide capitalize">
        {weatherData.daily[0] &&
          `${weatherData.daily[0].weather[0].description} on ${dayjs
            .unix(weatherData.daily[0].dt)
            .format('dddd')}`}
      </h1>
      <Bar height={100} data={data} options={options} />
    </div>
  );
};

export default WeatherChart;

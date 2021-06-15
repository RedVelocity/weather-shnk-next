import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { WeatherContext } from '../context/weatherProvider';
import colors from '../styles/colors';

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
        backgroundColor: colors.cool,
        hoverBackgroundColor: '#DDD',
      },
      {
        label: 'Average',
        data: averageTempData,
        fill: true,
        backgroundColor: colors.mild,
        hoverBackgroundColor: '#DDD',
      },
      {
        label: 'High',
        data: highTempData,
        fill: true,
        backgroundColor: colors.hot,
        hoverBackgroundColor: '#DDD',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-full px-6 py-4 text-gray-200 card justify-evenly bg-dark">
      {weatherData.daily[0] && (
        <>
          <h1 className="mb-4 text-xl font-semibold tracking-wide capitalize">
            {`${weatherData.daily[0].weather[0].description} on ${dayjs
              .unix(weatherData.daily[0].dt)
              .format('dddd')}`}
          </h1>
          <Bar height={100} data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default WeatherChart;

/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

export const fetchWeather = async (latitude, longitude) => {
  const exclude = 'minutely,alerts';
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`;

  let formattedData = {};
  const res = await fetch(API_ENDPOINT, { next: { revalidate: 600 } });
  const { daily, current, hourly } = await res.json();
  // console.log(data, 'data');
  formattedData = {
    current: {
      ...current,
      weather: current.weather[0],
    },
    daily: daily.map((d) => ({
      dt: d.dt,
      temp: d.temp,
      weather: d.weather[0],
    })),
    hourly: hourly.map((d) => ({
      dt: d.dt,
      temp: d.temp,
      weather: d.weather[0],
    })),
  };
  return formattedData;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const res = await fetchWeather(latitude, longitude);
  const data = await res.json();
  return NextResponse.json({ data });
}

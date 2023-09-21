// import axios from 'axios';

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

export default async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    res.status(200).json(await fetchWeather(latitude, longitude));
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

import axios from 'axios';

export default async (req, res) => {
  const { latitude, longitude } = req.query;
  const exclude = 'minutely,alerts';
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`;

  let formattedData = {};
  try {
    const {
      data: { daily, current, hourly },
    } = await axios.get(API_ENDPOINT);
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
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

import axios from 'axios';

export default async (req, res) => {
  const { latitude, longitude } = req.query;
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    res.status(200).json(data);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

import axios from 'axios';

export default async (req, res) => {
  const { latitude, longitude } = req.query;
  const API_ENDPOINT = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.NEXT_PUBLIC_TIMEZONEDB_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    res.status(200).json(data);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

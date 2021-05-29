import axios from 'axios';

export default async (req, res) => {
  const { latitude, longitude } = req.query;
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&types=place&language=en&limit=1`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    res.status(200).json(data);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

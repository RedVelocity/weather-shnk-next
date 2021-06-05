import axios from 'axios';

export default async (req, res) => {
  const { place, latitude, longitude } = req.query;
  const proximity =
    latitude !== 0 && longitude !== 0
      ? `&proximity=${longitude},${latitude}`
      : '';
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&types=place,locality&language=en&limit=25${proximity}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    res.status(200).json(data);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

import axios from 'axios';

export default async (req, res) => {
  const { searchTerm, latitude, longitude } = req.query;
  const proximity =
    latitude !== 0 && longitude !== 0
      ? `&proximity=${longitude},${latitude}`
      : '';
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&types=place,locality&language=en&limit=25${proximity}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    const places = data.features.map((feature) => ({
      id: feature.id,
      coordinates: feature.geometry.coordinates,
      place_name: feature.text_en,
      place_locality: feature.context.reduce(
        (locality, ctx, index, context) =>
          context.length === index + 1
            ? `${locality}${ctx.text_en}.`
            : `${locality}${ctx.text_en}, `,
        ''
      ),
    }));
    res.status(200).json(places);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

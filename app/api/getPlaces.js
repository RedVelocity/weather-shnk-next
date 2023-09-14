/* eslint-disable camelcase */
import axios from 'axios';

export const getPlaceCoords = async (searchTerm) => {
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&types=place,locality&language=en&limit=1`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    const feature = data.features[0];
    const location = {
      name: feature.place_name_en,
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      curLat: 0,
      curLon: 0,
    };
    return location;
  } catch (error) {
    return 0;
  }
};

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
    const places = data.features.map((feature) => {
      const locality = !feature.context
        ? [feature.text_en]
        : feature.context.length < 3
        ? feature.context
        : feature.context.slice(-2);
      const place_locality = locality.reduce(
        (loc, ctx, index, context) =>
          context.length === index + 1
            ? `${loc}${ctx.text_en}.`
            : `${loc}${ctx.text_en}, `,
        ''
      );
      return {
        id: feature.id,
        coordinates: feature.geometry.coordinates,
        place_name: feature.text_en,
        place_locality,
        place_address: feature.context.reduce(
          (loc, ctx, index, context) =>
            context.length === index + 1
              ? `${loc}${ctx.text_en}.`
              : `${loc}${ctx.text_en}, `,
          ''
        ),
      };
    });
    res.status(200).json(places);
  } catch (error) {
    res.status(422).json({ data: String(error) });
  }
};

'use server';

export const getWeather = async (latitude, longitude) => {
  const exclude = 'minutely,alerts';
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`;

  let formattedData = {};
  const res = await fetch(API_ENDPOINT, { next: { revalidate: 0 } });
  const { timezone, daily, current, hourly } = await res.json();
  // console.log(data, 'data');
  formattedData = {
    timezone,
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

export const getPlaceCoords = async (searchTerm) => {
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_BACKEND}&types=place,locality&language=en&limit=1`;
  try {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();
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

export const getPlaces = async (latitude, longitude, searchTerm) => {
  const proximity =
    latitude !== 0 && longitude !== 0
      ? `&proximity=${longitude},${latitude}`
      : '';
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_BACKEND}&types=place,locality&language=en&limit=25${proximity}`;

  const response = await fetch(API_ENDPOINT);
  const data = await response.json();
  // console.log(data, 'data');
  const places = data.features.map((feature) => {
    const locality = !feature.context
      ? [feature.text_en]
      : feature.context.length < 3
      ? feature.context
      : feature.context.slice(-2);
    // eslint-disable-next-line camelcase
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
  return places;
};

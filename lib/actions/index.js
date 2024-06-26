/* eslint-disable camelcase */

'use server';

export const getWeather = async (latitude, longitude) => {
  const exclude = 'minutely,alerts';
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`;

  let formattedData = {};
  const res = await fetch(API_ENDPOINT, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const { timezone, daily, current, hourly } = await res.json();
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

const formatLocation = (feature) => {
  const place_name = feature.text_en;
  const place_locality = !feature.context
    ? `${place_name}.`
    : `${feature.context
        .slice(-2)
        .map((ctx) => ctx.text_en)
        .join(', ')}.`;
  const formattedLocation = {
    id: feature.id,
    coordinates: feature.geometry.coordinates,
    place_name,
    place_locality,
    place_address: !feature.context
      ? place_locality
      : `${feature.context.map((ctx) => ctx.text_en).join(', ')}.`,
  };
  return formattedLocation;
};

export const getLocation = async (searchTerm) => {
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_BACKEND}&types=place,locality&language=en&limit=1`;
  const res = await fetch(API_ENDPOINT);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  const location = formatLocation(data.features[0]);
  // const location = {
  //   name: feature.place_name_en,
  //   latitude: feature.geometry.coordinates[1],
  //   longitude: feature.geometry.coordinates[0],
  //   curLat: 0,
  //   curLon: 0,
  // };
  return location;
};

export const getPlaces = async (latitude, longitude, searchTerm) => {
  const proximity =
    latitude !== 0 && longitude !== 0
      ? `&proximity=${longitude},${latitude}`
      : '';
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_BACKEND}&types=place,locality&language=en&limit=25${proximity}`;

  const res = await fetch(API_ENDPOINT);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  const places = data.features.map((feature) => formatLocation(feature));
  return places;
};

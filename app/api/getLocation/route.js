/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

// export default async (req, res) => {
//   const { latitude, longitude } = req.query;
//   const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&types=place&language=en&limit=1`;

//   try {
//     const res = await fetch(API_ENDPOINT);
//     const data = await res.json()
//     // console.log(data, 'data');
//     res.status(200).json(data.features[0].place_name);
//   } catch (error) {
//     res.status(422).json({ data: String(error) });
//   }
// };

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&types=place&language=en&limit=1`;
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return NextResponse.json(data.features[0].place_name);
}

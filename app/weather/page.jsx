import { notFound } from 'next/navigation';
import { fetchWeather } from '@/app/api/getWeather/route';
import { getPlaceCoords } from '@/app/api/getPlaces/route';
import HydrateAtoms from '@/components/HydrateAtoms';
import WeatherCard from '@/components/WeatherCard';
import SearchCard from '@/components/SearchCard';
import WeatherInfoCardList from '@/components/WeatherInfoCardList';
import HourlyWeather from '@/components/HourlyWeather';
import DailyWeather from '@/components/DailyWeather';
import WeatherMap from '@/components/WeatherMap';
import Favorites from '@/components/Favorites';

// export const generateMetadata = async ({ searchParams }) => {
//   // read route params
//   const { q } = searchParams;
//   const locationName = decodeURIComponent(q).split(',')[0];
//   return {
//     title: `Weather | ${locationName}`,
//     description: `Checkout the weather details for ${locationName}`,
//     keywords: ['Next.js', 'React', 'JavaScript', 'Weather', locationName],
//     authors: [{ name: 'RedVelocity', url: 'https://redvelo.site' }],
//     creator: 'RedVelocity',
//     publisher: 'RedVelocity',
//     icons: {
//       icon: '/weather-icon.png',
//     },
//   };
// };

export const metadata = {
  title: `Weather | redvelo.site`,
  description: `Checkout the weather details for any place!`,
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Weather',
    'redvelo',
    'redvelo.site',
    'vercel',
  ],
  authors: [{ name: 'RedVelocity', url: 'https://redvelo.site' }],
  creator: 'RedVelocity',
  publisher: 'RedVelocity',
  icons: {
    icon: '/weather-icon.png',
  },
};

const Home = async ({ searchParams }) => {
  const { q } = searchParams;
  const query = decodeURIComponent(q);

  let location;
  try {
    query !== 'undefined'
      ? (location = await getPlaceCoords(query))
      : (location = {
          name: 'Bangalore, Karnataka, India.',
          latitude: 12.972442,
          longitude: 77.580643,
          curLat: 0,
          curLon: 0,
        });
  } catch (error) {
    return notFound();
  }

  if (!location.latitude) return notFound();
  const weather = await fetchWeather(location.latitude, location.longitude);

  return (
    <>
      <HydrateAtoms weather={weather} location={location} />
      <div className="grid gap-3 mx-4 md:grid-cols-3">
        <section className="flex flex-col space-y-3">
          <SearchCard />
          <div className="flex flex-col flex-1 gap-2 sm:flex-row">
            <WeatherCard />
            {/* Reposition Component on small devices */}
            <div className="sm:hidden">
              <Favorites />
            </div>
            <WeatherInfoCardList className="grid md:hidden" weather={weather} />
          </div>
        </section>
        <section className="md:col-span-2">
          <HourlyWeather />
        </section>
        <WeatherInfoCardList className="hidden md:grid" />
        <section className="hidden md:col-span-2 sm:block">
          <Favorites />
        </section>
        <WeatherMap
          longitude={location.longitude}
          latitude={location.latitude}
        />
        <section className="md:col-span-2">
          <DailyWeather />
        </section>
      </div>
    </>
  );
};

export default Home;

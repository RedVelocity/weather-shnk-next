import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Image from 'next/image';
import { getLocation, getWeather } from '@/app/actions';
import WeatherCard from '@/components/WeatherCard';
import SearchCard from '@/components/SearchCard';
import WeatherInfoCardList from '@/components/WeatherInfoCardList';
import HourlyWeather from '@/components/HourlyWeather';
import DailyWeather from '@/components/DailyWeather';
import WeatherMap from '@/components/WeatherMap';
import Favorites from '@/components/Favorites';
import UpdateParams from '@/components/UpdateParams';

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

const DEFAULT_LOCATION = {
  name: 'Scranton,Pennsylvania,USA',
  latitude: 41.411835,
  longitude: -75.665245,
  curLat: 0,
  curLon: 0,
};
async function getIPLocation() {
  const header = headers();
  const IP = (header.get('x-real-ip') ?? '127.0.0.1').split(',')[0];
  if (IP === '127.0.0.1') {
    return DEFAULT_LOCATION;
  }
  const res = await fetch(
    `http://ip-api.com/json/${IP}?fields=status,country,regionName,city,lat,lon`
  );
  const data = await res.json();
  if (!res.ok || data?.status === 'fail') {
    return DEFAULT_LOCATION;
  }
  const { country, regionName, city, lat, lon } = data;
  return {
    name: `${city},${regionName},${country}`,
    latitude: lat,
    longitude: lon,
    curLat: 0,
    curLon: 0,
  };
}

const Home = async ({ searchParams }) => {
  const { q } = searchParams;
  const query = decodeURIComponent(q);
  let location;
  let weather;
  try {
    location =
      query !== 'undefined' ? await getLocation(query) : await getIPLocation();
    if (!location.latitude) return notFound();
    weather = await getWeather(location.latitude, location.longitude);
  } catch (error) {
    console.log('error', error);
    return notFound();
  }

  return (
    <>
      <UpdateParams location={location} />
      <div className="fixed top-0 left-0 w-screen h-auto aspect-video -z-10">
        <Image
          className="blur-sm"
          src="/assets/bg.png"
          alt="BG"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="grid gap-3 mx-4 md:grid-cols-3">
        <section className="flex flex-col space-y-3">
          <SearchCard weather={weather} location={location} />
          <div className="flex flex-col flex-1 gap-2 sm:flex-row">
            <WeatherCard weather={weather} location={location} />
            {/* Reposition Component on small devices */}
            <div className="sm:hidden">
              <Favorites location={location} />
            </div>
            <WeatherInfoCardList className="grid md:hidden" weather={weather} />
          </div>
        </section>
        <section className="md:col-span-2">
          <HourlyWeather weather={weather} />
        </section>
        <WeatherInfoCardList className="hidden md:grid" weather={weather} />
        <section className="hidden md:col-span-2 sm:block">
          <Favorites location={location} />
        </section>
        <WeatherMap
          longitude={location.longitude}
          latitude={location.latitude}
        />
        <section className="md:col-span-2">
          <DailyWeather weather={weather} />
        </section>
      </div>
    </>
  );
};

export default Home;

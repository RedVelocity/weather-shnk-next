import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Image from 'next/image';
import { getLocation, getWeather } from '@/lib/actions';
import {
  DailyWeather,
  HourlyWeather,
  WeatherCard,
  WeatherInfoCardList,
  WeatherMap,
} from '@/components/weather';
import SearchCard from '@/components/SearchCard';
import Favorites from '@/components/Favorites';
import UpdateParams from '@/lib/utils/UpdateParams';
import dayjsExtended from '@/lib/utils/dayjsExtended';

export const metadata = {
  title: `Weather | redvelo.site`,
  description: `Checkout the weather details for any place!`,
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Weather',
    'redvelo',
    'vercel weather',
    'weather vercel',
    'weather redvelocity',
    'redvelo.site',
    'redvelocity',
    'redvelocity.site',
    'redvelo.city',
    'red velocity',
    'weather red velocity',
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
      <div className="fixed top-0 left-0 object-cover w-screen h-auto aspect-[16/7] -z-10">
        <Image
          className="blur-sm"
          src="/assets/bg.png"
          alt="BG"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="grid gap-3 mx-4 lg:grid-cols-3">
        <section className="flex flex-col space-y-3">
          <SearchCard weather={weather} location={location} />
          <div className="grid h-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:flex">
            <div className="w-full md:col-span-2">
              <WeatherCard weather={weather} location={location} />
            </div>
            {/* Reposition Component on small devices */}
            <div className="sm:hidden">
              <Favorites location={location} />
            </div>
            <WeatherInfoCardList className="grid lg:hidden" weather={weather} />
          </div>
        </section>
        <section className="lg:col-span-2">
          <HourlyWeather weather={weather} />
        </section>
        <WeatherInfoCardList className="hidden lg:grid" weather={weather} />
        <section className="hidden lg:col-span-2 sm:block">
          <Favorites location={location} />
        </section>
        <WeatherMap
          longitude={location.longitude}
          latitude={location.latitude}
        />
        <section className="lg:col-span-2">
          <DailyWeather weather={weather} />
        </section>
        <span className="text-sm tracking-wider text-center md:text-left md:text-lg">
          Updated at -
          {` ${dayjsExtended
            .tz(Date.now(), weather.timezone)
            .format('HH:mm')} ${weather.timezone}`}
        </span>
      </div>
    </>
  );
};

export default Home;

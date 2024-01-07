// import { LazyMotion } from 'framer-motion';

import { fetchWeather } from '@/app/api/getWeather/route';
import { getPlaceCoords } from '@/app/api/getPlaces/route';
import HydrateAtoms from '@/components/HydrateAtoms';
import WeatherCard from '@/components/WeatherCard';
import Header from '@/components/header';
import SearchCard from '@/components/SearchCard';
import WeatherInfoCardList from '@/components/WeatherInfoCardList';
import HourlyWeather from '@/components/HourlyWeather';
import DailyWeather from '@/components/DailyWeather';
import Footer from '@/components/footer';
import WeatherMap from '@/components/WeatherMap';
// import WeatherMap from '@/components/WeatherMap';

// const DynamicWeatherMap = dynamic(() => import('@/components/WeatherMap'), {
//   ssr: false,
//   // loading: () => null,
// });

// const loadFeatures = () =>
//   import('../../lib/utils/features').then((res) => res.default);

const Home = async ({ searchParams }) => {
  const { q } = searchParams;
  const query = decodeURIComponent(q);
  const res = await fetch(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
  );
  const host = await res.json();
  let location;
  query !== 'undefined'
    ? (location = await getPlaceCoords(query))
    : (location = {
        name: 'Bangalore, Karnataka, India.',
        latitude: 12.972442,
        longitude: 77.580643,
        curLat: 0,
        curLon: 0,
      });
  const weather = await fetchWeather(location.latitude, location.longitude);
  // console.log(location);
  return (
    <>
      <Header hostName={host.hostName} hostUrl={host.hostUrl} />
      <main className="flex-1 min-w-full">
        <HydrateAtoms weather={weather} location={location} />
        <div className="grid gap-3 mx-4 md:grid-cols-3">
          <section className="space-y-3 flex flex-col">
            <SearchCard />
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <WeatherCard />
              {/* Reposition Component on small devices */}
              <WeatherInfoCardList
                className="grid md:hidden"
                weather={weather}
              />
            </div>
          </section>
          <section className="md:col-span-2">
            <HourlyWeather />
          </section>
          <section className="md:space-y-3 md:flex md:flex-col">
            <WeatherInfoCardList className="hidden md:grid" />
            {/* <DynamicWeatherMap
              longitude={location.longitude}
              latitude={location.latitude}
            /> */}
            <WeatherMap
              longitude={location.longitude}
              latitude={location.latitude}
            />
          </section>
          <section className="md:col-span-2">
            <DailyWeather />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

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
            <WeatherInfoCardList className="grid md:hidden" weather={weather} />
          </div>
        </section>
        <section className="md:col-span-2">
          <HourlyWeather />
        </section>
        <section className="md:space-y-3 md:flex md:flex-col">
          <WeatherInfoCardList className="hidden md:grid" />
          <WeatherMap
            longitude={location.longitude}
            latitude={location.latitude}
          />
        </section>
        <section className="md:col-span-2">
          <DailyWeather />
        </section>
      </div>
    </>
  );
};

export default Home;

import axios from 'axios';

import { fetchWeather } from '@/app/api/getWeather';
import { getPlaceCoords } from '@/app/api/getPlaces';
import HydrateAtoms from '@/components/HydrateAtoms';
import WeatherCard from '@/components/WeatherCard';
import Header from '@/components/header';
import SearchCard from '@/components/SearchCard';
import WeatherInfoCardList from '@/components/WeatherInfoCardList';
// import ComboboxDemo from '@/components/ComboBox';

const Home = async ({ searchParams }) => {
  const { q } = searchParams;
  const query = decodeURIComponent(q);
  const { data: host } = await axios.get(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
  );
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
    <main className="max-w-screen-xl mx-auto p-2 min-w-[350px]">
      <Header hostName={host.hostName} hostUrl={host.hostUrl} />
      <HydrateAtoms weather={weather} location={location} />
      <section className="grid md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <SearchCard />
          {/* Reposition Component on small devices */}
          <WeatherInfoCardList className="grid" />
        </div>
        <WeatherCard />
      </section>
      {/* <ComboboxDemo /> */}
    </main>
  );
};

export default Home;

import axios from 'axios';

import { fetchWeather } from '../api/getWeather';
import { getPlaceCoords } from '../api/getPlaces';
import HydrateAtoms from '../../components/HydrateAtoms';
import WeatherCard from '../../components/WeatherCard';
import Header from '../../components/header';
import SearchCard from '../../components/SearchCard';
import WeatherInfoCardList from '../../components/WeatherInfoCardList';

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
    <main className="flex-1 min-w-full">
      <Header hostName={host.hostName} hostUrl={host.hostUrl} />
      <HydrateAtoms weather={weather} location={location} />
      <section className="space-y-3 grid grid-cols-2 gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <SearchCard />
          {/* Reposition Component on small devices */}
          <WeatherInfoCardList className="grid md:hidden" />
        </div>
        <WeatherCard />
      </section>
    </main>
  );
};

export default Home;

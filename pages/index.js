/* eslint-disable react/jsx-filename-extension */
import { useContext } from 'react';

import SearchCard from '../components/SearchCard';
import WeatherChart from '../components/WeatherChart';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import { LocationContext } from '../utils/context/locationProvider';

const Home = () => {
  const {
    location: { longitude, latitude },
  } = useContext(LocationContext);

  return (
    <div className="flex-1 w-full max-w-screen-lg mx-auto">
      <div className="grid gap-4 mx-4 md:grid-cols-3">
        <section className="space-y-4">
          <SearchCard />
          <WeatherCard />
        </section>
        <section className="md:col-span-2">
          <WeatherChart />
        </section>
        <section className="md:col-span-full">
          <WeatherMap longitude={longitude} latitude={latitude} />
        </section>
      </div>
    </div>
  );
};

export default Home;

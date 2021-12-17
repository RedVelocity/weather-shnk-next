/* eslint-disable react/jsx-filename-extension */
import { useContext } from 'react';
import dynamic from 'next/dynamic';

import { LocationContext } from '../lib/context/locationProvider';
import SearchCard from '../components/SearchCard';
import WeatherCard from '../components/WeatherCard';
import Skeleton from '../components/Skeleton';
import HourlyWeather from '../components/HourlyWeather';

const DynamicWeatherMap = dynamic(() => import('../components/WeatherMap'), {
  loading: () => <Skeleton rows={5} />,
});

const DynamicWeatherChart = dynamic(
  () => import('../components/WeatherChart'),
  {
    loading: () => <Skeleton rows={5} />,
  }
);

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
          <HourlyWeather />
        </section>
        <section>
          <DynamicWeatherMap longitude={longitude} latitude={latitude} />
        </section>
        <section className="md:col-span-2 bg-cool card">
          <DynamicWeatherChart />
        </section>
      </div>
    </div>
  );
};

export default Home;

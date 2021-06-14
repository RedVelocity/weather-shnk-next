/* eslint-disable react/jsx-filename-extension */

import WeatherChart from '../components/WeatherChart';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import SearchCard from '../components/SearchCard';

const Home = () => (
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
        <WeatherMap />
      </section>
    </div>
  </div>
);

export default Home;

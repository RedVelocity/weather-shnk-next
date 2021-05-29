import React from 'react';
import WeatherChart from '../components/WeatherChart';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import SearchCard from '../components/SearchCard';

const Home = () => {
  return (
    <div className="flex-1 w-full max-w-screen-lg mx-auto">
      <div className="grid max-w-xl gap-4 px-4 mx-auto md:max-w-full md:grid-cols-3">
        <SearchCard />
        <WeatherCard />
        <div className="md:col-start-2 md:row-span-2 md:col-span-2 md:row-start-1">
          <WeatherChart />
        </div>
        <div className="md:col-span-full">
          <WeatherMap />
        </div>
      </div>
    </div>
  );
};

export default Home;

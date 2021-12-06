/* eslint-disable react/jsx-filename-extension */
import { useContext, useEffect } from 'react';

import { getLocation } from '../utils/API';
import { LocationContext } from '../utils/context/locationProvider';
import SearchCard from '../components/SearchCard';
import WeatherChart from '../components/WeatherChart';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';

const Home = () => {
  // Set location data if location access is provided
  const { setLocation } = useContext(LocationContext);
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocation(latitude, longitude);
        locationName !== 0 &&
          setLocation({
            name: locationName,
            latitude,
            longitude,
            curLat: latitude,
            curLon: longitude,
          });
      });
    }
  }, []);

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
          <WeatherMap />
        </section>
      </div>
    </div>
  );
};

export default Home;

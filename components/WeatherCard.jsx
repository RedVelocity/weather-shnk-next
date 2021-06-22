import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import weatherIcons from '../assets/svg/weatherIcons';
import { WeatherContext } from '../context/weatherProvider';
import { getLocation, getWeather } from '../API';
import { LocationContext } from '../context/locationProvider';

const WeatherCard = () => {
  const {
    weatherData: { current },
    setWeatherData,
    theme,
  } = useContext(WeatherContext);
  const { location, setLocation } = useContext(LocationContext);
  let temp = '--';
  let additionalInfo = '--';
  // Set location data if location access is provided
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
  // Update weather on location change
  useEffect(() => {
    (async () => {
      if (location.name !== '-- Search Place Name') {
        const weather = await getWeather(location.latitude, location.longitude);
        weather !== 0 && setWeatherData(weather);
      }
    })();
  }, [location]);

  if (current.weather.description !== '--') {
    temp = `${Math.round(current.temp)}°C`;
    additionalInfo = `Feels Like: ${Math.round(
      current.feels_like
    )}°C | Humidity: ${current.humidity} | UV: ${current.uvi}`;
  }

  return (
    <div
      className={`card p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
    >
      <div className="flex items-center gap-6 p-4 text-center justify-evenly">
        <motion.img
          layout="position"
          className="w-20 h-20"
          alt="icon"
          src={weatherIcons[current.weather.icon]}
        />
        <motion.h1 layout className="text-2xl font-bold capitalize">
          {current.weather.description}
        </motion.h1>
        <motion.div layout>
          Currently
          <h1 className="text-4xl">{temp}</h1>
        </motion.div>
      </div>
      <span className="block p-2 text-sm tracking-wide text-center bg-gray-200 rounded">
        {additionalInfo}
      </span>
      <div className="flex items-center pt-4 space-x-2 text-sm">
        <img
          alt="location"
          src="https://img.icons8.com/material-outlined/20/000000/marker.png"
        />
        <h5 className="ml-1">{location.name}</h5>
      </div>
    </div>
  );
};

export default WeatherCard;

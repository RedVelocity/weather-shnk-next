import { useContext, useEffect } from 'react';
import weatherIcons from '../assets/svg/weatherIcons';
import { WeatherContext } from '../context/weatherProvider';
import { getLocation, getWeather } from '../API';
import { LocationContext } from '../context/locationProvider';

const WeatherCard = () => {
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const { location, setLocation } = useContext(LocationContext);

  let theme;
  if (weatherData.current?.feels_like <= 15) theme = 'cold';
  else if (weatherData.current?.feels_like <= 28) theme = 'mild';
  else theme = 'hot';

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        const locationName = await getLocation(lat, lon);
        setLocation({
          name: locationName,
          latitude: lat,
          longitude: lon,
          curLat: lat,
          curLon: lon,
        });
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (location.name !== '-- Grant Location Access') {
        const weather = await getWeather(location.latitude, location.longitude);
        weather !== 0 && setWeatherData(weather);
      }
    })();
  }, [location]);

  return (
    <div
      className={`grid md:col-start-1 card p-4 font-semibold transition-colors duration-1000 ease-in-out ${theme}`}
    >
      <>
        <div className="flex items-center gap-6 p-4 text-center justify-evenly">
          <img
            className="w-20 h-20"
            alt="icon"
            src={weatherIcons[weatherData.current.weather[0].icon]}
          />
          <h1 className="text-2xl font-bold capitalize">
            {weatherData.current.weather[0].description}
          </h1>
          <div>
            Currently
            <h1 className="text-4xl">
              {Math.round(weatherData.current?.temp)}°C
            </h1>
          </div>
        </div>{' '}
        <span className="p-2 text-sm tracking-wide text-center bg-gray-200 rounded">
          Feels Like: {Math.round(weatherData.current.feels_like)}°C | Humidity:{' '}
          {weatherData.current.humidity} | UV: {weatherData.current.uvi}
        </span>
        <div className="flex items-center pt-4 space-x-2 text-sm">
          <img
            alt="location"
            src="https://img.icons8.com/material-outlined/20/000000/marker.png"
          />
          <h5 className="ml-1">{location.name}</h5>
        </div>
      </>
    </div>
  );
};

export default WeatherCard;

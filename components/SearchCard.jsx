import React, { useContext, useEffect, useState } from 'react';
import { getSuggestions, getWeather } from '../API';
import { LocationContext } from '../context/locationProvider';
import { WeatherContext } from '../context/weatherProvider';
import useDebounce from '../hooks/useDebounce';

const SearchCard = () => {
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const { setLocation, location } = useContext(LocationContext);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  let theme;
  if (weatherData.current?.feels_like <= 15) theme = 'cold';
  else if (weatherData.current?.feels_like <= 28) theme = 'mild';
  else theme = 'hot';

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        const handleSearch = async () => {
          const features = await getSuggestions(
            location.curLat,
            location.curLon,
            debouncedSearchTerm
          );
          setSuggestions(features);
        };
        handleSearch();
      } else {
        setSuggestions([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleInputChange = async (e) => {
    const loc = suggestions.find((suggestion) => suggestion.id === e.target.id);
    setLocation({
      ...location,
      name: e.target.innerText,
      latitude: loc.geometry.coordinates[1],
      longitude: loc.geometry.coordinates[0],
    });
    setShowSuggestions(false);
    const weather = await getWeather(
      loc.geometry.coordinates[1],
      loc.geometry.coordinates[0]
    );
    weather !== 0 && setWeatherData(weather);
  };

  return (
    <div className="p-4 card bg-dark">
      <h1 className="text-xl font-semibold text-gray-200">Search</h1>
      <div className="relative mt-4">
        <input
          className="w-full p-2 mb-4 bg-gray-200 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-400"
          type="text"
          placeholder="Place Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        {suggestions.length > 0 && (
          <div
            className={`absolute transition duration-300 bg-white w-full rounded-xl shadow p-2 z-10 ${
              !showSuggestions && 'opacity-0 invisible'
            }`}
          >
            <ul className="overflow-x-hidden max-h-64">
              {suggestions.map((suggestion) => (
                <li
                  className={`hover-${theme} cursor-pointer px-2 py-1 rounded-xl mx-1`}
                  key={suggestion.id}
                  id={suggestion.id}
                  onClick={handleInputChange}
                >
                  <h3 className="text-lg underline pointer-events-none text-bold">
                    {suggestion.text_en}
                  </h3>
                  {suggestion.context.map((ctx, index) =>
                    suggestion.context.length === index + 1
                      ? `${ctx.text_en}.`
                      : `${ctx.text_en}, `
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;

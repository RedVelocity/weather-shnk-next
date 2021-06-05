import React, { useContext, useEffect, useState } from 'react';
import { getPlaces } from '../API';
import { LocationContext } from '../context/locationProvider';
import { WeatherContext } from '../context/weatherProvider';
import useDebounce from '../hooks/useDebounce';
import SuggestionsList from './SuggestionsList';

const SearchCard = () => {
  const { weatherData } = useContext(WeatherContext);
  const { setLocation, location } = useContext(LocationContext);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  let theme;
  if (weatherData.current?.feels_like <= 15) theme = 'cold';
  else if (weatherData.current?.feels_like <= 28) theme = 'mild';
  else theme = 'hot';

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        const handleInputChange = async () => {
          const places = await getPlaces(
            location.curLat,
            location.curLon,
            debouncedSearchTerm
          );
          setSuggestions(places);
        };
        handleInputChange();
      } else {
        setSuggestions([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleSelect = (e) => {
    const loc = suggestions.find((suggestion) => suggestion.id === e.target.id);
    setLocation({
      ...location,
      name: e.target.innerText,
      latitude: loc.coordinates[1],
      longitude: loc.coordinates[0],
    });
    setShowSuggestions(false);
  };

  return (
    <div className="p-4 card bg-dark">
      <h1 className="text-xl font-semibold text-gray-200">Search</h1>
      <div className="relative mt-4">
        <input
          className="w-full p-2 mb-4 bg-gray-200 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-400"
          type="text"
          placeholder="Place Name"
          id="popup-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        {suggestions.length > 0 && (
          <SuggestionsList
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            handleSelect={handleSelect}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default SearchCard;

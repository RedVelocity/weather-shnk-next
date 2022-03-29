import { useEffect, useState } from 'react';
import { getPlaces } from '../lib/api';
import { useLocation } from '../lib/context/locationProvider';
import { useWeather } from '../lib/context/weatherProvider';
import useDebounce from '../lib/hooks/useDebounce';
import PopupList from './PopupList';

const SearchCard = () => {
  const { theme } = useWeather();
  const { setLocation, location } = useLocation();
  const [placesList, setPlacesList] = useState([]);
  const [showPopupList, setShowPopupList] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  // Handler for outside click
  const handleOutsideClick = (e) => {
    if (e.target.attributes['data-suggestion-item']) {
      return;
    }
    setShowPopupList(false);
  };
  // Handler for popup item select
  const handleSelect = (e) => {
    const loc = placesList.find((suggestion) => suggestion.id === e.target.id);
    setLocation({
      ...location,
      name: e.target.innerText,
      latitude: loc.coordinates[1],
      longitude: loc.coordinates[0],
    });
    setShowPopupList(false);
  };
  // Add listener for Outside click
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick, false);
    return () =>
      document.removeEventListener('mousedown', handleOutsideClick, false);
  }, []);
  // Update list on input change
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        const handleInputChange = async () => {
          const places = await getPlaces(
            location.curLat,
            location.curLon,
            debouncedSearchTerm
          );
          setPlacesList(places);
        };
        handleInputChange();
      } else {
        setPlacesList([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className="p-4 card bg-dark">
      <h1 className="text-xl font-semibold text-gray-200">Search</h1>
      <div className="relative mt-4">
        <input
          className="w-full p-2 mb-4 bg-gray-200 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-400"
          type="text"
          autoComplete="off"
          placeholder="Place Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowPopupList(true)}
        />
        {showPopupList && (
          <PopupList
            list={placesList}
            handleSelect={handleSelect}
            color={theme}
          />
        )}
      </div>
    </div>
  );
};

export default SearchCard;

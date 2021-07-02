import { useContext, useEffect, useState } from 'react';
import { getPlaces } from '../utils/API';
import { LocationContext } from '../utils/context/locationProvider';
import { WeatherContext } from '../utils/context/weatherProvider';
import useDebounce from '../utils/hooks/useDebounce';
import PopupList from './PopupList';

const SearchCard = () => {
  const { theme } = useContext(WeatherContext);
  const { setLocation, location } = useContext(LocationContext);
  const [placesList, setPlacesList] = useState([]);
  const [showPopupList, setShowPopupList] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);

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

  return (
    <div className="p-4 card bg-dark">
      <h1 className="text-xl font-semibold text-gray-200">Search</h1>
      <div className="relative mt-4">
        <input
          className="w-full p-2 mb-4 bg-gray-200 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-400"
          type="text"
          autoComplete="off"
          placeholder="Place Name"
          id="popup-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowPopupList(true)}
        />
        {placesList.length > 0 && (
          <PopupList
            list={placesList}
            showPopupList={showPopupList}
            setShowPopupList={setShowPopupList}
            handleSelect={handleSelect}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default SearchCard;

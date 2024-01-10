'use client';

import { useEffect, useState } from 'react';
import { useClickOutside, useDebouncedValue } from '@mantine/hooks';
import { getPlaces } from '@/lib/api';
import useWeather from '@/lib/hooks/useWeather';
import useLocation from '@/lib/hooks/useLocation';
import PopupList from '@/components/PopupList';

const SearchCard = () => {
  const { theme } = useWeather();
  const { location } = useLocation();
  const [placesList, setPlacesList] = useState([]);
  const [showPopupList, setShowPopupList] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 200);
  const ref = useClickOutside(() => setShowPopupList(false));
  // Update list on input change
  useEffect(
    () => {
      if (debouncedSearch) {
        (async () => {
          const places = await getPlaces(
            location.curLat,
            location.curLon,
            debouncedSearch
          );
          setPlacesList(places);
        })();
      } else {
        setPlacesList([]);
      }
    },
    [debouncedSearch] // Only call effect if debounced search term changes
  );

  return (
    <div className="p-4 card bg-dark">
      <h1 className="text-xl font-semibold text-gray-200 tracking-wide">
        Search
      </h1>
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
        {/* {showPopupList && ( */}
        <PopupList
          ref={ref}
          list={placesList}
          handleSelect={() => setShowPopupList(false)}
          color={theme}
          showPopupList={showPopupList}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default SearchCard;

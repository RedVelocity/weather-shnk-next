/* eslint-disable react/prop-types */

'use client';

import { useEffect, useState } from 'react';
import { useClickOutside, useDebouncedValue } from '@mantine/hooks';
import { getPlaces } from '@/lib/api';
// import useWeather from '@/lib/hooks/useWeather';
// import useLocation from '@/lib/hooks/useLocation';
import PopupList from '@/components/PopupList';
import useTheme from '@/lib/hooks/useTheme';

const SearchCard = ({ weather, location }) => {
  const { theme } = useTheme(weather.current.temp);
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
      <h3 className="text-gray-200">Search</h3>
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

/* eslint-disable react/prop-types */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDebouncedValue } from '@mantine/hooks';
import { Combobox } from '@headlessui/react';
// import useWeather from '@/lib/hooks/useWeather';
// import useLocation from '@/lib/hooks/useLocation';
import { getPlaces } from '@/lib/api';
import useTheme from '@/lib/hooks/useTheme';

const SearchCard = ({ weather, location }) => {
  const theme = useTheme(weather.current.temp);
  const [placesList, setPlacesList] = useState([]);
  const router = useRouter();
  // Current combobox item
  const [selectedPlace, setSelectedPlace] = useState(placesList[0]);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 200);
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
      <div className="relative my-4">
        <Combobox
          value={selectedPlace || ''}
          onChange={(place) => {
            setSelectedPlace(place);
            router.push(
              `weather?q=${place.place_name},${place.place_locality
                .replaceAll(', ', ',')
                .replaceAll('.', '')}`,
              { scroll: false }
            );
          }}
          by="id"
        >
          <div className="relative rounded">
            <Combobox.Input
              onChange={(e) => setSearchInput(e.target.value)}
              displayValue={(place) => place.place_name}
              className="w-full p-2 bg-gray-200 rounded-l rounded-r-full shadow-lg focus:outline-none focus:ring focus:ring-blue-400"
              autoComplete="off"
              placeholder="Search Place"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center mr-1">
              <Image
                src="/assets/icons/up-arrow.png"
                className="rotate-180"
                width={25}
                height={25}
                aria-hidden="true"
                alt="Open Menu"
              />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute z-10 min-w-full p-2 mt-2 text-gray-900 bg-gray-100 shadow rounded-xl">
            <div className="overflow-x-hidden max-h-64">
              {placesList?.map((place) => (
                <Combobox.Option
                  key={place.id}
                  value={place}
                  className={`ui-active:bg-blue-200 hover-${theme} rounded-lg px-2 py-1 cursor-pointer`}
                >
                  <div className="pointer-events-none">
                    <h5>{place.place_name}</h5>
                    <p>{place.place_address}</p>
                  </div>
                </Combobox.Option>
              ))}
            </div>
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  );
};

export default SearchCard;

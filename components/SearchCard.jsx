/* eslint-disable react/prop-types */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useDebouncedValue } from '@mantine/hooks';
import { Combobox } from '@headlessui/react';
import { useRouter } from 'next13-progressbar';
// import useWeather from '@/lib/hooks/useWeather';
// import useLocation from '@/lib/hooks/useLocation';
import { getPlaces } from '@/lib/actions';
import getTheme from '@/lib/utils/getTheme';
import useRecentSearch from '@/lib/hooks/useRecentSearch';

const variants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
  },
  initial: {
    opacity: 0,
    scale: 0.9,
  },
};

const colorVariants = {
  hot: 'ui-active:bg-gradient-hot ui-active:text-primary hover:bg-gradient-hot hover:text-primary',
  mild: 'ui-active:bg-gradient-mild ui-active:text-primary hover:bg-gradient-mild hover:text-primary',
  cool: 'ui-active:bg-gradient-cool ui-active:text-primary hover:bg-gradient-cool hover:text-primary',
};

const SearchCard = ({ weather, location }) => {
  const router = useRouter();
  const theme = getTheme(weather.current.temp);
  const [placesList, setPlacesList] = useState([]);
  // Recent search items
  const { searches, addSearch } = useRecentSearch();
  // Selected combobox item
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
    <div className="z-10 p-4 card bg-wrapper-dark dark:bg-wrapper-dark/60 dark:backdrop-blur">
      <h3 className="text-primary-dark">Search</h3>
      <div className="relative my-4">
        <Combobox
          value={selectedPlace || ''}
          onChange={(place) => {
            addSearch(place);
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
          {({ open }) => (
            <>
              <div className="relative">
                <Combobox.Input
                  onChange={(e) => setSearchInput(e.target.value)}
                  displayValue={(place) => place.place_name}
                  className="w-full p-2 rounded-l bg-surface dark:bg-surface-dark rounded-r-3xl"
                  autoComplete="off"
                  placeholder="Place Name"
                />
                <Combobox.Button
                  className="absolute inset-y-0 right-0 flex items-center h-10 focus:ring-0 aspect-square"
                  name="Toggle Menu"
                >
                  <Image
                    src="/assets/icons/chevron-down.png"
                    className={`${
                      open && 'rotate-180'
                    } transition-transform duration-200 ease-in-out`}
                    fill
                    alt="Toggle Menu"
                  />
                </Combobox.Button>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Combobox.Options
                      static
                      className="absolute z-20 min-w-full mt-2 overflow-hidden rounded-lg shadow bg-surface dark:bg-surface-dark"
                    >
                      <div className="overflow-x-hidden max-h-80">
                        {placesList.length > 0 &&
                          searchInput !== '' &&
                          placesList.map((place) => (
                            <Option
                              place={place}
                              theme={theme}
                              key={place.id}
                            />
                          ))}
                        {searches.length > 0 && searchInput === '' && (
                          <>
                            <h5 className="px-4 py-1 mb-1 tracking-wide capitalize border-b border-gray">
                              Recent Searches
                            </h5>
                            {searches.toReversed().map((place) => (
                              <Option place={place} theme={theme} key={place} />
                            ))}
                          </>
                        )}
                      </div>
                    </Combobox.Options>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </Combobox>
      </div>
    </div>
  );
};

const Option = ({ place, theme }) => (
  <Combobox.Option
    key={place.id}
    value={place}
    className={`${colorVariants[theme]} rounded-lg px-2 py-1 cursor-pointer mx-2 first:mt-2 last:mb-2 group`}
  >
    <h5>{place.place_name}</h5>
    <p className="text-secondary dark:text-secondary-dark group-hover:text-secondary ui-active:text-secondary dark:ui-active:text-secondary">
      {place.place_address}
    </p>
  </Combobox.Option>
);

export default SearchCard;

/* eslint-disable react/prop-types */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '@mantine/hooks';
import { AnimatePresence, m as motion } from 'framer-motion';
import PropTypes from 'prop-types';
// import useLocation from '@/lib/hooks/useLocation';

const popInOut = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const Favorites = ({ location }) => (
  <div className="flex flex-col min-h-full gap-4 wrapper">
    <h3>Favorites</h3>
    <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
      <FavButton favKey="fav-1" location={location} />
      <FavButton favKey="fav-2" location={location} />
      <FavButton favKey="fav-3" location={location} />
      <FavButton favKey="fav-4" location={location} />
    </div>
  </div>
);

const FavButton = ({ favKey, location }) => {
  // const { location } = useLocation();
  const [fav, setFav, removeFav] = useLocalStorage({
    key: favKey,
    defaultValue: 'unset',
  });
  const renderFav = fav !== 'unset';
  const [locName, ...locRegion] = renderFav ? fav.name.split(',') : ['', ''];

  return (
    <div className="relative h-28 sm:h-full">
      <AnimatePresence initial={false}>
        {renderFav && (
          <motion.div
            className="absolute inset-0 w-full h-full p-4 card bg-slate-300"
            variants={popInOut}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`${renderFav}-${favKey}`}
          >
            <Link
              href={`weather?q=${encodeURI(fav.name.replaceAll(', ', ','))}`}
              passHref
              className="flex flex-col items-center justify-center h-full text-center"
              scroll={false}
            >
              <h3>{locName}</h3>
              <p>{locRegion.join(', ')}</p>
            </Link>
            <button
              type="button"
              onClick={removeFav}
              className="absolute top-0 right-0 z-20 h-6 m-2 aspect-square"
            >
              <Image
                src="/assets/weather-icons/close.png"
                fill
                alt="Remove Favorite"
              />
            </button>
          </motion.div>
        )}
        <button
          type="button"
          className="flex items-center justify-center w-full h-full p-4 card"
          onClick={() => setFav(location)}
        >
          <Image
            src="/assets/weather-icons/add.png"
            height={50}
            width={50}
            alt="Add Favorite"
          />
        </button>
      </AnimatePresence>
    </div>
  );
};

FavButton.propTypes = {
  favKey: PropTypes.string.isRequired, // Ensure favKey prop is required and of type string
};

export default Favorites;

/* eslint-disable react/prop-types */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '@mantine/hooks';
import { AnimatePresence, m as motion } from 'framer-motion';

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
const MAX_FAVORITES = 4;

const Favorites = ({ location }) => {
  const [favorites, setFavorites] = useLocalStorage({
    key: 'favorites',
    defaultValue: new Array(MAX_FAVORITES).fill('unset'),
  });
  const [initial, setInitial] = useState(false);

  const handleSetFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = location;
    setInitial(true);
    setFavorites(updatedFavorites);
  };

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = 'unset';
    setFavorites(updatedFavorites);
  };

  return (
    <div className="flex flex-col min-h-full gap-4 wrapper">
      <h3>Favorites</h3>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
        <AnimatePresence initial={false} mode="popLayout">
          {favorites.map((fav, index) =>
            fav !== 'unset' ? (
              <motion.div
                className="relative h-28 sm:min-h-full"
                key={`fav-${index}-${fav.name}`}
                variants={popInOut}
                initial={initial ? 'initial' : false}
                animate="animate"
                exit="exit"
              >
                <FavButton
                  favorite={fav}
                  removeFavorite={() => handleRemoveFavorite(index)}
                />
              </motion.div>
            ) : (
              <div
                className="relative h-28 sm:min-h-full"
                key={`addFav-${index}-${fav.name}`}
              >
                <AddFavButton setFavorite={() => handleSetFavorite(index)} />
              </div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AddFavButton = ({ setFavorite }) => (
  <button
    type="button"
    className="absolute inset-0 flex items-center justify-center w-full h-full p-4 card"
    onClick={setFavorite}
  >
    <Image
      src="/assets/icons/add.png"
      height={50}
      width={50}
      alt="Add Favorite"
    />
  </button>
);

const FavButton = ({ favorite, removeFavorite }) => {
  const [locName, ...locRegion] = favorite.name.split(',');
  return (
    <div className="absolute inset-0 w-full h-full">
      <Link
        href={`/${encodeURI(favorite.name.replaceAll(', ', ','))}`}
        passHref
        className="flex flex-col items-center justify-center h-full p-6 overflow-hidden text-center surface card"
        scroll={false}
      >
        <h3>{locName}</h3>
        <p className="secondary">{locRegion.join(', ')}</p>
      </Link>
      <button
        type="button"
        onClick={removeFavorite}
        className="absolute dark:saturate-[75%] top-0 right-0 z-20 h-8 sm:h-10 card aspect-square bg-[#BF392B]"
      >
        <Image
          src="/assets/icons/close.png"
          fill
          alt="Remove Favorite"
          sizes="2rem"
        />
      </button>
    </div>
  );
};

export default Favorites;

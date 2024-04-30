/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '@mantine/hooks';
import { AnimatePresence, m as motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [favIndex, setFavIndex] = useState(0);
  const [favorites, setFavorites] = useLocalStorage({
    key: 'favorites',
    defaultValue: new Array(MAX_FAVORITES).fill('unset'),
  });

  const handleSetFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = location;
    setFavorites(updatedFavorites);
    setIsOpen(false);
  };

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = 'unset';
    setFavorites(updatedFavorites);
  };

  return (
    <div className="flex flex-col min-h-full gap-4 wrapper">
      <h3>Favorites</h3>
      <FavModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        location={location}
        handleSetFavorite={handleSetFavorite}
        favIndex={favIndex}
      />
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
        <AnimatePresence initial={false} mode="popLayout">
          {favorites.map((fav, index) =>
            fav !== 'unset' ? (
              <motion.div
                className="relative h-28 sm:min-h-full"
                key={`fav-${index}-${fav.name}`}
                variants={popInOut}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <FavButton
                  favorite={fav}
                  removeFavorite={() => handleRemoveFavorite(index)}
                />
              </motion.div>
            ) : (
              <motion.div
                className="relative h-28 sm:min-h-full"
                key={`addFav-${index}`}
                variants={popInOut}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId="addFav"
              >
                <AddFavButton
                  setFavorite={() => {
                    setFavIndex(index);
                    setIsOpen(true);
                  }}
                />
              </motion.div>
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
        href={`weather?q=${encodeURI(favorite.name.replaceAll(', ', ','))}`}
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
        <Image src="/assets/icons/close.png" fill alt="Remove Favorite" />
      </button>
    </div>
  );
};

const FavModal = ({
  closeModal,
  isOpen,
  favIndex,
  location,
  handleSetFavorite,
}) => (
  <Dialog as="div" className="relative z-30" onClose={closeModal} open={isOpen}>
    <motion.div
      className="fixed inset-0 bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
    <motion.div layoutId="addFav" transition={{ duration: 1.5 }}>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-wrapper dark:bg-wrapper-dark card">
            <Dialog.Title as="h3">Add Favorite</Dialog.Title>
            <button
              type="button"
              className="flex flex-col items-center justify-center w-full p-2 mt-4 text-center surface card"
              onClick={() => handleSetFavorite(favIndex)}
            >
              <h3>{location.name.split(',')[0]}</h3>
              <p className="secondary">{location.name.split(',')[1]}</p>
            </button>
          </Dialog.Panel>
        </div>
      </div>
    </motion.div>
  </Dialog>
);

Favorites.propTypes = {
  location: PropTypes.object.isRequired, // Ensure location prop is required and of type object
};

AddFavButton.propTypes = {
  setFavorite: PropTypes.func.isRequired, // Ensure setFavorite prop is required and of type function
};

FavButton.propTypes = {
  favorite: PropTypes.object.isRequired, // Ensure favorite prop is required and of type object
  removeFavorite: PropTypes.func.isRequired, // Ensure removeFavorite prop is required and of type function
};

export default Favorites;

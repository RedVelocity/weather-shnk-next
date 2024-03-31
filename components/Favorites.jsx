'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '@mantine/hooks';
import { motion } from 'framer-motion';
import useLocation from '@/lib/hooks/useLocation';

const variants = {
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
  },
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.9,
  },
};

const Favorites = () => (
  <div className="flex flex-col min-h-full wrapper">
    <h3>Favorites</h3>
    <div className="grid flex-1 grid-cols-2 gap-2 mt-4 sm:grid-cols-4">
      <FavButton favKey="fav-1" />
      <FavButton favKey="fav-2" />
      <FavButton favKey="fav-3" />
      <FavButton favKey="fav-4" />
    </div>
  </div>
);

export const FavButton = ({ favKey }) => {
  const { location } = useLocation();
  const [fav, setFav, removeFav] = useLocalStorage({
    key: favKey,
    defaultValue: 'unset',
  });

  if (fav === 'unset')
    return (
      <motion.button
        variants={variants}
        initial="initial"
        animate="animate"
        type="button"
        className="flex items-center justify-center p-4 h-28 sm:h-auto card"
        onClick={() => setFav(location)}
      >
        <Image
          src="/assets/weather-icons/add.png"
          height={50}
          width={50}
          alt="Add"
        />
      </motion.button>
    );

  const [locName, ...locRegion] = fav.name.split(',');

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className="relative p-4 h-28 card bg-slate-300 sm:h-auto"
    >
      <Link
        href={`weather?q=${encodeURI(fav.name.replaceAll(', ', ','))}`}
        passHref
        className="flex flex-col items-center justify-center h-full text-center"
        scroll={false}
      >
        <h3>{locName}</h3>
        <p>{locRegion}</p>
      </Link>
      <button
        type="button"
        onClick={() => removeFav()}
        className="absolute top-0 right-0 z-20 h-4 m-2 sm:h-6 aspect-square"
      >
        <Image
          src="/assets/weather-icons/close.png"
          layout="fill"
          alt="Close"
        />
      </button>
    </motion.div>
  );
};

export default Favorites;

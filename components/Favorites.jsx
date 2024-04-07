'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import useLocation from '@/lib/hooks/useLocation';

const variants = {
  animate: {
    y: 0,
    opacity: 1,
    // scale: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    y: -50,
    opacity: 0,
  },
  initial: {
    y: 50,
    opacity: 0,
    // scale: 0.9,
  },
};

const Favorites = () => (
  <div className="flex flex-col min-h-full wrapper">
    <h3>Favorites</h3>
    <div className="grid flex-1 grid-cols-2 gap-2 mt-4 sm:grid-cols-4">
      <AnimatePresence initial={false}>
        <FavButton favKey="fav-1" />
        <FavButton favKey="fav-2" />
        <FavButton favKey="fav-3" />
        <FavButton favKey="fav-4" />
      </AnimatePresence>
    </div>
  </div>
);

const FavButton = ({ favKey }) => {
  const { location } = useLocation();
  const [fav, setFav, removeFav] = useLocalStorage({
    key: favKey,
    defaultValue: 'unset',
  });
  const renderFav = fav !== 'unset';
  const [locName, ...locRegion] = renderFav ? fav.name.split(',') : ['', ''];

  if (renderFav) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        key={`${renderFav}-${favKey}`}
        className="relative p-4 h-28 card bg-slate-300 sm:h-auto"
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
            layout="fill"
            alt="Close"
          />
        </button>
      </motion.div>
    );
  } else {
    return (
      <motion.button
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        key={`${renderFav}-${favKey}`}
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
  }
};

export default Favorites;

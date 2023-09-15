'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
// import { m } from 'framer-motion';

// const variants = {
//   animate: {
//     opacity: 1,
//     height: 'auto',
//     transition: { duration: 0.25 },
//   },
//   exit: {
//     opacity: 0,
//   },
//   initial: {
//     opacity: 0,
//     height: 0,
//   },
// };

const PopupList = ({ list, handleSelect, color }) => (
  <>
    {list.length > 0 && (
      <div
        className="absolute z-10 min-w-full p-2 bg-white shadow rounded-xl"
        // variants={variants}
        // initial="initial"
        // animate="animate"
        // exit="exit"
      >
        <ul className="overflow-x-hidden max-h-64">
          {list.map((listItem) => (
            <Link
              href={decodeURIComponent(`weather?q=${listItem.place_name}`)}
              key={listItem.id}
              id={listItem.id}
              onClick={handleSelect}
              // role="presentation"
              data-suggestion-item="true"
              passHref
            >
              <div
                className={`hover-${color} px-2 py-1 rounded-lg mx-1 pointer-events-none`}
              >
                <h3 className="text-lg font-medium">{listItem.place_name}</h3>
                <p>{listItem.place_address}</p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    )}
  </>
);

PopupList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      place_name: PropTypes.string.isRequired,
      place_locality: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSelect: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default PopupList;

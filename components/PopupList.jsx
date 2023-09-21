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

const PopupList = ({ list, handleSelect, color, showPopupList }) => (
  <>
    {list.length > 0 && showPopupList && (
      <div
        className="absolute z-10 min-w-full p-2 bg-white shadow rounded-xl"
        // variants={variants}
        // initial="initial"
        // animate="animate"
        // exit="exit"
      >
        <ul className="overflow-x-hidden max-h-64">
          {list.map((listItem) => (
            // eslint-disable-next-line @next/next/link-passhref
            <Link
              href={`weather?q=${listItem.place_name},${listItem.place_locality
                .replace(', ', ',')
                .replace('.', '')}`}
              // passHref
              onClick={handleSelect}
              key={listItem.id}
              id={listItem.id}
              data-suggestion-item="true"
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
  showPopupList: PropTypes.bool,
};

export default PopupList;

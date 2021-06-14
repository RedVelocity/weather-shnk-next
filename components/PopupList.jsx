import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  animate: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
  },
  initial: {
    opacity: 0,
    height: 0,
  },
};
const PopupList = ({
  list,
  showPopupList,
  setShowPopupList,
  handleSelect,
  theme,
}) => {
  const listNode = useRef(null);
  const handleClick = (e) => {
    if (listNode.current?.contains(e.target) || e.target.id === 'popup-input') {
      return;
    }
    // hide list on outside click
    setShowPopupList(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);
  return (
    <AnimatePresence>
      {showPopupList && (
        <motion.div
          ref={listNode}
          className="absolute z-10 w-full p-2 bg-white shadow rounded-xl"
          key="popup-list"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ul className="overflow-x-hidden max-h-64">
            {list.map((listItem) => (
              <li
                className={`hover-${theme} cursor-pointer px-2 py-1 rounded-xl mx-1`}
                key={listItem.id}
                id={listItem.id}
                onClick={handleSelect}
                role="presentation"
              >
                <h3 className="text-lg underline pointer-events-none">
                  {listItem.place_name}
                </h3>
                {listItem.place_locality}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PopupList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      place_name: PropTypes.string.isRequired,
      place_locality: PropTypes.string.isRequired,
    })
  ).isRequired,
  showPopupList: PropTypes.bool.isRequired,
  setShowPopupList: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default PopupList;

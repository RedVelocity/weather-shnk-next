import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LazyMotion, m, AnimatePresence, domAnimation } from 'framer-motion';

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
  color,
}) => {
  // hide list on outside click
  const listNode = useRef(null);
  const handleOutsideClick = (e) => {
    if (listNode.current?.contains(e.target) || e.target.id === 'popup-input') {
      return;
    }
    setShowPopupList(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick, false);
    return () =>
      document.removeEventListener('mousedown', handleOutsideClick, false);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {showPopupList && (
          <m.div
            ref={listNode}
            className="absolute z-10 w-full p-2 bg-white shadow rounded-xl"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ul className="overflow-x-hidden max-h-64">
              {list.map((listItem) => (
                <li
                  className={`hover-${color} cursor-pointer px-2 py-1 rounded-xl mx-1`}
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
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
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
  color: PropTypes.string.isRequired,
};

export default PopupList;

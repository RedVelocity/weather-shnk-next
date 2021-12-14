import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Motion } from 'react-motion';

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

// const willEnter = () => ({
//   height: 0,
//   opacity: 1,
// });

// const willLeave = () => ({
//   height: spring(0),
//   opacity: spring(0),
// });

const PopupList = ({
  list,
  showPopupList,
  setShowPopupList,
  handleSelect,
  color,
}) => {
  // const getStyles = () =>
  //   list.map((listItem) => ({
  //     data: { ...listItem },
  //     key: listItem.id,
  //     style: {
  //       height: spring(60, presets.gentle),
  //       opacity: spring(1, presets.gentle),
  //     },
  //   }));
  // const getDefaultStyles = () =>
  //   list.map((listItem) => ({
  //     key: listItem.id,
  //     style: {
  //       height: 0,
  //       opacity: 1,
  //     },
  //   }));
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
    showPopupList && (
      <>
        {/* <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: 1 }}> */}
        {(interpolatingStyle) => (
          <div
            // ref={listNode}
            className="absolute z-10 w-full p-2 bg-white shadow rounded-xl"
            style={interpolatingStyle}
            // variants={variants}
            // initial="initial"
            // animate="animate"
            // exit="exit"
          >
            <ul className="overflow-x-hidden max-h-64">
              {list.map((listItem) => (
                <li
                  className={`hover-${color} cursor-pointer px-2 py-1 rounded-xl mx-1`}
                  key={listItem.id}
                  id={listItem.id}
                  // style={listItem.style}
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
          </div>
        )}
        {/* </Motion> */}
      </>
    )
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

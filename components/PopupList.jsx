import React, { useEffect, useRef } from 'react';

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
    showPopupList && (
      <div
        ref={listNode}
        className={`absolute bg-white w-full rounded-xl shadow p-2 z-10`}
      >
        <ul className="overflow-x-hidden max-h-64">
          {list.map((listItem) => (
            <li
              className={`hover-${theme} cursor-pointer px-2 py-1 rounded-xl mx-1`}
              key={listItem.id}
              id={listItem.id}
              onClick={handleSelect}
            >
              <h3 className="text-lg underline pointer-events-none">
                {listItem.place_name}
              </h3>
              {listItem.place_locality}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default PopupList;

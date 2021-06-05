import React, { useEffect, useRef } from 'react';

const SuggestionsList = ({
  suggestions,
  showSuggestions,
  setShowSuggestions,
  handleSelect,
  theme,
}) => {
  const listNode = useRef(null);
  const handleClick = (e) => {
    if (listNode.current?.contains(e.target) || e.target.id === 'popup-input') {
      return;
    }
    // hide list on outside click
    setShowSuggestions(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    showSuggestions && (
      <div
        ref={listNode}
        className={`absolute transition duration-300 bg-white w-full rounded-xl shadow p-2 z-10 ${
          !showSuggestions && 'hidden'
        }`}
      >
        <ul className="overflow-x-hidden max-h-64">
          {suggestions.map((suggestion) => (
            <li
              className={`hover-${theme} cursor-pointer px-2 py-1 rounded-xl mx-1`}
              key={suggestion.id}
              id={suggestion.id}
              onClick={handleSelect}
            >
              <h3 className="text-lg underline pointer-events-none">
                {suggestion.place_name}
              </h3>
              {suggestion.place_locality}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SuggestionsList;

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
    if (listNode.current?.contains(e.target)) {
      return;
    }
    // hide list on outside click
    setShowSuggestions(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);

  return (
    <div
      ref={listNode}
      className={`absolute transition duration-300 bg-white w-full rounded-xl shadow p-2 z-10 
      ${!showSuggestions && 'opacity-0 invisible'}`}
    >
      <ul className="overflow-x-hidden max-h-64">
        {suggestions.map((suggestion) => (
          <li
            className={`hover-${theme} cursor-pointer px-2 py-1 rounded-xl mx-1`}
            key={suggestion.id}
            id={suggestion.id}
            onClick={handleSelect}
          >
            <h3 className="text-lg underline pointer-events-none text-bold">
              {suggestion.text_en}
            </h3>
            {suggestion.context.map((ctx, index) =>
              suggestion.context.length === index + 1
                ? `${ctx.text_en}.`
                : `${ctx.text_en}, `
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;

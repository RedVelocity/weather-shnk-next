import React, { createContext, useState } from 'react';

const LocationContext = createContext(undefined);

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    name: '-- Grant Location Access',
    latitude: 0,
    longitude: 0,
    curLat: 0,
    curLon: 0,
  });

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };

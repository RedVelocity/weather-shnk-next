/* eslint-disable react/jsx-filename-extension */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocationContext = createContext(undefined);

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    name: '-- Search Place Name',
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

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocationProvider, LocationContext };

/* eslint-disable react/jsx-filename-extension */
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getLocation } from '../API';

const LocationContext = createContext(undefined);

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    name: '-- Search Place Name',
    latitude: 0,
    longitude: 0,
    curLat: 0,
    curLon: 0,
  });
  // Set location data if location access is provided
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocation(latitude, longitude);
        locationName !== 0 &&
          setLocation({
            name: locationName,
            latitude,
            longitude,
            curLat: latitude,
            curLon: longitude,
          });
      });
    }
  }, []);

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

'use client';

import PropTypes from 'prop-types';
import useMap from '../lib/hooks/useMap';

const WeatherMap = ({ longitude, latitude }) => {
  const mapContainerRef = useMap(longitude, latitude);
  return <div className="h-80 md:h-full card" ref={mapContainerRef} />;
};

WeatherMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default WeatherMap;

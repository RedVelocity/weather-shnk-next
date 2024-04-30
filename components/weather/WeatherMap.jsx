'use client';

// import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const DynamicMap = dynamic(() => import('@/components/PigeonMap'), {
  ssr: false,
  loading: () => null,
});

const WeatherMap = ({ longitude, latitude }) => (
  <div
    className="h-80 md:h-full md:min-h-[250px] card overflow-hidden z-0"
    id="map"
  >
    <DynamicMap longitude={longitude} latitude={latitude} />
  </div>
);

WeatherMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default WeatherMap;

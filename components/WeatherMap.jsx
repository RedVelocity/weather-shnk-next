'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
// import LeafletMap from './LeafletMap';

const WeatherMap = ({ longitude, latitude }) => {
  const DynLeafletMap = useMemo(
    () =>
      dynamic(() => import('@/components/LeafletMap'), {
        ssr: false,
        loading: () => null,
      }),
    []
  );
  // const mapRef = useLeafletMap({ longitude, latitude });
  return (
    <div className="h-80 md:h-full card overflow-hidden" id="map">
      <DynLeafletMap longitude={longitude} latitude={latitude} />
    </div>
  );
};

WeatherMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default WeatherMap;

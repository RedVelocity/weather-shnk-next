// 'use client';

import Image from 'next/image';
import PropTypes from 'prop-types';
// import useMap from '@/lib/hooks/useMap';

// const mapContainerRef = useMap(longitude, latitude);
// return <div className="h-80 md:h-full card" ref={mapContainerRef} />;
const WeatherMap = ({ longitude, latitude }) => (
  <div className="h-80 md:h-full card relative overflow-hidden">
    <Image
      fill
      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+444(${longitude},${latitude})/${longitude},${latitude},9.5,0,0/400x400?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
      className="object-cover"
      quality={100}
      alt="map"
    />
  </div>
);

WeatherMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default WeatherMap;

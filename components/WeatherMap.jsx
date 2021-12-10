import { useContext } from 'react';
import { LocationContext } from '../utils/context/locationProvider';
import useMap from '../utils/hooks/useMap';

const WeatherMap = () => {
  const {
    location: { longitude, latitude },
  } = useContext(LocationContext);
  const mapContainerRef = useMap(longitude, latitude);
  return <div className="card h-80 md:h-96" ref={mapContainerRef} />;
};

export default WeatherMap;

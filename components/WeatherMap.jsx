import PropTypes from 'prop-types';
import useMap from '../lib/hooks/useMap';

const WeatherMap = ({ longitude, latitude }) => {
  const mapContainerRef = useMap(longitude, latitude);
  return <div className="h-80 md:h-100 card" ref={mapContainerRef} />;
};

WeatherMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default WeatherMap;

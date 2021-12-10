import PropTypes from 'prop-types';
import useMap from '../utils/hooks/useMap';

const WeatherMap = ({ longitude, latitude }) => {
  const mapContainerRef = useMap(longitude, latitude);
  return <div className="card h-80 md:h-96" ref={mapContainerRef} />;
};

WeatherMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default WeatherMap;

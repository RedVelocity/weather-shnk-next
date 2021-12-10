import useMap from '../utils/hooks/useMap';

const WeatherMap = () => {
  const mapContainerRef = useMap();
  return <div className="card h-80 md:h-96" ref={mapContainerRef} />;
};

export default WeatherMap;

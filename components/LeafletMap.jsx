'use client';

import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icon = new Icon({
  iconUrl: '/assets/icons/marker.png',
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const MapUpdater = ({ longitude, latitude }) => {
  const map = useMap();
  map.setView([latitude, longitude], 10);
  return <Marker position={[latitude, longitude]} icon={icon} />;
};

const LeafletMap = ({ longitude, latitude }) => (
  <MapContainer
    center={[latitude, longitude]}
    zoom={10}
    scrollWheelZoom={false}
    touchZoom={false}
    dragging={false}
    preferCanvas
  >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
      attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    />
    <MapUpdater longitude={longitude} latitude={latitude} />
  </MapContainer>
);

LeafletMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};
MapUpdater.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default LeafletMap;

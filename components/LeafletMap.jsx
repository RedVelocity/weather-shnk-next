'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';

// import colors from '../../styles/colors';

const LeafletMap = ({ longitude, latitude }) => (
  <MapContainer center={[latitude, longitude]} zoom={9} scrollWheelZoom={false}>
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
      attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    />
    {/* <Marker position={[latitude, longitude]} /> */}
  </MapContainer>
);

LeafletMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default LeafletMap;

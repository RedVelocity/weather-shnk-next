import PropTypes from 'prop-types';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import colors from '@/styles/colors';

const mapTiler = (x, y, z, dpr) =>
  `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/${z}/${x}/${y}${
    dpr >= 2 ? '@2x' : ''
  }?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

const PigeonMap = ({ longitude, latitude }) => (
  <Map
    provider={mapTiler}
    dprs={[1, 2]} // add this to support hidpi/retina (2x) maps if your provider supports them
    center={[latitude, longitude]}
    zoom={10}
    touchEvents={false}
    attributionPrefix={
      <>
        <a href="https://www.mapbox.com/">Mapbox</a>
        {' | '}
        <a href="https://pigeon-maps.js.org/">Pigeon</a>
      </>
    }
  >
    <ZoomControl />
    <Marker width={35} anchor={[latitude, longitude]} color={colors.milder} />
  </Map>
);

PigeonMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default PigeonMap;

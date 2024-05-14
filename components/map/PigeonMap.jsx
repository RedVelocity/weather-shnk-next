'use client';

import PropTypes from 'prop-types';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { colors, textColors } from '@/styles/colors';
import { useTheme } from 'next-themes';

const PigeonMap = ({ longitude, latitude }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const mapStyle = isDarkMode ? 'navigation-night-v1' : 'streets-v12';
  const mapTiler = (x, y, z, dpr) =>
    `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

  return (
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
      <ZoomControl
        buttonStyle={{
          background: isDarkMode ? colors.surface.dark : colors.surface.DEFAULT,
          color: isDarkMode
            ? textColors.secondary.dark
            : textColors.secondary.DEFAULT,
        }}
      />
      <Marker width={35} anchor={[latitude, longitude]} color={colors.milder} />
    </Map>
  );
};

PigeonMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

export default PigeonMap;

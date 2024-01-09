'use client';

import { useEffect, useRef } from 'react';
import { Map, TileLayer, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// import colors from '../../styles/colors';

const useLeafletMap = (longitude, latitude) => {
  const mapRef = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    // const map = L.map('map').setView([51.509, -0.08], 10);
    const map = new Map('map');
    const TL = new TileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      }
    );
    // TL.addTo(map);
    map.setView([51.509, -0.08], 10);
    // L.TileLayer(
    //   `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`,
    //   {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    //   }
    // ).addTo(map.current);
    // add marker
    // marker.current = L.marker([51.5, -0.09]).addTo(map.current);
    // console.log('map.current', map.current);
    mapRef.current = map;
    // clean up on unmount
    // eslint-disable-next-line consistent-return
    return () => mapRef.current.remove();
  }, []);

  // useEffect(() => {
  //   if (!map.current) return;
  //   // Update marker/map on state change
  //   map.current.setView([51.509, -0.08], 10);
  //   marker.current.setLatLng([latitude, longitude]).addTo(map.current);
  // }, [longitude, latitude]);

  return mapRef;
};

export default useLeafletMap;

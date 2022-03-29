import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { hot } from '../../styles/colors';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

const useMap = (longitude, latitude) => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 10,
      interactive: false,
    });
    // add marker
    marker.current = new mapboxgl.Marker({ color: hot });
    // add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    // clean up on unmount
    // eslint-disable-next-line consistent-return
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!map.current) return;
    // Update marker on state change
    map.current.setCenter([longitude, latitude]);
    marker.current.setLngLat([longitude, latitude]).addTo(map.current);
  }, [longitude, latitude]);

  return mapContainerRef;
};

export default useMap;

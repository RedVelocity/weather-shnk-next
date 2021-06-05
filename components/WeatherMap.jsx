import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationContext } from '../context/locationProvider';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
let marker; // current marker

const WeatherMap = () => {
  const {
    location: { longitude, latitude },
  } = useContext(LocationContext);
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 10,
      interactive: false,
    });
    // add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    // clean up on unmount
    return () => map.current.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current) return;
    // clear existing marker
    marker?.remove();
    // add marker
    map.current.setCenter([longitude, latitude]);
    map.current.setZoom(10);
    marker = new mapboxgl.Marker({ color: '#EF4444' });
    marker.setLngLat([longitude, latitude]).addTo(map.current);
  }, [longitude, latitude]);

  return <div className="card h-96" ref={mapContainerRef}></div>;
};

export default WeatherMap;

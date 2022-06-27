// import { useEffect } from 'react';
import shallow from 'zustand/shallow';
// import { getLocation } from '../api';
// import useLocationStore from '../store/useLocationStore';
import { useStore } from '../store/useWeatherStore';

const useLocation = () => {
  const location = useStore((state) => state.location, shallow);
  const setLocation = useStore((state) => state.setLocation);
  // Set location data if location access is provided
  // useEffect(() => {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         const locationName = await getLocation(latitude, longitude);
  //         locationName !== 0 &&
  //           setLocation({
  //             name: locationName,
  //             latitude,
  //             longitude,
  //             curLat: latitude,
  //             curLon: longitude,
  //           });
  //       },
  //       // if No Location found
  //       () => {
  //         setLocation({
  //           name: 'Bangalore, Karnataka, India.',
  //           latitude: 12.972442,
  //           longitude: 77.580643,
  //           curLat: 0,
  //           curLon: 0,
  //         });
  //       }
  //     );
  //   }
  // }, []);
  return { location, setLocation };
};

export default useLocation;

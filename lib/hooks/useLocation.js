import { useEffect } from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import shallow from 'zustand/shallow';
import { getLocation } from '../api';
// import { useContext } from 'react';
// import { LocationContext } from '../context/locationProvider';

const useStore = create(
  immer((set) => ({
    location: {
      name: 'Bangalore, Karnataka, India.',
      latitude: 12.972442,
      longitude: 77.580643,
      curLat: 0,
      curLon: 0,
    },
    setLocation: (location) =>
      set((state) => {
        // eslint-disable-next-line no-param-reassign
        state.location = location;
      }),
  }))
);

const useLocation = () => {
  const location = useStore((state) => state.location, shallow);
  const setLocation = useStore((state) => state.setLocation);
  // const { location, setLocation } = useContext(LocationContext);
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocation(latitude, longitude);
        locationName !== 0 &&
          setLocation({
            name: locationName,
            latitude,
            longitude,
            curLat: latitude,
            curLon: longitude,
          });
      });
    }
  }, []);
  return { location, setLocation };
};

export default useLocation;

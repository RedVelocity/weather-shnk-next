import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useLocationStore = create(
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

export default useLocationStore;

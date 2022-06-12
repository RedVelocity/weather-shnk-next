import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useLocationStore = create(
  immer((set) => ({
    location: {
      latitude: 0,
      longitude: 0,
    },
    setLocation: (location) =>
      set((state) => {
        // eslint-disable-next-line no-param-reassign
        state.location = location;
      }),
  }))
);

export default useLocationStore;

/* eslint-disable no-param-reassign */
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWeatherStore = create(
  immer((set) => ({
    theme: 'cool',
    weatherData: {},
    setTheme: (theme) =>
      set((state) => {
        state.theme = theme;
      }),
    setWeatherData: (weather) =>
      set((state) => {
        state.weatherData = weather;
      }),
  }))
);

export default useWeatherStore;

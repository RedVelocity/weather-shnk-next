import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWeatherStore = create(
  immer((set) => ({
    theme: 'cool',
    weatherData: {},
    setTheme: (theme) =>
      set((state) => {
        // eslint-disable-next-line no-param-reassign
        state.theme = theme;
      }),
    setWeatherData: (weather) =>
      set((state) => {
        // eslint-disable-next-line no-param-reassign
        state.weatherData = weather;
      }),
  }))
);

export default useWeatherStore;

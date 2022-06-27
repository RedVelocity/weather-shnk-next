/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import { useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { LazyMotion } from 'framer-motion';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

import SearchCard from '../components/SearchCard';
import WeatherCard from '../components/WeatherCard';
import HourlyWeather from '../components/HourlyWeather';
import Header from '../components/header';
import Footer from '../components/footer';
import DailyWeather from '../components/DailyWeather';
import WeatherInfoCardList from '../components/WeatherInfoCardList';
import useLocation from '../lib/hooks/useLocation';
import { Provider } from '../lib/store/useWeatherStore';
import { fetchWeather } from './api/getWeather';

const DynamicWeatherMap = dynamic(() => import('../components/WeatherMap'), {
  loading: () => null,
});

const loadFeatures = () =>
  import('../lib/utils/features').then((res) => res.default);

export const getServerSideProps = async () => {
  const res = await axios.get(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
  );
  const weather = await fetchWeather(12.972442, 77.580643);
  return {
    props: { host: res.data, weather },
    // revalidate: 604800,
  };
};

const Home = ({ host: { hostName, hostUrl }, weather }) => {
  const {
    location: { latitude, longitude },
  } = useLocation();
  // const { weatherData } = useWeather();
  const createStore = useCallback(
    () =>
      create(
        immer((set) => ({
          theme: 'cool',
          weatherData: weather,
          setTheme: (theme) =>
            set((state) => {
              state.theme = theme;
            }),
          setWeatherData: (w) =>
            set((state) => {
              state.weatherData = w;
            }),
        }))
      ),
    [weather]
  );
  return (
    <Provider createStore={createStore}>
      <LazyMotion features={loadFeatures} strict>
        <Header hostName={hostName} hostUrl={hostUrl} />
        <main className="flex-1 min-w-full">
          <div className="grid gap-3 mx-4 md:grid-cols-3">
            <section className="space-y-3 flex flex-col">
              <SearchCard />
              <div className="flex flex-col sm:flex-row gap-2 flex-1  ">
                <WeatherCard />
                {/* Reposition Component on small devices */}
                <WeatherInfoCardList className="grid md:hidden" />
              </div>
            </section>
            <section className="md:col-span-2">
              <HourlyWeather />
            </section>
            <section className="md:space-y-3 md:flex md:flex-col">
              <WeatherInfoCardList className="hidden md:grid" />
              <DynamicWeatherMap longitude={longitude} latitude={latitude} />
            </section>
            <section className="md:col-span-2">
              <DailyWeather />
            </section>
          </div>
        </main>
        <Footer />
      </LazyMotion>
    </Provider>
  );
};

Home.propTypes = {
  host: PropTypes.shape({
    hostName: PropTypes.string,
    hostUrl: PropTypes.string,
  }),
};

export default Home;

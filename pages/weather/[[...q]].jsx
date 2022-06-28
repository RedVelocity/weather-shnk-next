/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { LazyMotion } from 'framer-motion';
import { useHydrateAtoms } from 'jotai/utils';

import SearchCard from '../../components/SearchCard';
import WeatherCard from '../../components/WeatherCard';
import HourlyWeather from '../../components/HourlyWeather';
import Header from '../../components/header';
import Footer from '../../components/footer';
import DailyWeather from '../../components/DailyWeather';
import WeatherInfoCardList from '../../components/WeatherInfoCardList';
import { fetchWeather } from '../api/getWeather';
import { getPlaceCoords } from '../api/getPlaces';
import { locationAtom, weatherAtom } from '../../lib/store';

const DynamicWeatherMap = dynamic(() => import('../../components/WeatherMap'), {
  loading: () => null,
});

const loadFeatures = () =>
  import('../../lib/utils/features').then((res) => res.default);

export const getServerSideProps = async (context) => {
  const { q } = context.query;
  const query = decodeURIComponent(q);
  const { data: host } = await axios.get(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
  );
  const location = await getPlaceCoords(query);
  // eslint-disable-next-line no-console
  console.log('Query', context);
  if (location === 0) {
    return {
      notFound: true,
    };
  }
  const weather = await fetchWeather(location.latitude, location.longitude);
  // eslint-disable-next-line no-console
  // console.log('server', weather.current, location, query);
  return {
    props: { host, weather, location },
    // revalidate: 604800,
  };
};

const Home = ({ host: { hostName, hostUrl }, weather, location }) => {
  useHydrateAtoms([[weatherAtom, weather]]);
  useHydrateAtoms([[locationAtom, location]]);
  return (
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
            <DynamicWeatherMap
              longitude={location.longitude}
              latitude={location.latitude}
            />
          </section>
          <section className="md:col-span-2">
            <DailyWeather />
          </section>
        </div>
      </main>
      <Footer />
    </LazyMotion>
  );
};

Home.propTypes = {
  host: PropTypes.shape({
    hostName: PropTypes.string,
    hostUrl: PropTypes.string,
  }),
};

export default Home;

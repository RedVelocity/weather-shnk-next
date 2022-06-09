import axios from 'axios';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import SearchCard from '../components/SearchCard';
import WeatherCard from '../components/WeatherCard';
import Skeleton from '../components/Skeleton';
import HourlyWeather from '../components/HourlyWeather';
import Header from '../components/header';
import Footer from '../components/footer';
import DailyWeather from '../components/DailyWeather';
import WeatherInfoCardList from '../components/WeatherInfoCardList';
import useLocation from '../lib/hooks/useLocation';
import useWeather from '../lib/hooks/useWeather';

const DynamicWeatherMap = dynamic(() => import('../components/WeatherMap'), {
  loading: () => <Skeleton rows={4} withContainer />,
});

// const DynamicWeatherChart = dynamic(
//   () => import('../components/WeatherChart'),
//   {
//     loading: () => <Skeleton rows={4} withContainer />,
//   }
// );

export const getStaticProps = async () => {
  const res = await axios.get(
    'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
  );
  return {
    props: { host: res.data },
    revalidate: 604800,
  };
};

const Home = ({ host: { hostName, hostUrl } }) => {
  const {
    location: { latitude, longitude },
  } = useLocation();
  const { weatherData } = useWeather();
  return latitude === 0 || !weatherData?.current ? null : (
    <>
      <Header hostName={hostName} hostUrl={hostUrl} />
      <main className="flex-1 w-full max-w-screen-lg mx-auto">
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
    </>
  );
};

Home.propTypes = {
  host: PropTypes.shape({
    hostName: PropTypes.string,
    hostUrl: PropTypes.string,
  }),
};

export default Home;

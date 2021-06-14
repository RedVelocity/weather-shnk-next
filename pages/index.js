/* eslint-disable react/jsx-filename-extension */
import Head from 'next/head';

import WeatherChart from '../components/WeatherChart';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import SearchCard from '../components/SearchCard';

const Home = () => (
  <>
    <Head>
      <title>SHNK | Weather</title>
      <link rel="icon" type="image/png" href="/weather-icon.png" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Weather lookup from SHNK" />
      <meta name="keywords" content="weather, javascript, html, css" />
      <meta name="author" content="shnk.tech" />
    </Head>
    <div className="flex-1 w-full max-w-screen-lg mx-auto">
      <div className="grid gap-4 px-4 md:grid-cols-3">
        <div className="space-y-4">
          <SearchCard />
          <WeatherCard />
        </div>
        <div className="md:col-span-2">
          <WeatherChart />
        </div>
        <div className="md:col-span-full">
          <WeatherMap />
        </div>
      </div>
    </div>
  </>
);

export default Home;

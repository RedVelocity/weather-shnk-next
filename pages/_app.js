/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import Head from 'next/head';
import '../styles/main.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { LocationProvider } from '../lib/context/locationProvider';
import { WeatherProvider } from '../lib/context/weatherProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App({ Component, pageProps }) {
  const [host, setHost] = useState({});
  useEffect(() => {
    const getHostDetails = async () => {
      const res = await axios.get(
        'https://gist.githubusercontent.com/RedVelocity/424379247e7f4ce37d50c7f9a5d07a0a/raw/host.json'
      );
      setHost(res.data);
    };
    getHostDetails();
  }, []);

  return (
    <>
      <Head>
        <title>SHNK | Weather</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Weather app from SHNK" />
        <meta
          name="keywords"
          content="weather, javascript, html, css, react, nextjs"
        />
        <meta name="author" content="shnk.tech" />
      </Head>
      <LocationProvider>
        <WeatherProvider>
          <Header hostName={host.host} hostUrl={host.hostUrl} />
          <Component {...pageProps} />
          <Footer />
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

export default App;

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/tailwind.css';

import { LocationProvider } from '../context/locationProvider';
import { WeatherProvider } from '../context/weatherProvider';
import Header from '../components/header';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SHNK | Weather</title>
        <link rel="icon" type="image/png" href="/weather-icon.png" />
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
          <Header />
          <Component {...pageProps} />
          <Footer />
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

export default MyApp;

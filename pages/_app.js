/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import Head from 'next/head';
import '../styles/main.css';

import { LocationProvider } from '../utils/context/locationProvider';
import { WeatherProvider } from '../utils/context/weatherProvider';
import Header from '../components/header';
import Footer from '../components/footer';

function App({ Component, pageProps }) {
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
          <Header />
          <Component {...pageProps} />
          <Footer />
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

export default App;

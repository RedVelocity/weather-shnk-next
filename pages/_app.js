/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import Head from 'next/head';
import '../styles/main.css';
import { LocationProvider } from '../lib/context/locationProvider';
import { WeatherProvider } from '../lib/context/weatherProvider';

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
          <Component {...pageProps} />
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

export default App;

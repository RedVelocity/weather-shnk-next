import '../styles/globals.css';
import '../styles/tailwind.css';
import { LocationProvider } from '../context/locationProvider';
import { WeatherProvider } from '../context/weatherProvider';
import Header from '../components/header';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <LocationProvider>
      <WeatherProvider>
        <Header />
        <div className="flex-1 w-full max-w-screen-lg mx-auto">
          <Component {...pageProps} />
        </div>
        <Footer />
      </WeatherProvider>
    </LocationProvider>
  );
}

export default MyApp;

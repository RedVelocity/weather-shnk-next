import React from 'react';

const Footer = () => (
  <footer className="font-semibold text-dark">
    <div className="flex flex-col justify-between max-w-screen-lg gap-2 p-4 m-auto text-sm text-center md:flex-row md:text-lg">
      <a href="https://openweathermap.org/">Powered by OpenWeather</a>
      <span>
        Icons made by{' '}
        <a href="https://www.freepik.com" title="Freepik" className="text-hot">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;

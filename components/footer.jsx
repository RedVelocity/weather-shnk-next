import React from 'react';

const Footer = () => (
  <footer className="font-semibold text-dark">
    <div className="flex justify-between max-w-screen-lg p-4 m-auto">
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
      <a href="https://icons8.com/icon/set/weather/color-glass">
        Color Glass icons by Icons8
      </a>
    </div>
  </footer>
);

export default Footer;

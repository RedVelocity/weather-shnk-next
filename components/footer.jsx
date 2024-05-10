const Footer = () => (
  <footer>
    <div className="flex flex-col justify-between max-w-screen-xl gap-4 p-4 m-auto text-sm tracking-wider text-center md:flex-row md:text-lg">
      <span>
        Powered by{' '}
        <a
          href="https://openweathermap.org/"
          rel="noreferrer"
          target="_blank"
          className="font-semibold pill bg-base-dark dark:bg-base text-primary-dark dark:text-primary"
        >
          OpenWeather
        </a>
      </span>
      <span>
        Icons made by{' '}
        <a
          href="https://www.freepik.com"
          rel="noreferrer"
          target="_blank"
          title="Freepik"
          className="font-semibold pill bg-milder text-primary"
        >
          Freepik
        </a>{' '}
        from{' '}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          rel="noreferrer"
          target="_blank"
        >
          www.flaticon.com
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;

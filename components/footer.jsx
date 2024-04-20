const Footer = () => (
  <footer>
    <div className="flex flex-col justify-between max-w-screen-lg gap-2 p-4 m-auto text-sm tracking-wider text-center md:flex-row md:text-lg">
      <span>
        Powered by{' '}
        <a
          href="https://openweathermap.org/"
          rel="noreferrer"
          target="_blank"
          className="font-semibold pill bg-baseDark dark:bg-baseLight text-baseLight dark:text-baseDark"
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
          className="font-semibold pill bg-milder text-txtLight"
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

const Footer = () => (
  <footer className="font-semibold text-dark">
    <div className="flex flex-col justify-between max-w-screen-lg gap-2 p-4 m-auto text-sm text-center md:flex-row md:text-lg">
      <a href="https://openweathermap.org/" rel="noreferrer" target="_blank">
        Powered by <span className="pill bg-dark text-mild">OpenWeather</span>
      </a>
      <span>
        Icons made by{' '}
        <a
          href="https://www.freepik.com"
          rel="noreferrer"
          target="_blank"
          title="Freepik"
          className="pill bg-milder"
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

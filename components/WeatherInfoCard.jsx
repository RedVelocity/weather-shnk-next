import useWeather from '../lib/hooks/useWeather';

const WeatherInfoCard = () => {
  const {
    weatherData: { current },
  } = useWeather();
  return (
    <ul className="card min-h-[6.5rem] text-dark p-4 capitalize font-medium grid grid-cols-2 items-center bg-dark text-gray-100 tracking-wide">
      {current && (
        <>
          <li>
            <svg
              className="h-8 w-8 inline mr-2 bg-cool rounded"
              set="current-conditions"
              name="wind"
              theme="dark"
              data-testid="Icon"
              aria-hidden="true"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>Wind</title>
              <path
                d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            wind speed: {current.wind_speed}
          </li>
          <li>
            <svg
              className="h-8 w-8 inline mr-2 bg-mild rounded p-1"
              set="current-conditions"
              name="visibility"
              theme="dark"
              data-testid="Icon"
              aria-hidden="true"
              role="img"
              viewBox="0 0 1024 1024"
            >
              <title>Visibility</title>
              <path
                fill="currentColor"
                d="M491.856 879.808c-60.48-5.056-110.848-25.184-171.328-55.424-120.96-55.424-216.704-146.112-292.256-256.96-25.248-40.352-30.24-80.64 0-126.016 80.608-115.872 186.464-211.68 317.472-272.096 110.816-50.4 226.752-50.4 337.664 0 136 60.48 241.824 156.224 317.44 282.208 15.104 25.216 25.12 65.504 10.048 85.728-105.792 191.424-256.992 367.84-519.04 342.56zm292.256-377.92c0-151.168-120.96-272.064-272.096-272.064-146.144 0-272.128 126.016-272.128 272.064 0 151.232 120.96 277.216 272.128 277.216 151.104-.032 272.096-125.984 272.096-277.216z"
              />
              <path
                fill="currentColor"
                d="M789.808 500.416c0 156.896-125.472 287.52-282.336 282.336-156.864 0-282.336-130.656-282.336-287.488 0-146.4 130.656-277.12 282.336-277.12 156.896-.032 287.584 125.376 282.336 282.272zM512.752 348.832c-83.68 0-151.584 67.968-151.584 151.584 0 88.864 67.968 156.896 151.584 156.896 83.648 0 156.832-73.216 156.832-156.896-5.184-83.648-73.152-151.584-156.832-151.584z"
              />
            </svg>
            visibility: {current.visibility}
          </li>
          <li>
            <svg
              className="h-8 w-8 inline mr-2 bg-hot rounded"
              set="current-conditions"
              name="pressure"
              data-testid="Icon"
              aria-hidden="true"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>Pressure</title>
              <path
                fill="currentColor"
                d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z"
              />
            </svg>
            pressure: {current.pressure}
          </li>
          <li className="align-middle">
            <svg
              className="h-8 w-8 inline mr-2"
              set="current-conditions"
              name="dewpoint"
              theme="dark"
              data-testid="Icon"
              aria-hidden="true"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>Dew Point</title>
              <path
                fill="currentColor"
                d="M17 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="M9.743 18.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M9.855 5c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772C9.245 5.14 9.54 5 9.855 5"
              />
            </svg>
            dew point: {current.dew_point}
          </li>
        </>
      )}
    </ul>
  );
};

export default WeatherInfoCard;

import PropTypes from 'prop-types';
import useWeather from '../lib/hooks/useWeather';
import {
  DewpointIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from './Icon/MiniIcon';
import WeatherInfoCard from './WeatherInfoCard';

const WeatherInfoCardList = ({ className }) => {
  const {
    weatherData: { current },
  } = useWeather();
  return (
    <ul
      className={`${className} card text-dark p-4 font-medium gap-1 bg-dark text-gray-100 tracking-wide min-w-[18rem] h-[16rem]`}
    >
      <>
        <WeatherInfoCard
          MiniIcon={WindIcon}
          title="Wind Speed"
          content={`${current.wind_speed} km/s`}
        />
        <WeatherInfoCard
          MiniIcon={VisibilityIcon}
          title="Visibility"
          content={`${current.visibility / 1000} km`}
        />
        <WeatherInfoCard
          MiniIcon={PressureIcon}
          title="Pressure"
          content={`${current.pressure} hPa`}
        />
        <WeatherInfoCard
          MiniIcon={DewpointIcon}
          title="Dew Point"
          content={`${current.dew_point.toFixed()}°C`}
        />
      </>
    </ul>
  );
};

WeatherInfoCardList.propTypes = {
  className: PropTypes.string,
};

export default WeatherInfoCardList;

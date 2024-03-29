'use client';

import PropTypes from 'prop-types';
import useWeather from '@/lib/hooks/useWeather';
import WeatherInfoCard from '@/components/WeatherInfoCard';
import {
  DewpointIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from '@/components/Icon/MiniIcon';

const WeatherInfoCardList = ({ className }) => {
  const {
    weatherData: { current },
  } = useWeather();
  return (
    <ul
      className={`${className} card p-4 gap-1 bg-dark min-w-[18rem] h-[16rem] text-gray-200`}
    >
      <>
        <WeatherInfoCard
          Icon={WindIcon}
          title="Wind Speed"
          content={`${current.wind_speed} km/h`}
        />
        <WeatherInfoCard
          Icon={VisibilityIcon}
          title="Visibility"
          content={`${current.visibility / 1000} km`}
        />
        <WeatherInfoCard
          Icon={PressureIcon}
          title="Pressure"
          content={`${current.pressure} hPa`}
        />
        <WeatherInfoCard
          Icon={DewpointIcon}
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

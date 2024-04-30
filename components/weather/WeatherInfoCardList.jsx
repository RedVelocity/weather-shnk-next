/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import {
  DewpointIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from '@/components/Icon/InfoIcon';

const WeatherInfoCardList = ({ className, weather }) => {
  const { current } = weather;
  return (
    <ul
      className={`${className} card p-4 gap-1 bg-base-dark dark:bg-wrapper-dark min-w-[18rem] h-full text-primary-dark`}
    >
      <>
        <WeatherInfoCard
          Icon={WindIcon}
          title="Wind Speed"
          content={`${Math.round(current.wind_speed)} km/h`}
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

const WeatherInfoCard = ({ Icon, title, content }) => (
  <li className="flex items-center justify-between gap-4 px-3 py-2 card bg-surface/5 dark:bg-surface-dark">
    <p className="flex items-center">
      <Icon />
      {title}
    </p>
    <p>{content}</p>
  </li>
);

WeatherInfoCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
WeatherInfoCardList.propTypes = {
  className: PropTypes.string,
};

export default WeatherInfoCardList;

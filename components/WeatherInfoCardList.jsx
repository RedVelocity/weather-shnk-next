/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
// import useWeather from '@/lib/hooks/useWeather';
import WeatherInfoCard from '@/components/WeatherInfoCard';
import {
  DewpointIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from '@/components/Icon/InfoIcon';

const WeatherInfoCardList = ({ className, weather }) => {
  const { current } = weather;
  const uvi = Math.round((current.uvi * 100) / 11);
  const uvPercentage = uvi > 100 ? 100 : uvi;
  console.log('uvPercentage', uvPercentage, current.uvi);
  return (
    <ul
      className={`${className} card p-4 gap-1 bg-baseDark min-w-[18rem] h-full text-txtDark`}
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
        {/* <div className="w-full p-2 card bg-surfaceLight/5">
          <div
            className={`after:transition-all w-full relative h-3 rounded-full bg-mild after:content-[''] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:absolute after:left-[${uvPercentage}%] after:top-[-50%] after:ease-in-out after:duration-200`}
          />
        </div> */}
      </>
    </ul>
  );
};

WeatherInfoCardList.propTypes = {
  className: PropTypes.string,
};

export default WeatherInfoCardList;

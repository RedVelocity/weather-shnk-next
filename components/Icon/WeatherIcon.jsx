import Image from 'next/image';
import PropTypes from 'prop-types';
import AnimatedIcon from './AnimatedIcon';

const weatherIcons = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'sleet',
  '13n': 'sleet',
  '50d': 'fog',
  '50n': 'fog',
};

const getIcon = (icon) => `/assets/weather-icons/${weatherIcons[icon]}.svg`;
const sizes = {
  small: 36,
  medium: 48,
  large: 64,
};

const WeatherIcon = ({ icon, size, className, animate = false }) => {
  if (animate)
    return (
      <AnimatedIcon
        className={className}
        icon={getIcon(icon)}
        size={sizes[size]}
        alt={getIcon(icon)}
      />
    );
  return (
    <Image
      className={className}
      src={getIcon(icon)}
      height={sizes[size]}
      width={sizes[size]}
      key={icon}
      alt={weatherIcons[icon]}
    />
  );
};

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

export default WeatherIcon;

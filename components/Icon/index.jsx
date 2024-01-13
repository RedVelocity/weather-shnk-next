'use client';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

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

const Icon = ({ icon, size, className }) => (
  <motion.img
    className={className}
    src={getIcon(icon)}
    height={size}
    width={size}
    alt="icon"
    initial={{ opacity: 0, scale: 1.2 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    key={icon}
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Icon;

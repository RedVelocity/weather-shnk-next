'use client';

import { LazyMotion, domAnimation, m as motion } from 'framer-motion';
import Image from 'next/image';
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

const Icon = ({ icon, size, className, animate = false }) => {
  if (animate)
    return (
      <LazyMotion features={domAnimation}>
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          key={icon}
          className={className}
        >
          <Image src={getIcon(icon)} height={size} width={size} alt="icon" />
        </motion.div>
      </LazyMotion>
    );
  return (
    <Image
      className={className}
      src={getIcon(icon)}
      height={size}
      width={size}
      key={icon}
      alt="icon"
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

export default Icon;

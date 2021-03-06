import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { weatherIcons } from './config';

const getIcon = (icon) => `/assets/weather-icons/${weatherIcons[icon]}.svg`;

const Icon = ({ icon, size, className }) => (
  <m.img
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

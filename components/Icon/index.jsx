import Image from 'next/image';
import PropTypes from 'prop-types';
import { weatherIcons } from './config';

const getIcon = (icon) => `/assets/weather-icons/${weatherIcons[icon]}.svg`;

const Icon = ({ icon, size, type }) => (
  <Image
    src={getIcon(icon, size, type)}
    height={size}
    width={size}
    alt="icon"
  />
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string,
};

export default Icon;

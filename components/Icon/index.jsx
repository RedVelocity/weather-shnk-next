import Image from 'next/image';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import { weatherIcons } from './config';

const getIcon = (icon) => `/assets/weather-icons/${weatherIcons[icon]}.svg`;

const Icon = ({ icon, size }) => (
  <LazyMotion features={domAnimation} strict>
    <m.div
      initial={{ opacity: 0, scale: 1.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      key={icon}
    >
      <Image
        src={getIcon(icon)}
        height={size}
        width={size}
        alt="icon"
        priority
      />
    </m.div>
  </LazyMotion>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Icon;

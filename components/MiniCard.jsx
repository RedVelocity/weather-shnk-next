import PropTypes from 'prop-types';
import useWeather from '../lib/hooks/useWeather';

const MiniCard = ({ header, children, footer }) => {
  const { theme } = useWeather();
  return (
    <div className="bg-white/5 py-2 px-4 card grid grid-cols-4 gap-2 text-sky-50 items-center">
      <span className="font-medium">{header}</span>
      {children}
      <span className={`text-${theme}`}>{footer}</span>
    </div>
  );
};

MiniCard.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.string.isRequired,
};

export default MiniCard;

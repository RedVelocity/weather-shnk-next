import PropTypes from 'prop-types';

const WeatherInfoCard = ({ Icon, title, content }) => (
  <li className="flex items-center justify-between gap-4 px-3 py-2 card bg-surfaceLight/5 dark:bg-surfaceDark/20">
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

export default WeatherInfoCard;

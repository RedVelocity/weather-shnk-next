import PropTypes from 'prop-types';

const WeatherInfoCard = ({ MiniIcon, title, content }) => (
  <li className="flex gap-4 justify-between card p-2 bg-white/5 items-center">
    <span className="flex items-center">
      <MiniIcon />
      {title}
    </span>
    <span>{content}</span>
  </li>
);

WeatherInfoCard.propTypes = {
  MiniIcon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default WeatherInfoCard;

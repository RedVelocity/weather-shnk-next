import PropTypes from 'prop-types';

const WeatherInfoCard = ({ MiniIcon, title, content }) => (
  <li className="flex gap-4 justify-between card py-2 px-3 bg-white/5 items-center">
    <p className="flex items-center">
      <MiniIcon />
      {title}
    </p>
    <p>{content}</p>
  </li>
);

WeatherInfoCard.propTypes = {
  MiniIcon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default WeatherInfoCard;

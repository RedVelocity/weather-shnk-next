import PropTypes from 'prop-types';
import Icon from './Icon';

const SummaryCard = ({ icon, title, subtitle }) => (
  <div className="flex flex-col items-center justify-center p-4 lg:p-2 text-sky-50">
    <Icon icon={icon} size={48} />
    <h5 className="mt-2 tracking-wide">{subtitle}</h5>
    <h2 className="text-xl font-semibold tracking-wide">{title}</h2>
  </div>
);

SummaryCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SummaryCard;

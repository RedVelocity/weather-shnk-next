import PropTypes from 'prop-types';
import Icon from './Icon';

const SummaryCard = ({ icon, children, border }) => (
  <div
    className={`flex flex-col gap-1 items-center justify-center p-4 text-sky-50 card bg-white/5 ${
      border && 'border border-gray-50/25'
    }`}
  >
    <Icon icon={icon} size={48} />
    {children}
  </div>
);

SummaryCard.propTypes = {
  icon: PropTypes.string.isRequired,
  border: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SummaryCard;

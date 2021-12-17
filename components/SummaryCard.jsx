import Image from 'next/image';
import PropTypes from 'prop-types';

import getSummaryIcon from '../lib/utils/getSummaryIcon';

const SummaryCard = ({ icon, title, subtitle }) => (
  <div className="flex flex-col items-center justify-center p-2 text-sky-50">
    <Image src={getSummaryIcon(icon, 64)} height={48} width={48} />
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

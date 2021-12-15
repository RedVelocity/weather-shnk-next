import Image from 'next/image';
import PropTypes from 'prop-types';

import weatherIcons8 from '../assets/svg/weatherIcons-8';

const SummaryCard = ({ icon, temperature, time }) => (
  <div className="flex flex-col items-center justify-center p-2 text-sky-50">
    <Image src={weatherIcons8[icon]} height={48} width={48} />
    <div className="mt-4">
      <span className="tracking-wide">{time}</span>
    </div>
    <span className="text-2xl font-semibold tracking-wide">{temperature}</span>
    {/* <span className="text-sm tracking-wide capitalize">{condition}</span> */}
  </div>
);

SummaryCard.propTypes = {
  icon: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  // condition: PropTypes.string,
};

export default SummaryCard;

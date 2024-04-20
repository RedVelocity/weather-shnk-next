import PropTypes from 'prop-types';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ hostName, hostUrl }) => (
  <header className="flex items-center justify-between max-w-screen-xl p-4">
    <a
      href={hostUrl}
      target="_blank"
      rel="noreferrer"
      className="text-2xl font-bold uppercase"
    >
      {hostName}
    </a>
    <DarkModeToggle />
  </header>
);

Header.propTypes = {
  hostName: PropTypes.string,
  hostUrl: PropTypes.string,
};

export default Header;

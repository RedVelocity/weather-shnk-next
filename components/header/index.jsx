import PropTypes from 'prop-types';
import ThemeToggle from './ThemeToggle';

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
    <ThemeToggle />
  </header>
);

Header.propTypes = {
  hostName: PropTypes.string,
  hostUrl: PropTypes.string,
};

export default Header;

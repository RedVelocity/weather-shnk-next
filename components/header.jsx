import PropTypes from 'prop-types';

const Header = ({ hostName, hostUrl }) => (
  <header className="text-2xl font-bold text-dark uppercase max-w-screen-lg p-4">
    <a href={hostUrl}>{hostName}</a>
  </header>
);

Header.propTypes = {
  hostName: PropTypes.string,
  hostUrl: PropTypes.string,
};

export default Header;

import PropTypes from 'prop-types';

const Header = ({ hostName, hostUrl }) => (
  <header className="max-w-screen-lg p-4 text-2xl font-bold uppercase">
    <a href={hostUrl} target="_blank" rel="noreferrer">
      {hostName}
    </a>
  </header>
);

Header.propTypes = {
  hostName: PropTypes.string,
  hostUrl: PropTypes.string,
};

export default Header;

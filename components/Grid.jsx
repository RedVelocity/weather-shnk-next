import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children, minColSize, maxColSize }) => (
  <div
    className={`grid ${minColSize} ${maxColSize} gap-2 mt-4 text-center capitalize`}
  >
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  minColSize: PropTypes.string.isRequired,
  maxColSize: PropTypes.string.isRequired,
};

export default Grid;

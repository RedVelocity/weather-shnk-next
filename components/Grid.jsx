import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children, minColSize, maxColSize }) => (
  <div
    className={`grid grid-cols-${minColSize} md:grid-cols-${maxColSize} text-gray-200 gap-2 mt-4 text-center capitalize text-lg`}
  >
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  minColSize: PropTypes.number.isRequired,
  maxColSize: PropTypes.number.isRequired,
};

export default Grid;

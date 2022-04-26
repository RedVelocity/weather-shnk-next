import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children, minColSize, maxColSize, gap = 'gap-2' }) => (
  <div
    className={`grid ${minColSize} ${maxColSize} ${gap} mt-4 text-center capitalize`}
  >
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  minColSize: PropTypes.string.isRequired,
  maxColSize: PropTypes.string.isRequired,
  gap: PropTypes.string,
};

export default Grid;

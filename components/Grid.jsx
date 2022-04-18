import React from 'react';
import PropTypes from 'prop-types';

const gridValues = [
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
  'grid-cols-7',
  'grid-cols-8',
  'grid-cols-9',
  'grid-cols-10',
  'grid-cols-11',
  'grid-cols-12',
];

const gridValuesMD = [
  'md:grid-cols-1',
  'md:grid-cols-2',
  'md:grid-cols-3',
  'md:grid-cols-4',
  'md:grid-cols-5',
  'md:grid-cols-6',
  'md:grid-cols-7',
  'md:grid-cols-8',
  'md:grid-cols-9',
  'md:grid-cols-10',
  'md:grid-cols-11',
  'md:grid-cols-12',
];

const Grid = ({ children, minColSize, maxColSize }) => (
  <div
    className={`grid ${gridValues[minColSize - 1]} ${
      gridValuesMD[maxColSize - 1]
    } gap-2 mt-4 text-center capitalize`}
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

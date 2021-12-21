import PropTypes from 'prop-types';

const Skeleton = ({ rows = 1, withContainer = false }) => {
  const skeletons = [...Array(rows)].map((_, i) => (
    <div
      key={i}
      className="h-4 mb-8 rounded last:mb-0 md:h-6 md:mb-4 bg-gradient-to-r from-gray-400 to-cool"
    />
  ));

  return withContainer ? (
    <div className="flex flex-col min-h-full p-6 md:py-4 justify-evenly bg-dark card">
      {skeletons}
    </div>
  ) : (
    skeletons
  );
};

Skeleton.propTypes = {
  rows: PropTypes.number.isRequired,
  withContainer: PropTypes.bool,
};

export default Skeleton;

const Skeleton = ({ rows = 1 }) =>
  [...Array(rows)].map((_, i) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      className="w-full h-4 rounded md:h-6 bg-gradient-to-r from-gray-300 to-gray-500"
    />
  ));

export default Skeleton;

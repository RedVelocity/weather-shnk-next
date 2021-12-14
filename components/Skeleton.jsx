const Skeleton = ({ rows = 1 }) =>
  [...Array(rows)].map((_, i) => (
    <div
      key={i}
      className="h-4 m-4 rounded md:h-6 bg-gradient-to-r from-gray-400 to-cool"
    />
  ));

export default Skeleton;

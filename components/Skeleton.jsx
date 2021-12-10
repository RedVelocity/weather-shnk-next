const Skeleton = ({ rows = 1 }) =>
  [...Array(rows)].map((_, i) => (
    <div
      key={i}
      className="w-full h-4 rounded md:h-6 bg-gradient-to-r from-cool to-gray-400"
    />
  ));

export default Skeleton;

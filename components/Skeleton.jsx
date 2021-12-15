const Skeleton = ({ rows = 1 }) => (
  <div className="flex flex-col min-h-full p-4 justify-evenly bg-dark card">
    {[...Array(rows)].map((_, i) => (
      <div
        key={i}
        className="h-4 mb-4 rounded last:mb-0 md:h-6 bg-gradient-to-r from-gray-400 to-cool"
      />
    ))}
  </div>
);

export default Skeleton;

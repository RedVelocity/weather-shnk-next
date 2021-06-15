import { motion } from 'framer-motion';

const transition = {
  duration: 0.8,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};
const Skeleton = () => (
  <div className="w-full h-6 bg-gray-400 rounded">
    <motion.span
      className="block w-1/2 h-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={transition}
    />
  </div>
);

export default Skeleton;

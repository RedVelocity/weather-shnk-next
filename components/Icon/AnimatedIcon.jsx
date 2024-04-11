/* eslint-disable react/prop-types */

'use client';

import { m as motion } from 'framer-motion';
import Image from 'next/image';

const AnimatedIcon = ({ className, icon, size }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 1.2 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    key={icon}
  >
    <Image src={icon} height={size} width={size} alt="icon" />
  </motion.div>
);

export default AnimatedIcon;

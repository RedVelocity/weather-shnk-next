'use client';

import PropTypes from 'prop-types'; // Import PropTypes
import { Next13ProgressBar } from 'next13-progressbar';
import { ThemeProvider } from 'next-themes';
import { LazyMotion, domMax } from 'framer-motion';
import { colors } from '@/styles/colors';

const Providers = ({ children }) => (
  <LazyMotion features={domMax} strict>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
    <Next13ProgressBar
      height="4px"
      color={colors.milder}
      options={{ showSpinner: false }}
      showOnShallow
    />
  </LazyMotion>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired, // children prop is required and should be a node
};

export default Providers;

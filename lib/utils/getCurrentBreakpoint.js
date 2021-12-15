import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value) =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf('px')
  );

export const getCurrentBreakpoint = () => {
  let currentBreakpoint = 'sm';
  let biggestBreakpointValue = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};

const twColors = require('tailwindcss/colors');

const colors = {
  // theme colors
  cool: '#97d9e1',
  mild: '#d9afd9',
  milder: '#ff8b7e',
  hot: '#F9B900',
  // surfaces
  base: { DEFAULT: '#C8D3E0', dark: '#142850' },
  surface: { DEFAULT: twColors.gray[200], dark: '#0C7B93' },
  wrapper: { dark: '#27496D' },
  // basic colors
  blue: twColors.blue[400],
  purple: twColors.purple[300],
  gray: twColors.gray[400],
  white: 'white',
  black: 'black',
  current: 'currentColor',
  inherit: 'inherit',
  transparent: 'transparent',
};

const textColors = {
  primary: { DEFAULT: twColors.gray[800], dark: twColors.gray[200] },
  secondary: { DEFAULT: twColors.gray[600], dark: twColors.gray[400] },
  muted: '#2E3A4E',
  current: 'currentColor',
  inherit: 'inherit',
  transparent: 'transparent',
};

module.exports = { colors, textColors };

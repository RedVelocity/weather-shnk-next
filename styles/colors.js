const twColors = require('tailwindcss/colors');

const colors = {
  // theme colors
  cool: '#97d9e1',
  mild: '#d9afd9',
  milder: '#ff8b7e',
  hot: '#F9B900',
  // surfaces
  base: { DEFAULT: '#B9C3CF', dark: '#142850' },
  wrapper: { DEFAULT: '#C8D3E0', dark: '#182F56' },
  surface: { DEFAULT: '#D3DFEA', dark: '#133A5E' },
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
  primary: { DEFAULT: twColors.slate[800], dark: '#E2E8F0' },
  secondary: { DEFAULT: twColors.slate[700], dark: '#AFACBF' },
  muted: '#2E3A4E',
  current: 'currentColor',
  inherit: 'inherit',
  transparent: 'transparent',
};

module.exports = { colors, textColors };

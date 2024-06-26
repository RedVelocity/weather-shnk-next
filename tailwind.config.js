const { colors, textColors } = require('./styles/colors');

module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // extend: {
    // },
    colors,
    textColor: textColors,
    screens: {
      xs: '320px',
      sm: '640px',
      md: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-react-aria-components')({ prefix: 'rac' })],
};

const colors = require('./styles/colors');

module.exports = {
  mode: ['jit'],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['Montserrat', 'sans serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

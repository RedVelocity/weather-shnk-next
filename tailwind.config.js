module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cool: 'var(--cool)',
        mild: 'var(--mild)',
        milder: 'var(--milder)',
        hot: 'var(--hot)',
        dark: 'var(--dark)',
        txtDark: 'var(--txt-dark)',
        light: 'var(--light)',
        txtLight: 'var(--txt-light)',
      },
    },
  },
  screens: {
    xs: '320px',
    sm: '640px',
    md: '900px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  // eslint-disable-next-line global-require
  plugins: [require('@headlessui/tailwindcss')],
};

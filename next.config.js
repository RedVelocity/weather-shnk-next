const withImages = require('next-images');
const withPWA = require('next-pwa');

module.exports = withImages(
  withPWA({
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
  })
);

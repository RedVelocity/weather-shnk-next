const withImages = require('next-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withImages(
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  })
);

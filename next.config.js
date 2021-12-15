const withImages = require('next-images');
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withImages({
    images: {
      domains: ['img.icons8.com'],
    },
  })
);

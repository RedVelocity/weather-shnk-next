const withImages = require('next-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withImages(
    withPWA({
      pwa: {
        dest: 'public',
        runtimeCaching,
      },
      images: {
        domains: ['img.icons8.com'],
      },
    })
  )
);

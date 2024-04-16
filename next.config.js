const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
      },
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/weather?q=Scranton,Pennsylvania,USA',
  //       permanent: false,
  //     },
  //   ];
  // },
});

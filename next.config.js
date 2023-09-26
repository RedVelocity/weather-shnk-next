const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ['img.icons8.com', 'api.mapbox.com'],
  },
  // experimental: {
  //   appDir: true,
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/weather?q=Bangalore',
        permanent: false,
      },
    ];
  },
});

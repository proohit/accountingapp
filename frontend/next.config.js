const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  trailingSlash: true,
  swcMinify: false,
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
});

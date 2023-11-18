module.exports = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    SERVER_BASE_API: process.env.SERVER_BASE_API,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL
  },
};

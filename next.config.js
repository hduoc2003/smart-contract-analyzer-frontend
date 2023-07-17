require('dotenv').config();
module.exports = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
};

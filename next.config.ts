// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};
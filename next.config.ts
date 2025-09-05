// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google avatars
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatars
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com", // Facebook avatars
      },
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net", // Facebook CDN variant
      },
    ],
  },
}

module.exports = nextConfig

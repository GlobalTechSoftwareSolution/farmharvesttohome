// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "platform-lookaside.fbsbx.com" },
      { protocol: "https", hostname: "lookaside.facebook.com" },
      { protocol: "https", hostname: "*.fbcdn.net" }, // ✅ this covers scontent.xx.fbcdn.net, scontent-bom2-1.xx.fbcdn.net, etc.
    ],
  },
};

module.exports = nextConfig;

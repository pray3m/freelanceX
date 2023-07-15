/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname: process.env.NODE_ENV === "production" ? "**" : "localhost",
        port: process.env.NODE_ENV === "production" ? "" : "5000",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

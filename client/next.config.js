/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: process.env.NODE_ENV !== "production",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname:
          process.env.NODE_ENV === "production"
            ? "freelancex.onrender.com"
            : "localhost",
        port: process.env.NODE_ENV === "production" ? "" : "5001",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

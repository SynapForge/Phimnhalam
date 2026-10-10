import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'thwztchapter.dramaboxdb.com',
      },
      {
        protocol: 'https',
        hostname: '*.dramaboxdb.com',
      },
    ],
  },
};

export default nextConfig;

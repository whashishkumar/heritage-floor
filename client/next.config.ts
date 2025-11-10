import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // frontend will call /api/login etc.
        destination: "https://heritagefloor.whdev.in/api/:path*", // your Laravel backend
      },
    ];
  },
};

export default nextConfig;

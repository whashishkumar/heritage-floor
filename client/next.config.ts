import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heritagefloor.whdev.in",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
  
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://heritagefloor.whdev.in/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;

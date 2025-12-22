import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'heritagefloor.whdev.in',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 100],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://heritagefloor.whdev.in/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;

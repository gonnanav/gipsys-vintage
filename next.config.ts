import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'e2e', '.storybook'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gipsys-vintage.local',
      },
    ],
  },
};

export default nextConfig;

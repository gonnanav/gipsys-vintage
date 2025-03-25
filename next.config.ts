import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

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

const withMDX = createMDX({});

export default withMDX(nextConfig);

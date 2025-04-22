import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'tests', '.storybook'],
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

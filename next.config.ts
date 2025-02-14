import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'e2e', '.storybook'],
  },
};

export default nextConfig;

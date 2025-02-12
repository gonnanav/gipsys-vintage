import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'cypress'],
  },
};

export default nextConfig;

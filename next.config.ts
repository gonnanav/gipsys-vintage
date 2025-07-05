import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const woocommerce_url = process.env.WOOCOMMERCE_URL || 'http://localhost:8080';
const woocommerce_host = new URL(woocommerce_url).hostname;

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'tests', '.storybook'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: woocommerce_host,
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

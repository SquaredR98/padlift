import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@launchpad/db', '@launchpad/services', '@launchpad/config'],
};

export default nextConfig;

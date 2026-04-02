import { config } from 'dotenv';
import { resolve } from 'path';
import type { NextConfig } from 'next';

// Load env vars from monorepo root .env (single source of truth)
config({ path: resolve(__dirname, '../../.env') });

const nextConfig: NextConfig = {
  transpilePackages: ['@launchpad/db', '@launchpad/services', '@launchpad/config'],
};

export default nextConfig;

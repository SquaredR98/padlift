import { config } from 'dotenv';
import { resolve } from 'path';
import type { NextConfig } from 'next';

// Load env vars from monorepo root .env (single source of truth)
config({ path: resolve(__dirname, '../../.env') });

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
];

const nextConfig: NextConfig = {
  transpilePackages: ['@launchpad/db', '@launchpad/services', '@launchpad/config'],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;

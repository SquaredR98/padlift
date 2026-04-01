import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string(),

  // Auth.js
  AUTH_SECRET: z.string().min(32),
  AUTH_URL: z.string().url().optional(), // Auto-inferred on Vercel
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.string().default('/api'),

  // Gumroad
  GUMROAD_SELLER_ID: z.string().optional(),

  // Production domains (comma-separated, for custom domain detection)
  APP_DOMAINS: z.string().optional(),

  // Node
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export type Env = z.infer<typeof envSchema>;

export function env(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

import {
  Layout,
  Zap,
  Hammer,
  Mail,
  Clock,
  Briefcase,
  Sparkles,
  Code2,
  Minimize2,
  Palette,
  Rocket,
} from 'lucide-react';

export const ACCENT_COLORS: Record<string, string> = {
  'saas-starter': '#3b82f6',
  'viral-waitlist': '#8b5cf6',
  'indie-hacker': '#f59e0b',
  newsletter: '#f43f5e',
  'coming-soon': '#f59e0b',
  agency: '#ec4899',
  'ai-product': '#6366f1',
  'dev-tool': '#10b981',
  'minimal-waitlist': '#06b6d4',
  'gradient-waitlist': '#a855f7',
  'yc-waitlist': '#f97316',
};

export const TEMPLATE_ICONS: Record<string, typeof Layout> = {
  'saas-starter': Layout,
  'viral-waitlist': Zap,
  'indie-hacker': Hammer,
  newsletter: Mail,
  'coming-soon': Clock,
  agency: Briefcase,
  'ai-product': Sparkles,
  'dev-tool': Code2,
  'minimal-waitlist': Minimize2,
  'gradient-waitlist': Palette,
  'yc-waitlist': Rocket,
};

export const CATEGORY_COLORS: Record<string, string> = {
  saas: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  waitlist: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  newsletter: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'coming-soon': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  agency: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  devtool: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ai: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

export const CATEGORY_TAB_COLORS: Record<string, string> = {
  all: 'border-blue-500 text-blue-400',
  saas: 'border-blue-500 text-blue-400',
  waitlist: 'border-purple-500 text-purple-400',
  newsletter: 'border-rose-500 text-rose-400',
  'coming-soon': 'border-amber-500 text-amber-400',
  agency: 'border-pink-500 text-pink-400',
  devtool: 'border-emerald-500 text-emerald-400',
  ai: 'border-indigo-500 text-indigo-400',
};

export const CATEGORY_TABS = [
  { key: 'all', label: 'All' },
  { key: 'waitlist', label: 'Waitlist' },
  { key: 'saas', label: 'SaaS' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'coming-soon', label: 'Coming Soon' },
  { key: 'agency', label: 'Agency' },
  { key: 'ai', label: 'AI' },
  { key: 'devtool', label: 'Dev Tools' },
] as const;

export const STEPS = [
  { num: 1 as const, label: 'Details' },
  { num: 2 as const, label: 'Template' },
  { num: 3 as const, label: 'Confirm' },
];

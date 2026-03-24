import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template Preview — Padlift',
  description: 'Preview Padlift landing page templates.',
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

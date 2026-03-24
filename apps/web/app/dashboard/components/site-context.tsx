'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface PlanFeatures {
  maxSites: number;
  maxPages: number;
  maxWaitlistEntries: number;
  maxPaymentLinks: number;
  customDomain: boolean;
  googleSheets: boolean;
  webhooks: boolean;
  analytics: boolean;
  removeBranding: boolean;
}

interface SiteContextValue {
  id: string;
  name: string;
  slug: string;
  planFeatures: PlanFeatures;
}

const SiteCtx = createContext<SiteContextValue | null>(null);

export function useSiteContext() {
  return useContext(SiteCtx);
}

export function SiteContextProvider({
  site,
  children,
}: {
  site: SiteContextValue;
  children: ReactNode;
}) {
  return <SiteCtx.Provider value={site}>{children}</SiteCtx.Provider>;
}

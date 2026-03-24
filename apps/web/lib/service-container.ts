import { db } from '@launchpad/db';
import { SitesService, PagesService, WaitlistService, TemplatesService, MediaService, IntegrationsService, createStorageAdapter, TestimonialsService, FeatureRequestsService, SupportService } from '@launchpad/services';

// Service instances — singleton for the Next.js runtime.
// When NestJS is added later, it creates its own composition root
// using the exact same service classes from @launchpad/services.
export const sitesService = new SitesService(db);
export const pagesService = new PagesService(db);
export const waitlistService = new WaitlistService(db);
export const templatesService = new TemplatesService(db);

const storageAdapter = createStorageAdapter();
export const mediaService = new MediaService(db, storageAdapter);
export const integrationsService = new IntegrationsService(db);
export const testimonialsService = new TestimonialsService(db);
export const featureRequestsService = new FeatureRequestsService(db);
export const supportService = new SupportService(db);

import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { getPreset, buildPageDataFromPreset } from '@/lib/templates/presets';
import { ConflictError } from '@launchpad/services';

// POST /api/templates/[templateId]/claim — create a site from a template preset
export async function POST(
  req: Request,
  { params }: { params: Promise<{ templateId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { templateId } = await params;
  const preset = getPreset(templateId);

  if (!preset) {
    return Response.json({ error: 'Template not found' }, { status: 404 });
  }

  // Parse body (optional)
  let siteName: string | undefined;
  let siteSlug: string | undefined;
  let brandingOverrides: Record<string, string> = {};
  try {
    const body = await req.json();
    siteName = body.name;
    siteSlug = body.slug;
    if (body.branding) {
      brandingOverrides = body.branding;
    }
  } catch {
    // No body or invalid JSON — use defaults
  }

  const finalName = siteName || preset.branding.companyName || preset.name;
  const baseSlug = (siteSlug || finalName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const finalSlug = baseSlug.length >= 3 ? baseSlug : `${baseSlug}-site`;

  try {
    // Create site with templateId
    const site = await sitesService.create({
      name: finalName,
      slug: finalSlug,
      profileId: profile.id,
      templateId,
    });

    // Build PageData from preset and apply branding overrides
    const pageData = buildPageDataFromPreset(templateId);
    if (pageData) {
      if (brandingOverrides.companyName) pageData.branding.companyName = brandingOverrides.companyName;
      if (brandingOverrides.tagline) pageData.branding.tagline = brandingOverrides.tagline;
      if (brandingOverrides.primaryColor) pageData.branding.primaryColor = brandingOverrides.primaryColor;
      // Override company name from site name if provided
      if (siteName) pageData.branding.companyName = siteName;
      await sitesService.saveTemplateContent(site.id, pageData as unknown as import('@prisma/client').Prisma.InputJsonValue);
    }

    return Response.json({ siteId: site.id, templateId });
  } catch (err) {
    if (err instanceof ConflictError) {
      return Response.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }
}

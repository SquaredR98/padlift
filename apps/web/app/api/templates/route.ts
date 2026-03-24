import { getAuthProfile } from '@/lib/api-auth';
import { TEMPLATE_PRESETS } from '@/lib/templates/presets';

// GET /api/templates — list all templates
export async function GET() {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const templates = TEMPLATE_PRESETS.map((preset) => ({
    id: preset.id,
    name: preset.name,
    description: preset.description,
    category: preset.category,
  }));

  return Response.json(templates);
}

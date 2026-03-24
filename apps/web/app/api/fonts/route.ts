import { NextRequest, NextResponse } from 'next/server';
import { searchFonts } from '@/lib/google-fonts';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;

  const fonts = await searchFonts(q, category);
  return NextResponse.json(fonts);
}

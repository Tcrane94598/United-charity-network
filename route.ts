import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const PostSchema = z.object({
  kind: z.enum(['NEED','OFFER','UPDATE']),
  title: z.string().min(3).max(180),
  body: z.string().min(3).max(4000),
  location: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  contactEmail: z.string().email().optional().nullable(),
  charitySlug: z.string().optional().nullable()
});

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, include: { charity: true } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => ({}));
  const parsed = PostSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues.map(i=>i.message).join(', ') }, { status: 400 });
  }
  const data = parsed.data;
  let charityId: string | undefined = undefined;
  if (data.charitySlug) {
    const c = await prisma.charity.findUnique({ where: { slug: data.charitySlug } });
    if (!c) return NextResponse.json({ error: 'Charity not found.' }, { status: 404 });
    charityId = c.id;
  }
  const created = await prisma.post.create({
    data: {
      kind: data.kind,
      title: data.title,
      body: data.body,
      location: data.location || undefined,
      tags: data.tags,
      contactEmail: data.contactEmail || undefined,
      charityId
    }
  });
  return NextResponse.json(created, { status: 201 });
}

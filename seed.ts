import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const ucn = await prisma.charity.upsert({
    where: { slug: 'united-charity-network' },
    update: {},
    create: {
      name: 'United Charity Network',
      slug: 'united-charity-network',
      description: 'A nonprofit social platform where charities, donors, and volunteers collaborate in real time.',
      verified: true,
      website: 'https://example.org',
      links: { create: [
        { platform: 'instagram', url: 'https://instagram.com/unitedcharitynetwork' },
        { platform: 'x', url: 'https://x.com/unitedcharitynet' },
        { platform: 'youtube', url: 'https://youtube.com/@unitedcharitynetwork' }
      ]}
    }
  });

  await prisma.post.createMany({
    data: [
      {
        kind: 'OFFER',
        title: 'Surplus food available: 500 boxed meals',
        body: 'Pickup within 24 hours. Refrigerated. Can arrange local delivery within 20 miles.',
        location: 'Fresno, CA',
        charityId: ucn.id,
        tags: ['food', 'surplus', 'california'],
        contactEmail: 'offers@unitedcharitynetwork.org'
      },
      {
        kind: 'NEED',
        title: 'Urgent need: children winter coats (sizes 4–10)',
        body: 'Seeking 100 coats for distribution before Dec 1. New or gently used.',
        location: 'Oakland, CA',
        tags: ['clothing', 'children', 'winter'],
        contactEmail: 'needs@unitedcharitynetwork.org'
      },
      {
        kind: 'UPDATE',
        title: '2,000 lbs of produce routed to local pantries today',
        body: 'Thanks to volunteer drivers, excess produce reached 6 pantries in 3 hours.',
        location: 'San Jose, CA',
        charityId: ucn.id,
        tags: ['impact', 'logistics'],
        contactEmail: 'hello@unitedcharitynetwork.org'
      }
    ]
  });

  console.log('Seeded example data.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

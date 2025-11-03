# United Charity Network (MVP) — Vercel + Neon Ready

A nonprofit social platform MVP with **Impact Feed**, **Charity Profiles**, and a simple public posting form.  
Built on **Next.js 14 + TypeScript + Prisma + Tailwind**, configured for **Vercel + Neon Postgres**.

> Tagline: **Where Good Deeds Go Viral.**

## Local Dev
```bash
npm install
cp .env.example .env
# Paste your Neon DATABASE_URL into .env
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel (with Neon)
See `deploy.md` for one-click steps.

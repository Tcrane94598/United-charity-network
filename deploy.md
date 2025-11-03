# Deploy United Charity Network (One Click with Vercel + Neon)

## 1) Create a Neon Postgres DB (Free)
- https://neon.tech → Create Project
- Copy the connection string (looks like `postgresql://USER:PASSWORD@HOST/neon.tech/neondb?sslmode=require`)

## 2) Import the GitHub Repo into Vercel
- https://vercel.com/new → Import Git Repository
- Select your `united-charity-network` repo

## 3) Add Environment Variables
- `NEXT_PUBLIC_APP_NAME` = `United Charity Network`
- `DATABASE_URL` = your Neon connection string

Deploy the project.

## 4) Initialize the DB
From Vercel project → Run Command:
```
npx prisma migrate deploy
npx prisma db seed
```

## 5) Visit your site
`https://<your-project>.vercel.app`

You're live 🎉

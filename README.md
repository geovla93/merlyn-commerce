This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install dependencies:

```bash
npm run install
# or
yarn
# or
pnpm install
```

2. Create a .env.local file at the root of the project and set the following env variables:

- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_STRIPE_PUBLIC_KEY
- GOOGLE_CLIENT_SECRET
- GOOGLE_CLIENT_ID
- DATABASE_URL
- HOST (http://localhost:3000)
- NEXTAUTH_SECRET (openssl rand -base64 32)
- NEXTAUTH_URL (http://localhost:3000)

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will have to sign up for Stripe and setup webhooks first in order for it to work.

## Learn More

Technologies used:

- Next.js
- Prisma
- Stripe
- TailwindCSS
- Next-Auth


Nothing interesing yet, this is just the template README.md that Next.js gives you :p

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contentstack caching and publishing

Article requests are cached for up to five minutes. Author and category
directory requests are cached for up to one hour. These time-based lifetimes
are fallbacks in case a publish webhook is missed. All Contentstack requests
also carry a shared cache tag so a publish event can expire CMS data across
the site immediately.

Set `CONTENTSTACK_WEBHOOK_SECRET` in the server environment. Configure a
Contentstack webhook to send a `POST` request to
`/api/contentstack/revalidate` with an `x-contentstack-webhook-secret` header
whose value matches that secret. The endpoint returns `401` for an invalid
secret and expires the Contentstack cache when authentication succeeds.

The home page and CMS-backed footer are statically prerendered. Therefore, the
Contentstack environment variables must be configured and Contentstack must be
reachable during `next build`. A CMS failure intentionally fails the build
instead of silently generating empty content.

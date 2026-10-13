# TIME Replica

A news site built with Next.js and Contentstack.

## Run locally

1. Install dependencies and create your local environment file:

   ```bash
   npm ci
   cp .env.example .env.local
   ```

2. Fill in `.env.local` with values from your own Contentstack stack:

   | Variable | Description |
   | --- | --- |
   | `CONTENTSTACK_API_KEY` | API key for your Contentstack stack. |
   | `CONTENTSTACK_ACCESS_TOKEN` | Delivery token used to read published content through GraphQL. |
   | `CONTENTSTACK_ENVIRONMENT` | Contentstack environment to query, such as `production`. |
   | `CONTENTSTACK_GRAPHQL_ENDPOINT` | Base URL for your stack's regional Contentstack GraphQL API. The app appends `/<API_KEY>?environment=<ENVIRONMENT>`, so do not include the API key or query string here. |
   | `CONTENTSTACK_REGIONAL_HOSTNAME` | Hostname serving your Contentstack images, without `https://` or a path; used to allow remote images in Next.js. |
   | `CONTENTSTACK_WEBHOOK_SECRET` | Random server-only secret shared with the optional Contentstack cache-revalidation webhook. Leave unset if you are not configuring the webhook. |
   | `NEXT_PUBLIC_GTM_ID` | Optional public Google Tag Manager container ID, such as `GTM-ABC1234`. |

   Keep `.env.local` private and do not commit it. The Contentstack API key,
   access token, environment, GraphQL endpoint, and image hostname are required
   for this project to build. The webhook secret and GTM ID are optional.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. Create and run a production build:

   ```bash
   npm run build
   npm run start
   ```

   The home page and CMS-backed footer are statically prerendered, so the
   required Contentstack settings must be present and the CMS reachable during
   `npm run build`. A failed CMS request fails the build rather than generating
   an empty page.

## Contentstack caching and publishing

Article requests are cached for up to five minutes. Author and category
directory requests are cached for up to one hour. These time-based lifetimes
are fallbacks in case a publish webhook is missed. All Contentstack requests
also carry a shared cache tag so a publish event can expire CMS data across
the site immediately.

To enable immediate invalidation, set `CONTENTSTACK_WEBHOOK_SECRET` in the
server environment and configure a Contentstack webhook to send a `POST`
request to `/api/contentstack/revalidate` with an
`x-contentstack-webhook-secret` header whose value matches the secret. The
endpoint returns `401` for an invalid secret and expires the Contentstack
cache when authentication succeeds.

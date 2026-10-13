import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { CONTENTSTACK_CACHE_TAG } from '@/app/lib/cs_data';

export const runtime = 'nodejs';

function hasValidWebhookSecret(request: Request, expectedSecret: string): boolean {
  const providedSecret = request.headers.get('x-contentstack-webhook-secret');
  if (!providedSecret) return false;

  const provided = Buffer.from(providedSecret);
  const expected = Buffer.from(expectedSecret);
  return (
    provided.length === expected.length &&
    timingSafeEqual(provided, expected)
  );
}

export async function POST(request: Request): Promise<Response> {
  const expectedSecret = process.env.CONTENTSTACK_WEBHOOK_SECRET;
  if (!expectedSecret) {
    console.error('CONTENTSTACK_WEBHOOK_SECRET is not configured.');
    return Response.json(
      { error: 'Contentstack webhook is not configured.' },
      { status: 503 },
    );
  }

  if (!hasValidWebhookSecret(request, expectedSecret)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  revalidateTag(CONTENTSTACK_CACHE_TAG, 'max');
  return Response.json({ revalidated: true });
}

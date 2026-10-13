const API_KEY = process.env.CONTENTSTACK_API_KEY ?? '';
const ACCESS_TOKEN = process.env.CONTENTSTACK_ACCESS_TOKEN ?? '';
const ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT ?? '';
const BASE_ENDPOINT = process.env.CONTENTSTACK_GRAPHQL_ENDPOINT ?? '';
const REQUEST_TIMEOUT_MS = 10_000;

export const CONTENTSTACK_CACHE_TAG = 'contentstack:all';

interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
  revalidate: number | false;
  tags: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function fetchGraphQL<T>({
  query,
  variables = {},
  revalidate,
  tags,
}: GraphQLRequestOptions): Promise<T> {
  if (!API_KEY || !ACCESS_TOKEN || !ENVIRONMENT || !BASE_ENDPOINT) {
    throw new Error('Missing Contentstack configuration');
  }

  const endpoint = `${BASE_ENDPOINT}/${API_KEY}?environment=${ENVIRONMENT}`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: ACCESS_TOKEN,
      },
      cache: 'force-cache',
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate,
        tags: [CONTENTSTACK_CACHE_TAG, ...tags],
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error(
        `Contentstack request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds`,
        { cause: error },
      );
    }
    throw new Error('Unable to reach the Contentstack GraphQL API', {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new Error(
      `Contentstack GraphQL request failed with HTTP ${response.status}`,
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(
      `Contentstack GraphQL returned invalid JSON (HTTP ${response.status})`,
      { cause: error },
    );
  }

  if (!isRecord(payload)) {
    throw new Error('Contentstack GraphQL returned an invalid response');
  }

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    console.error('Contentstack GraphQL Errors:', payload.errors);
    throw new Error('Failed to fetch data from Contentstack GraphQL API');
  }

  if (!('data' in payload) || payload.data === null) {
    throw new Error('Contentstack GraphQL response did not contain data');
  }

  return payload.data as T;
}
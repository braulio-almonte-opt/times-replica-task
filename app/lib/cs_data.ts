const API_KEY = process.env.API_KEY ?? '';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? '';
const ENVIRONMENT = process.env.ENVIRONMENT ?? '';
const BASE_ENDPOINT = process.env.EU_ENDPOINT ?? '';

interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number | false; // Next.js ISR revalidation time in seconds
}

export async function fetchGraphQL<T>({
  query,
  variables = {},
  revalidate = 60, // Default cache: 60 seconds
}: GraphQLRequestOptions): Promise<T> {
  if (!API_KEY || !ACCESS_TOKEN || !ENVIRONMENT || !BASE_ENDPOINT) {
    throw new Error('Missing Contentstack configuration');
  }

  const endpoint = `${BASE_ENDPOINT}/${API_KEY}?environment=${ENVIRONMENT}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token: ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate,
    },
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Contentstack GraphQL Errors:', json.errors);
    throw new Error('Failed to fetch data from Contentstack GraphQL API');
  }

  return json.data as T;
}
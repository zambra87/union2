import { unstable_noStore as noStore } from 'next/cache';

const DEFAULT_DEV_GRAPHQL = 'http://localhost:3001/api/graphql';
const DEFAULT_PROD_GRAPHQL = 'https://admin.unionchurch.cl/api/graphql';

export function resolveGraphqlUri(): string {
  if (process.env.NODE_ENV === 'development') {
    return process.env['ENDPOINT'] || DEFAULT_DEV_GRAPHQL;
  }

  // Short links must follow the live admin host. A stale PRODENDPOINT from a
  // previous Vercel/Railway project would keep serving the old database.
  return DEFAULT_PROD_GRAPHQL;
}

const DESTINATION_QUERY = `
  query Destination($source: String!) {
    redirect(where: { source: $source }) {
      destination
    }
  }
`;

export function toRedirectLocation(destination: string): string {
  const dest = destination.trim();

  if (!dest) {
    return '/';
  }

  if (dest.startsWith('/') && !dest.startsWith('//')) {
    return dest;
  }

  if (/^https?:\/\//i.test(dest)) {
    return dest;
  }

  if (dest.startsWith('//')) {
    return `https:${dest}`;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(dest)) {
    return dest;
  }

  return `https://${dest}`;
}

export async function getRedirectDestination(
  source: string
): Promise<string | null> {
  noStore();

  const response = await fetch(resolveGraphqlUri(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({
      query: DESTINATION_QUERY,
      variables: { source },
    }),
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Keystone GraphQL HTTP ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: { redirect?: { destination?: string | null } | null };
    errors?: { message: string }[];
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join('; '));
  }

  return payload.data?.redirect?.destination?.trim() || null;
}

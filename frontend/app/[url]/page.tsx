import {
  getRedirectDestination,
  toRedirectLocation,
} from '@/lib/keystoneGraphql';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function ShortIdPage({
  params,
}: {
  params: { url: string };
}) {
  noStore();
  const source = params.url;
  let destination: string | null = null;

  try {
    destination = await getRedirectDestination(source);
  } catch (error) {
    console.error('Redirect error:', error);
    redirect('/');
  }

  if (!destination) {
    redirect('/');
  }

  redirect(toRedirectLocation(destination));
}

import { Header } from '@/app/components';
import { MinistryPage } from '@/app/components/MinistryPage';
import {
  getMinisterioBySlug,
  mapMinisterioToMinistryData,
} from '@/lib/services/ministerios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type MinisterioPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: MinisterioPageProps): Promise<Metadata> {
  const ministerio = await getMinisterioBySlug(params.slug);

  if (!ministerio) {
    return { title: 'Ministerio no encontrado' };
  }

  return {
    title: ministerio.title,
  };
}

export default async function MinisterioPage({ params }: MinisterioPageProps) {
  const ministerio = await getMinisterioBySlug(params.slug);

  if (!ministerio) {
    notFound();
  }

  const data = mapMinisterioToMinistryData(ministerio);

  return (
    <>
      <Header variant="light" />
      <MinistryPage data={data} />
    </>
  );
}

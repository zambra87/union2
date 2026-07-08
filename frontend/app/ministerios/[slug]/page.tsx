import { Header } from '@/app/components';
import { MinistryPage } from '@/app/components/MinistryPage';
import {
  getMinisterioBySlug,
  getMinisterioSlugs,
} from '@/app/data/ministerios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type MinisterioPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getMinisterioSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: MinisterioPageProps): Metadata {
  const ministerio = getMinisterioBySlug(params.slug);

  if (!ministerio) {
    return { title: 'Ministerio no encontrado' };
  }

  return {
    title: ministerio.page.title,
  };
}

export default function MinisterioPage({ params }: MinisterioPageProps) {
  const ministerio = getMinisterioBySlug(params.slug);

  if (!ministerio) {
    notFound();
  }

  return (
    <>
      <Header variant="light" />
      <MinistryPage data={ministerio.page} />
    </>
  );
}

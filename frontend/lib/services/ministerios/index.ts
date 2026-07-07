import { gql } from '@apollo/client';
import { initializeApollo } from '@/lib/apolloClient';
import { MinistryData, MinistryLeader } from '@/app/types/ministry';

type ImageField = {
  url?: string | null;
} | null;

export type MinisterioSummary = {
  id: string;
  name: string;
  slug: string;
  order: number | null;
  showInMenu: boolean;
  showOnHomepage: boolean;
  externalUrl: string;
  logoInvert: boolean;
  logo: ImageField;
  logoUrl: string;
};

export type MinisterioLeaderRecord = {
  id: string;
  name: string;
  photo: ImageField;
  photoUrl: string;
};

export type MinisterioRecord = MinisterioSummary & {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: ImageField;
  heroImageUrl: string;
  descriptionTitle: string;
  description: string;
  scheduleLabel: string;
  scheduleValue: string;
  locationLabel: string;
  locationValue: string;
  leadersLabel: string;
  leaders: MinisterioLeaderRecord[];
};

const IMAGE_FIELD = `
  url
`;

const MINISTERIO_FIELDS = gql`
  fragment MinisterioFields on Ministerio {
    id
    name
    slug
    order
    showInMenu
    showOnHomepage
    externalUrl
    logoInvert
    logo {
      ${IMAGE_FIELD}
    }
    logoUrl
    eyebrow
    title
    intro
    heroImage {
      ${IMAGE_FIELD}
    }
    heroImageUrl
    descriptionTitle
    description
    scheduleLabel
    scheduleValue
    locationLabel
    locationValue
    leadersLabel
    leaders {
      id
      name
      photo {
        ${IMAGE_FIELD}
      }
      photoUrl
    }
  }
`;

const GET_MINISTERIOS = gql`
  ${MINISTERIO_FIELDS}
  query Ministerios($where: MinisterioWhereInput!) {
    ministerios(where: $where, orderBy: [{ order: asc }]) {
      ...MinisterioFields
    }
  }
`;

const GET_MINISTERIO_BY_SLUG = gql`
  ${MINISTERIO_FIELDS}
  query MinisterioBySlug($slug: String!) {
    ministerio(where: { slug: $slug }) {
      ...MinisterioFields
    }
  }
`;

function getImageUrl(image: ImageField, fallbackUrl = '') {
  return image?.url || fallbackUrl || '';
}

function mapLeaders(leaders: MinisterioLeaderRecord[]): MinistryLeader[] {
  return leaders.map((leader) => ({
    name: leader.name,
    image: getImageUrl(leader.photo, leader.photoUrl),
  }));
}

export function getMinisterioHref(ministerio: Pick<MinisterioSummary, 'slug' | 'externalUrl'>) {
  if (ministerio.externalUrl) {
    return ministerio.externalUrl;
  }

  return `/ministerios/${ministerio.slug}`;
}

export function getMinisterioLogoUrl(ministerio: Pick<MinisterioSummary, 'logo' | 'logoUrl'>) {
  return getImageUrl(ministerio.logo, ministerio.logoUrl);
}

export function mapMinisterioToMinistryData(
  ministerio: MinisterioRecord
): MinistryData {
  const paragraphs = ministerio.description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    eyebrow: ministerio.eyebrow || 'MINISTERIOS',
    title: ministerio.title,
    intro: ministerio.intro,
    heroImage: getImageUrl(ministerio.heroImage, ministerio.heroImageUrl),
    description: {
      title: ministerio.descriptionTitle || 'Descripción',
      paragraphs,
    },
    sidebar: {
      schedule: {
        label: ministerio.scheduleLabel || 'Horario',
        value: ministerio.scheduleValue,
      },
      location: {
        label: ministerio.locationLabel || 'Ubicación',
        value: ministerio.locationValue,
      },
      leaders: {
        label: ministerio.leadersLabel || 'Encargados',
        people: mapLeaders(ministerio.leaders ?? []),
      },
    },
  };
}

async function fetchMinisterios(where: Record<string, unknown>) {
  const apolloClient = initializeApollo(null);

  const { data } = await apolloClient.query<{ ministerios: MinisterioRecord[] }>({
    query: GET_MINISTERIOS,
    variables: { where },
  });

  return data?.ministerios ?? [];
}

export async function getMenuMinisterios() {
  return fetchMinisterios({ showInMenu: { equals: true } });
}

export async function getHomepageMinisterios() {
  return fetchMinisterios({ showOnHomepage: { equals: true } });
}

export async function getMinisterioBySlug(slug: string) {
  const apolloClient = initializeApollo(null);

  const { data } = await apolloClient.query<{ ministerio: MinisterioRecord | null }>({
    query: GET_MINISTERIO_BY_SLUG,
    variables: { slug },
  });

  return data?.ministerio ?? null;
}

export async function getMinisterioSlugs() {
  const ministerios = await fetchMinisterios({});
  return ministerios.map((ministerio) => ministerio.slug);
}

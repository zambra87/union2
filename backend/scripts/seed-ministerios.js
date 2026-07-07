#!/usr/bin/env node

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3001/api/graphql';

const ministerios = [
  {
    name: 'Union Kids',
    slug: 'kids',
    order: 1,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoInvert: false,
    eyebrow: 'MINISTERIOS',
    title: 'Union Kids',
    intro: 'Niños de 3 a 12 años.',
    heroImageUrl: '/images/kids/hero.jpg',
    logoUrl: '/images/ministries/2.png',
    descriptionTitle: 'Descripción',
    description:
      'Union Kids es el ministerio de Union Church dirigido a los más pequeños, de 3 a 12 años, que se reúne cada domingo a las 11:30 AM. Cuenta con un grupo de maestros y colaboradores para atender todas las edades. Union Kids está enfocado en acompañar a los más pequeños en sus primeros pasos en la fe y colaborar junto a los padres en esta formación. A través de enseñanzas bíblicas, adoración, juegos y actividades, buscamos que cada niño pueda conocer a Jesús de manera cercana y significativa. Nuestro equipo crea un ambiente seguro, alegre y formativo, donde los niños aprenden sobre el amor de Dios y desarrollan una relación personal con Él desde temprana edad. Creemos que la infancia es una etapa clave para sembrar valores y verdades que marcarán toda su vida. ¿Tienes niños? Te invitamos a ser parte de Union Kids y crecer juntos en familia.',
    scheduleLabel: 'Horario',
    scheduleValue: 'Domingos 11:30 AM.',
    locationLabel: 'Texto Bíblico',
    locationValue:
      'Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él. Proverbios 22:6',
    leadersLabel: 'Encargados',
    leaders: [
      { name: 'Mabel Rivas', image: '/images/kids/leader.jpg' },
      { name: 'Karen Hernandez', image: '/images/kids/leader.jpg' },
      { name: 'Pamela Henriquez', image: '/images/kids/leader.jpg' },
    ],
  },
  {
    name: 'Leones',
    slug: 'leones',
    order: 2,
    externalUrl: 'https://www.unionchurch.cl/leones',
    logoInvert: true,
    logoUrl: '/images/ministries/6.png',
    title: 'Leones',
  },
  {
    name: 'Union X',
    slug: 'unionx',
    order: 3,
    externalUrl: 'https://www.unionchurch.cl/unionx',
    logoUrl: '/images/ministries/3.png',
    title: 'Union X',
  },
  {
    name: 'Union +',
    slug: 'unionplus',
    order: 4,
    externalUrl: 'https://www.unionchurch.cl/unionplus',
    logoUrl: '/images/ministries/7.png',
    title: 'Union +',
  },
  {
    name: 'Mujeres',
    slug: 'mujeres',
    order: 5,
    externalUrl: 'https://www.unionchurch.cl/mujeres',
    logoUrl: '/images/ministries/1.png',
    title: 'Mujeres',
  },
  {
    name: 'Hombres',
    slug: 'hombres',
    order: 6,
    externalUrl: 'https://www.unionchurch.cl/hombres',
    logoUrl: '/images/ministries/4.png',
    title: 'Hombres',
  },
  {
    name: 'Años Dorados',
    slug: 'dorados',
    order: 7,
    externalUrl: 'https://www.unionchurch.cl/dorados',
    logoUrl: '/images/ministries/5.png',
    title: 'Años Dorados',
  },
  {
    name: 'Matrimonios',
    slug: 'matrimonios',
    order: 8,
    externalUrl: 'https://www.unionchurch.cl/matrimonios',
    logoUrl: '/images/ministries/8.png',
    title: 'Matrimonios',
  },
  {
    name: 'Manos en acción',
    slug: 'manos',
    order: 9,
    externalUrl: 'https://www.unionchurch.cl/manos',
    logoUrl: '/images/ministries/9.jpg',
    title: 'Manos en acción',
  },
  {
    name: 'Rema',
    slug: 'rema',
    order: 10,
    externalUrl: 'https://www.unionchurch.cl/rema',
    logoUrl: '/images/ministries/10.png',
    title: 'Rema',
  },
];

const CREATE_MINISTERIO = `
  mutation CreateMinisterio($data: MinisterioCreateInput!) {
    createMinisterio(data: $data) {
      id
      slug
    }
  }
`;

async function seed() {
  for (const ministerio of ministerios) {
    const data = {
      name: ministerio.name,
      slug: ministerio.slug,
      order: ministerio.order,
      showInMenu: ministerio.showInMenu ?? true,
      showOnHomepage: ministerio.showOnHomepage ?? true,
      externalUrl: ministerio.externalUrl ?? '',
      logoInvert: ministerio.logoInvert ?? false,
      eyebrow: ministerio.eyebrow ?? 'MINISTERIOS',
      title: ministerio.title,
      intro: ministerio.intro ?? '',
      heroImageUrl: ministerio.heroImageUrl ?? '',
      logoUrl: ministerio.logoUrl ?? '',
      descriptionTitle: ministerio.descriptionTitle ?? 'Descripción',
      description: ministerio.description ?? '',
      scheduleLabel: ministerio.scheduleLabel ?? 'Horario',
      scheduleValue: ministerio.scheduleValue ?? '',
      locationLabel: ministerio.locationLabel ?? 'Ubicación',
      locationValue: ministerio.locationValue ?? '',
      leadersLabel: ministerio.leadersLabel ?? 'Encargados',
      leaders: ministerio.leaders ?? [],
    };

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: CREATE_MINISTERIO,
        variables: { data },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error(`Failed to seed ${ministerio.slug}:`, result.errors);
      continue;
    }

    console.log(`Seeded ${ministerio.slug}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

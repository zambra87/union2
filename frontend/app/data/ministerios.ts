import { MinistryData } from '@/app/types/ministry';
import kidsData from '@/app/kids/data.json';

export type MinisterioSummary = {
  slug: string;
  name: string;
  order: number;
  showInMenu: boolean;
  showOnHomepage: boolean;
  externalUrl: string;
  logoUrl: string;
  logoInvert: boolean;
};

export type MinisterioStatic = MinisterioSummary & {
  page: MinistryData;
};

const PLACEHOLDER_LEADER = '/images/ministerios/placeholder-leader.jpg';
const PLACEHOLDER_HERO = '/images/ministerios/placeholder-hero.jpg';

function leadersFromNames(
  names: string,
  slug: string
): MinistryData['sidebar']['leaders'] {
  const people = names
    .split(/,| y /)
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({
      name,
      image:
        slug === 'kids'
          ? '/images/kids/leader.jpg'
          : `/images/ministerios/${slug}/leader.jpg`,
    }));

  return {
    label: 'Encargados',
    people:
      people.length > 0 ? people : [{ name: '', image: PLACEHOLDER_LEADER }],
  };
}

export const ministerios: MinisterioStatic[] = [
  {
    slug: 'misiones',
    name: 'Misiones Union Church',
    order: 1,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministerios/misiones/logo.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Misiones Union Church',
      intro: 'Conectamos a la iglesia con el trabajo misionero en el mundo.',
      heroImage: '/images/ministerios/misiones/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'Misiones Union Church conecta a la iglesia con el trabajo misionero que Dios está haciendo en distintos lugares del mundo, a través de nuestros misioneros asociados y de quienes quieren avanzar en ese llamado.',
        ],
      },
      sidebar: {
        schedule: { label: 'Horario', value: 'Consultar en iglesia.' },
        location: {
          label: 'Texto Bíblico',
          value:
            'Recibirán poder cuando el Espíritu Santo descienda sobre ustedes; y serán mis testigos, y le hablarán a la gente acerca de mí en todas partes: en Jerusalén, por toda Judea, en Samaria y hasta los lugares más lejanos de la tierra. Hechos 1:8',
        },
        leaders: {
          label: 'Encargada',
          people: [
            {
              name: 'Paula Valenzuela',
              image: '/images/ministerios/misiones/leader.jpg',
            },
          ],
        },
      },
    },
  },
  {
    slug: 'matrimonios',
    name: 'Matrimonios',
    order: 2,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/8.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Matrimonios',
      intro: 'Espacio para fortalecer la relación de pareja a la luz de la fe.',
      heroImage: '/images/ministerios/matrimonios/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'Somos una instancia dirigida a los matrimonios y se reúne un sábado al mes a las 16:00 hrs.',
          'El ministerio de Matrimonios es un espacio para fortalecer la relación de pareja a la luz de la fe, y conforme a la Palabra de Dios, abordando temas clave para el crecimiento de la familia.',
        ],
      },
      sidebar: {
        schedule: { label: 'Horario', value: 'Un sábado al mes, 16:00 hrs.' },
        location: {
          label: 'Texto Bíblico',
          value:
            'Uno solo puede ser vencido, pero dos pueden resistir. ¡La cuerda de tres hilos no se rompe fácilmente! Eclesiastés 4:12',
        },
        leaders: leadersFromNames(
          'Alexis Martínez y Yanina Ossandón',
          'matrimonios'
        ),
      },
    },
  },
  {
    slug: 'dorados',
    name: 'Años Dorados',
    order: 3,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/5.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Años Dorados',
      intro: 'Adultos mayores.',
      heroImage: '/images/ministerios/dorados/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'Es la instancia dirigida a adultos mayores que se reúne los miércoles cada 15 días.',
          'Años Dorados es un espacio diseñado para seguir creciendo en la fe y disfrutar de la vida en comunidad. A través de reuniones, tiempos de oración y enseñanza bíblica.',
        ],
      },
      sidebar: {
        schedule: {
          label: 'Horario',
          value: 'Miércoles cada 15 días, 16:00 a 18:00 hrs.',
        },
        location: {
          label: 'Texto Bíblico',
          value:
            'Oh Dios, me enseñaste desde mi juventud, Y hasta ahora he manifestado tus maravillas. Salmo 71:17',
        },
        leaders: leadersFromNames(
          'Juan Cisternas, Janette Morris y Patricia Alvarado',
          'dorados'
        ),
      },
    },
  },
  {
    slug: 'unionx',
    name: 'Union X',
    order: 4,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/3.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Union X',
      intro: 'Jóvenes de 17 a 25 años.',
      heroImage: '/images/ministerios/unionx/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'Union X es la instancia para jóvenes preuniversitarios y universitarios de entre 17 y 25 años, que se reúne cada sábado a las 17:30 hrs.',
          'Union X está enfocado en acompañar a los jóvenes en una etapa de cambios, decisiones y crecimiento, fortaleciendo su fe y su comunidad.',
        ],
      },
      sidebar: {
        schedule: { label: 'Horario', value: 'Sábados 17:30 hrs.' },
        location: {
          label: 'Texto Bíblico',
          value:
            'Los que confían en el Señor encontrarán nuevas fuerzas; volarán alto, como con alas de águila. Correrán y no se cansarán; caminarán y no desmayarán. Isaías 40:30-31',
        },
        leaders: leadersFromNames('Daniel Zambra y Daniela Chávez', 'unionx'),
      },
    },
  },
  {
    slug: 'hombres',
    name: 'Red de Hombres',
    order: 5,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/4.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Red de Hombres',
      intro: 'Instancia de crecimiento para hombres.',
      heroImage: '/images/ministerios/hombres/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'La Red de Hombres es la instancia de crecimiento para los hombres. Se reúnen una vez al mes y en grupos pequeños semanales o quincenales.',
          'Los lunes a las 19:30 y 20:00 hrs., martes a las 20:30 hrs. y viernes a las 19:30 y 20:00 hrs.',
        ],
      },
      sidebar: {
        schedule: {
          label: 'Horario',
          value:
            'Reunión mensual (sábados AM) · Grupos: Lunes 19:30 y 20:00 · Martes 20:30 · Viernes 19:30 y 20:00',
        },
        location: {
          label: 'Texto Bíblico',
          value:
            'Estén alerta, permanezcan firmes en la fe, pórtense varonilmente, sean fuertes. 1 Corintios 16:13',
        },
        leaders: leadersFromNames(
          'Héctor Aguilar, David Pino y Alfonso Riquelme',
          'hombres'
        ),
      },
    },
  },
  {
    slug: 'mujeres',
    name: 'Taller de Mujeres',
    order: 6,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/1.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Taller de Mujeres',
      intro: 'Dirigido a mujeres de todas las edades.',
      heroImage: '/images/ministerios/mujeres/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'El Taller de Mujeres está dirigido a mujeres de todas las edades, con tres instancias semanales: martes a las 10:00 hrs. de forma presencial, martes a las 20:00 hrs. en modalidad online y jueves a las 18:00 hrs. presencial.',
        ],
      },
      sidebar: {
        schedule: {
          label: 'Horario',
          value:
            'Martes 10:00 hrs. (presencial) · Martes 20:00 hrs. (online) · Jueves 18:00 hrs. (presencial)',
        },
        location: {
          label: 'Texto Bíblico',
          value:
            'Mujer virtuosa, ¿quién la hallará? Porque su estima sobrepasa largamente a la de las piedras preciosas. Proverbios 31:10',
        },
        leaders: leadersFromNames(
          'Patricia Marroquín y Margarita Fernández',
          'mujeres'
        ),
      },
    },
  },
  {
    slug: 'unionplus',
    name: 'Union +',
    order: 7,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/7.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Union +',
      intro: 'Jóvenes adultos y profesionales.',
      heroImage: '/images/ministerios/unionplus/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'Union + es la instancia dirigida a jóvenes profesionales y adultos jóvenes, mayores de 25 años, que se reúne los sábados cada 15 días a las 19:00 hrs.',
          'Union + está enfocado en vivir la fe en medio de la vida laboral, familiar y social.',
        ],
      },
      sidebar: {
        schedule: {
          label: 'Horario',
          value: 'Sábados cada 15 días, 19:00 hrs.',
        },
        location: {
          label: 'Texto Bíblico',
          value:
            'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia. Isaías 41:10',
        },
        leaders: leadersFromNames(
          'Rodrigo Ewertz y Andrea Pereira',
          'unionplus'
        ),
      },
    },
  },
  {
    slug: 'rema',
    name: 'REMA',
    order: 8,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/10.png',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'REMA',
      intro: 'Restauración para mujeres.',
      heroImage: '/images/ministerios/rema/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'REMA Union Church tiene como propósito brindar acompañamiento integral a mujeres que han vivido experiencias difíciles, a través de un equipo de profesionales de la salud con formación cristiana.',
        ],
      },
      sidebar: {
        schedule: { label: 'Horario', value: 'Miércoles 18:00 y 20:00 hrs.' },
        location: {
          label: 'Texto Bíblico',
          value:
            'No tengas miedo, porque yo estoy contigo; no te desalientes, porque yo soy tu Dios. Te daré fuerzas y te ayudaré; te sostendré con mi mano derecha victoriosa. Isaías 41:10',
        },
        leaders: {
          label: 'Encargada',
          people: [
            {
              name: 'Psicóloga Ingrid Olguín',
              image: '/images/ministerios/rema/leader.jpg',
            },
          ],
        },
      },
    },
  },
  {
    slug: 'leones',
    name: 'Leones',
    order: 9,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/6.png',
    logoInvert: true,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Leones',
      intro: 'Adolescentes de 13 a 17 años.',
      heroImage: '/images/ministerios/leones/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'Es la instancia dirigida a los adolescentes de enseñanza media, entre los 13 y 17 años. Se reúnen cada domingo a las 11:30 AM.',
          'Leones es un espacio donde pueden crecer en su fe mientras enfrentan decisiones importantes de esta etapa de la vida.',
        ],
      },
      sidebar: {
        schedule: { label: 'Horario', value: 'Domingos 11:30 AM' },
        location: {
          label: 'Texto Bíblico',
          value:
            'Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza. 1 Timoteo 4:12',
        },
        leaders: leadersFromNames('Pablo Flores y Alexandra Rivera', 'leones'),
      },
    },
  },
  {
    slug: 'manos',
    name: 'Manos en Acción',
    order: 10,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/9.jpg',
    logoInvert: false,
    page: {
      eyebrow: 'MINISTERIOS',
      title: 'Manos en Acción',
      intro: 'Para quienes quieren servir a otros.',
      heroImage: '/images/ministerios/manos/hero.jpg',
      description: {
        title: 'Descripción',
        paragraphs: [
          'En Manos en Acción nos enfocamos en servir a otros. Se reúne los sábados cada 15 días a las 10:00 hrs.',
          'Manos en Acción tiene como propósito llevar el amor de Cristo a través de acciones concretas en contextos vulnerables.',
        ],
      },
      sidebar: {
        schedule: {
          label: 'Horario',
          value: 'Sábados cada 15 días, 10:00 hrs.',
        },
        location: {
          label: 'Texto Bíblico',
          value:
            'De cierto os digo que en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis. Mateo 25:40',
        },
        leaders: leadersFromNames('Alejandro Vega y Ninoska Delgado', 'manos'),
      },
    },
  },
  {
    slug: 'kids',
    name: 'Union Kids',
    order: 11,
    showInMenu: true,
    showOnHomepage: true,
    externalUrl: '',
    logoUrl: '/images/ministries/2.png',
    logoInvert: false,
    page: kidsData as MinistryData,
  },
];

export function getMenuMinisterios(): MinisterioSummary[] {
  return ministerios
    .filter((m) => m.showInMenu)
    .sort((a, b) => a.order - b.order)
    .map(
      ({
        slug,
        name,
        order,
        showInMenu,
        showOnHomepage,
        externalUrl,
        logoUrl,
        logoInvert,
      }) => ({
        slug,
        name,
        order,
        showInMenu,
        showOnHomepage,
        externalUrl,
        logoUrl,
        logoInvert,
      })
    );
}

export function getHomepageMinisterios(): MinisterioSummary[] {
  return ministerios
    .filter((m) => m.showOnHomepage)
    .sort((a, b) => a.order - b.order)
    .map(
      ({
        slug,
        name,
        order,
        showInMenu,
        showOnHomepage,
        externalUrl,
        logoUrl,
        logoInvert,
      }) => ({
        slug,
        name,
        order,
        showInMenu,
        showOnHomepage,
        externalUrl,
        logoUrl,
        logoInvert,
      })
    );
}

export function getMinisterioBySlug(
  slug: string
): MinisterioStatic | undefined {
  return ministerios.find((m) => m.slug === slug);
}

export function getMinisterioSlugs(): string[] {
  return ministerios.map((m) => m.slug);
}

export function getMinisterioHref(
  ministerio: Pick<MinisterioSummary, 'slug' | 'externalUrl'>
) {
  if (ministerio.externalUrl) {
    return ministerio.externalUrl;
  }
  return `/ministerios/${ministerio.slug}`;
}

export function getMinisterioLogoUrl(
  ministerio: Pick<MinisterioSummary, 'logoUrl'>
) {
  return ministerio.logoUrl || PLACEHOLDER_HERO;
}

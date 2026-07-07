import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  checkbox,
  image,
  integer,
  password,
  relationship,
  text,
} from '@keystone-6/core/fields';
import type { Lists } from '.keystone/types';

const hidden = {
  ui: {
    createView: { fieldMode: 'hidden' as const },
    itemView: { fieldMode: 'hidden' as const },
    listView: { fieldMode: 'hidden' as const },
  },
};

export const lists: Lists = {
  Redirect: list({
    access: allowAll,
    fields: {
      source: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      destination: text({ validation: { isRequired: true } }),
    },
  }),
  Person: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password({ validation: { isRequired: true } }),
    },
  }),
  MinisterioLeader: list({
    access: allowAll,
    ui: {
      isHidden: true,
      labelField: 'name',
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        label: 'Nombre',
      }),
      photo: image({
        storage: 'ministerio_images',
        label: 'Foto',
      }),
      photoUrl: text({
        label: 'URL foto (legacy)',
        ...hidden,
      }),
      ministerio: relationship({
        ref: 'Ministerio.leaders',
        many: false,
      }),
    },
  }),
  Ministerio: list({
    access: allowAll,
    ui: {
      labelField: 'name',
      listView: {
        initialColumns: ['name', 'slug', 'order', 'showInMenu', 'showOnHomepage'],
        initialSort: { field: 'order', direction: 'ASC' },
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        label: 'Nombre',
      }),
      slug: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        label: 'Slug (URL)',
      }),
      order: integer({
        defaultValue: 0,
        label: 'Orden',
      }),
      showInMenu: checkbox({
        defaultValue: true,
        label: 'Mostrar en menú',
      }),
      showOnHomepage: checkbox({
        defaultValue: true,
        label: 'Mostrar en inicio',
      }),
      externalUrl: text({
        label: 'URL externa (opcional)',
      }),
      logoInvert: checkbox({
        defaultValue: false,
        label: 'Logo invertido (estilo Leones)',
      }),
      eyebrow: text({
        defaultValue: 'MINISTERIOS',
      }),
      title: text({
        validation: { isRequired: true },
        label: 'Título',
      }),
      intro: text({
        ui: { displayMode: 'textarea' },
        label: 'Introducción',
      }),
      heroImage: image({
        storage: 'ministerio_images',
        label: 'Imagen hero',
      }),
      logo: image({
        storage: 'ministerio_images',
        label: 'Logo',
      }),
      heroImageUrl: text({
        label: 'URL imagen hero (legacy)',
        ...hidden,
      }),
      logoUrl: text({
        label: 'URL logo (legacy)',
        ...hidden,
      }),
      descriptionTitle: text({
        defaultValue: 'Descripción',
        label: 'Título descripción',
      }),
      description: text({
        ui: { displayMode: 'textarea' },
        label: 'Descripción (separa párrafos con una línea en blanco)',
      }),
      scheduleLabel: text({
        defaultValue: 'Horario',
      }),
      scheduleValue: text({
        label: 'Horario',
      }),
      locationLabel: text({
        defaultValue: 'Ubicación',
      }),
      locationValue: text({
        ui: { displayMode: 'textarea' },
        label: 'Ubicación / texto bíblico',
      }),
      leadersLabel: text({
        defaultValue: 'Encargados',
      }),
      leaders: relationship({
        ref: 'MinisterioLeader.ministerio',
        many: true,
        label: 'Encargados',
      }),
    },
  }),
};

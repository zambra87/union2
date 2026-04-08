import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, text } from '@keystone-6/core/fields';
import type { Lists } from '.keystone/types';

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
      name: text({validation: { isRequired: true }}),
      email: text({validation: { isRequired: true}, isIndexed: 'unique'}),
      password: password({ validation: { isRequired: true }}),
    },
  }),
};

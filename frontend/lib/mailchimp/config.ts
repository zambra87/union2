import mailchimp from '@mailchimp/mailchimp_marketing';

export const mailchimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY,
  listId: process.env.MAILCHIMP_LIST_ID,
  server: 'us12',
} as const;

export const initializeMailchimp = () => {
  mailchimp.setConfig({
    apiKey: mailchimpConfig.apiKey,
    server: mailchimpConfig.server,
  });
};

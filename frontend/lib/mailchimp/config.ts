import mailchimp from '@mailchimp/mailchimp_marketing';

function getMailchimpServer(apiKey?: string): string {
  if (!apiKey) return 'us12';

  const match = apiKey.match(/-([a-z0-9]+)$/i);
  return match?.[1] ?? 'us12';
}

export const mailchimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY,
  listId: process.env.MAILCHIMP_LIST_ID,
  get server() {
    return getMailchimpServer(this.apiKey);
  },
} as const;

export const initializeMailchimp = () => {
  mailchimp.setConfig({
    apiKey: mailchimpConfig.apiKey,
    server: mailchimpConfig.server,
  });
};

export function getMissingMailchimpEnvVars(): string[] {
  return Object.entries(mailchimpConfig)
    .filter(([key, value]) => key !== 'server' && !value)
    .map(([key]) => key);
}

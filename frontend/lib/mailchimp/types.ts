export type MailchimpErrorResponse = {
  response: {
    body: {
      title: string;
      status: number;
      detail: string;
      instance: string;
    };
    status: number;
  };
};

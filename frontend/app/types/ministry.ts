export type MinistryLeader = {
  name: string;
  image: string;
};

export type MinistryData = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  description: {
    title: string;
    paragraphs: string[];
  };
  sidebar: {
    schedule: {
      label: string;
      value: string;
    };
    location: {
      label: string;
      value: string;
    };
    leaders: {
      label: string;
      people: MinistryLeader[];
    };
  };
};

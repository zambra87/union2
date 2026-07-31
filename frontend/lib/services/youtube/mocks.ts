import type { VideoRender } from './types';

export function getMockLatestServices(): VideoRender[] {
  return [
    {
      title: 'Sunday Service - March 24',
      date: 'March 24, 2024',
      eventType: 'Sunday Service',
      videoId: 'mock-video-1',
      thumbnailSrc: '/images/mocks/services/service-1.webp',
      thumbnailWidth: 480,
      thumbnailHeight: 360,
    },
    {
      title: 'Wednesday Service - March 20',
      date: 'March 20, 2024',
      eventType: 'Wednesday Service',
      videoId: 'mock-video-2',
      thumbnailSrc: '/images/mocks/services/service-1.webp',
      thumbnailWidth: 480,
      thumbnailHeight: 360,
    },
    {
      title: 'Sunday Service - March 17',
      date: 'March 17, 2024',
      eventType: 'Sunday Service',
      videoId: 'mock-video-3',
      thumbnailSrc: '/images/mocks/services/service-1.webp',
      thumbnailWidth: 480,
      thumbnailHeight: 360,
    },
  ];
}

export function getMockLatestShepherdDesk(): VideoRender[] {
  return [
    {
      title: "Shepherd's Desk - March 24",
      date: 'March 24, 2024',
      eventType: "Shepherd's Desk",
      videoId: 'mock-desk-1',
      thumbnailSrc: '/images/mocks/shepperd-desk/desk-1.webp',
      thumbnailWidth: 480,
      thumbnailHeight: 360,
    },
    {
      title: "Shepherd's Desk - March 17",
      date: 'March 17, 2024',
      eventType: "Shepherd's Desk",
      videoId: 'mock-desk-2',
      thumbnailSrc: '/images/mocks/shepperd-desk/desk-1.webp',
      thumbnailWidth: 480,
      thumbnailHeight: 360,
    },
  ];
}

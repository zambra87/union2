export type Video = {
  id: number;
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
  status: {
    privacyStatus: string;
  };
};

export type VideoRender = {
  title: string;
  date: string;
  eventType: string;
  videoId: string;
  thumbnailSrc: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
};

'use client';

import YouTube from 'react-youtube';

type YouTubePlayerProps = {
  videoId: string;
  className?: string;
};

export function YouTubePlayer({ videoId, className }: YouTubePlayerProps) {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
    },
  };

  return <YouTube className={className} videoId={videoId} opts={opts} />;
}

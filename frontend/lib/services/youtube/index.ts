export { getMockLatestServices, getMockLatestShepherdDesk } from './mocks';
export type { VideoRender, Video } from './types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function getYouTubeVideos(playlistId: string) {
  if (!playlistId) {
    throw new Error('Playlist ID is required');
  }

  if (!process.env.YOUTUBE_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  try {
    const res = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?` +
        new URLSearchParams({
          part: 'snippet,status',
          maxResults: '3',
          playlistId,
          key: process.env.YOUTUBE_KEY,
        }),
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        `YouTube API error: ${error.error?.message || 'Unknown error'}`
      );
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
}

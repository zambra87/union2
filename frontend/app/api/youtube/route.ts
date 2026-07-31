import { NextResponse } from 'next/server';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function GET() {
  if (!process.env.YOUTUBE_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `${YOUTUBE_API_BASE}/videos?` +
        new URLSearchParams({
          part: 'snippet,status',
          channelId: process.env.YOUTUBE_CHANNEL_ID || '',
          broadcastStatus: 'active',
          type: 'video',
          key: process.env.YOUTUBE_KEY,
        })
    );

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { error: error.error?.message || 'Unknown error' },
        { status: res.status }
      );
    }

    const data = await res.json();

    if (data.items.length === 0) {
      return NextResponse.json({
        isLive: false,
        stream: null,
      });
    }

    const liveStream = data.items[0];
    return NextResponse.json({
      isLive: true,
      stream: {
        id: liveStream.id,
        title: liveStream.snippet.title,
        description: liveStream.snippet.description,
        publishedAt: liveStream.snippet.publishedAt,
        thumbnailUrl: liveStream.snippet.thumbnails.high.url,
        channelTitle: liveStream.snippet.channelTitle,
      },
    });
  } catch (error) {
    console.error('Error checking live status:', error);
    return NextResponse.json(
      { error: 'Failed to check live status' },
      { status: 500 }
    );
  }
}

import Link from 'next/link';
import Image from 'next/image';
import {
  getYouTubeVideos,
  VideoRender,
  Video,
  getMockLatestShepherdDesk,
} from '@/lib/services/youtube';

export async function LatestShepperDesk() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  let videos: VideoRender[];

  if (isDevelopment) {
    videos = getMockLatestShepherdDesk();
  } else {
    const playlistId = process.env.SHEPPERD_PLAYLIST_ID;
    if (!playlistId) {
      throw new Error(
        'SHEPPERD_PLAYLIST_ID is not defined in environment variables'
      );
    }
    const data = await getYouTubeVideos(playlistId);
    videos = data.items
      .map(({ snippet, status }: Video) => {
        const dashSplitRegex = /(.*?)-(.*)/;
        const colonSplitRegex = /(.*?):(.*)/;
        const quotesRegex = /"(.*?)"/g;

        const { title, thumbnails, resourceId } = snippet;
        const { high } = thumbnails;

        const dashSplitMatch = dashSplitRegex.exec(title);
        const colonSplitMatch = colonSplitRegex.exec(title);
        const videoName = title
          .match(quotesRegex)
          ?.map((match) => match.replace(/"/g, ''));
        const videoDate = dashSplitMatch ? dashSplitMatch[2].trim() : '';
        const eventType = colonSplitMatch ? colonSplitMatch[1].trim() : '';

        if (
          status.privacyStatus !== 'private' &&
          title.split(' ').includes('Deleted') === false
        ) {
          return {
            title: videoName ? videoName : '',
            date: videoDate ? videoDate : '',
            eventType: eventType ? eventType : '',
            videoId: resourceId.videoId,
            thumbnailSrc: high.url,
            thumbnailWidth: high.width,
            thumbnailHeight: high.height,
          };
        } else {
          return null;
        }
      })
      .filter((video: VideoRender) => video !== null) as VideoRender[];
  }

  return (
    <div className="flex justify-between text-left pb-16 space-x-8 overflow-x-scroll scrollbar-none">
      {videos.map(
        ({
          videoId,
          thumbnailWidth,
          thumbnailHeight,
          thumbnailSrc,
          eventType,
          title,
          date,
        }) => (
          <Link
            key={videoId}
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noreferrer"
            className="mb-8 lg:mb-0 shrink-0"
          >
            <Image
              className="rounded-lg overflow-hidden h-64 object-cover mb-4"
              width={thumbnailWidth}
              height={thumbnailHeight}
              src={thumbnailSrc}
              alt={title}
              unoptimized={true}
            />
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset uppercase">
              {eventType}
            </span>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 my-2 font-medium">
              {title}
            </p>
            <p className="text-base md:text-lg font-medium text-gray-600 mb-4">
              {date}
            </p>
          </Link>
        )
      )}
    </div>
  );
}

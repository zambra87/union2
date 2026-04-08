'use client';

import { useLive } from '@/app/contexts/LiveContext';
import { YouTubePlayer } from './YouTubePlayer';
import Image from 'next/image';
import cover from '@/public/images/cover.jpg';
import { Header } from './Header';
import { Facebook, Instagram, Youtube } from './icons';

type CoverContentProps = {
  isLive: boolean;
  videoId: string | null;
  isLoading: boolean;
};

function CoverContent({ isLive, videoId, isLoading }: CoverContentProps) {
  if (isLoading) {
    return (
      <div className="container mx-auto aspect-video bg-gray-200 animate-pulse rounded-2xl flex justify-center items-center">
        <p className="text-center text-2xl font-bold">Cargando...</p>
      </div>
    );
  }
  if (isLive && videoId) {
    return (
      <div className="container mx-auto px-8 md:px-0">
        <YouTubePlayer
          className="h-full w-full aspect-video overflow-hidden rounded-2xl"
          videoId={videoId}
        />
      </div>
    );
  }

  return (
    <>
      <Image
        className="absolute object-cover w-full h-full"
        alt="Cover"
        src={cover}
        placeholder="blur"
      />
      <div className="h-full flex justify-center items-center relative">
        <div>
          <p className="text-center font-semibold drop-shadow-lg text-white font-sans text-5xl mt-40 mb-2 md:text-6xl lg:text-6xl">
            Union Church
          </p>
          <p className="text-center text-white drop-shadow-lg font-serif text-3xl mb-20 md:text-2xl lg:text-2xl">
            Bienvenido a Casa
          </p>
          <div className="flex justify-center">
            <a
              href="https://www.facebook.com/unionchurch.cl"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="mr-8" />
            </a>
            <a
              href="https://www.instagram.com/unionchurch.cl/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="mr-8" />
            </a>
            <a
              href="https://www.youtube.com/c/UnionChurchcl"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function Cover() {
  const { isLive, videoId, isLoading } = useLive();

  const containerClass =
    isLive || isLoading || videoId
      ? 'h-auto pt-40 pb-16 lg:h-screen w-full flex justify-center items-center bg-gray'
      : 'h-screen';

  return (
    <div className={containerClass}>
      <Header />
      <CoverContent isLive={isLive} videoId={videoId} isLoading={isLoading} />
    </div>
  );
}

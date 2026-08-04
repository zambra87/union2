'use client';

import { useLive } from '@/app/contexts/LiveContext';
import { YouTubePlayer } from './YouTubePlayer';
import { Header } from './Header';

function CoverHeroText() {
  return (
    <div>
      <p className="text-center font-semibold drop-shadow-lg text-white font-sans text-5xl mb-2 md:text-6xl lg:text-7xl">
        Union Church
      </p>
      <p className="text-center text-white drop-shadow-lg font-serif text-3xl mb-5 md:text-2xl lg:text-3xl">
        Bienvenido a Casa
      </p>
    </div>
  );
}

export function Cover() {
  const { isLive, videoId, isLoading } = useLive();

  if (isLoading) {
    return (
      <div className="h-auto w-full bg-gray pt-40 pb-16 lg:h-screen flex flex-col">
        <Header />
        <div className="container mx-auto aspect-video flex-1 bg-gray-200 animate-pulse rounded-2xl flex justify-center items-center">
          <p className="text-center text-2xl font-bold">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isLive && videoId) {
    return (
      <div className="h-auto w-full bg-gray pt-40 pb-16 lg:h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-8 md:px-0 flex-1 flex items-center">
          <YouTubePlayer
            className="h-full w-full aspect-video overflow-hidden rounded-2xl"
            videoId={videoId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/cover.jpg')" }}
      />
      <div className="relative z-[1] flex h-full flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center px-8">
          <CoverHeroText />
        </div>
      </div>
    </div>
  );
}

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getLiveStreamStatus } from '@/lib/services/youtube';

type LiveContextType = {
  isLive: boolean;
  videoId: string | null;
  isLoading: boolean;
};

const LiveContext = createContext<LiveContextType>({
  isLive: false,
  videoId: null,
  isLoading: true,
});

export function LiveProvider({ children }: { children: React.ReactNode }) {
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLiveStatus() {
      if (process.env.NODE_ENV === 'development') {
        setIsLoading(false);
        return;
      }

      try {
        const { isLive, stream } = await getLiveStreamStatus();
        setIsLive(isLive);
        setVideoId(stream?.id || null);
      } catch (error) {
        console.error('Failed to check live status:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkLiveStatus();
    // Check every minute
    const interval = setInterval(checkLiveStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LiveContext.Provider value={{ isLive, videoId, isLoading }}>
      {children}
    </LiveContext.Provider>
  );
}

export const useLive = () => useContext(LiveContext);

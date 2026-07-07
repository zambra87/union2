'use client';

import { createContext, useContext } from 'react';
import { MinisterioSummary } from '@/lib/services/ministerios';

type MinisteriosContextType = {
  ministerios: MinisterioSummary[];
};

const MinisteriosContext = createContext<MinisteriosContextType>({
  ministerios: [],
});

export function MinisteriosProvider({
  ministerios,
  children,
}: {
  ministerios: MinisterioSummary[];
  children: React.ReactNode;
}) {
  return (
    <MinisteriosContext.Provider value={{ ministerios }}>
      {children}
    </MinisteriosContext.Provider>
  );
}

export function useMinisterios() {
  return useContext(MinisteriosContext);
}

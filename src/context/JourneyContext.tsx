import React, { createContext, useState, useContext, ReactNode } from 'react';

type Journey = {
  busId: string;
  destination: string;
  from: string;
} | null;

interface JourneyContextType {
  activeJourney: Journey;
  boardBus: (busId: string, destination: string, from: string) => void;
  completeJourney: () => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [activeJourney, setActiveJourney] = useState<Journey>(null);

  const boardBus = (busId: string, destination: string, from: string) => {
    setActiveJourney({ busId, destination, from });
  };

  const completeJourney = () => {
    setActiveJourney(null);
  };

  return (
    <JourneyContext.Provider value={{ activeJourney, boardBus, completeJourney }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}

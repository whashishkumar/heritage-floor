'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

interface LocationContextType {
  location: string | null;
  setLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<string | null>(null);

  const setLocation = (newLocation: string) => {
    setLocationState(newLocation);
  };

  //  Memoized context value
  const value = useMemo(
    () => ({
      location,
      setLocation,
    }),
    [location]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useUserLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useUserLocation must be used within a LocationProvider');
  }
  return context;
}

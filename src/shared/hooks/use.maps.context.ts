import { createContext, useContext } from 'react';
import { MapsContextType } from '@shared/types';

export const MapsContext = createContext<MapsContextType>({
  mapsList: [],
  setMapsList: () => {},
  handleGetMaps: () => {},
  handleCreateMap: () => {},
});

export const useMapsContext = () => useContext(MapsContext);

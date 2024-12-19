import { createContext, useContext } from 'react';
import { MapContextType } from '@shared/types';

export const MapContext = createContext<MapContextType>({
  map: { id: '', title: 'NewMap*' },
  setMap: () => {},
  handleGetMapById: () => {},
  handleSaveMap: () => {},
  handleDeleteMapById: () => {},
});

export const useMapContext = () => useContext(MapContext);

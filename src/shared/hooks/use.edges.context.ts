import { createContext, useContext } from 'react';
import { EdgesContextType } from '@shared/types';

export const EdgesContext = createContext<EdgesContextType>({
  edgesList: [],
  setEdgesList: () => {},
  handleCreateEdge: () => {},
});

export const useEdgesContext = () => useContext(EdgesContext);

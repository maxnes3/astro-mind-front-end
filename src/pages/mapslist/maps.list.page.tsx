import { apiMaps } from '@/shared/api';
import { MapType } from '@/shared/types';
import { MapsContext } from '@shared/hooks';
import { MindMapsListLayout } from '@widgets/layouts/mindmapslist';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const __initialMapsState: MapType[] = [];

export const MindMapsListPage = () => {
  const navigation = useNavigate();
  const [mapsList, setMapsList] = useState<MapType[]>(__initialMapsState);

  const handleGetMaps = async () => {
    const response = await apiMaps.getMapsList();
    if (!response) {
      return;
    }
    setMapsList(mapsList);
  };

  const handleCreateMap = () => {
    console.log('тык');
    navigation('/mindmap');
  };

  return (
    <MapsContext.Provider
      value={{
        mapsList,
        setMapsList,
        handleGetMaps,
        handleCreateMap,
      }}
    >
      <MindMapsListLayout />
    </MapsContext.Provider>
  );
};

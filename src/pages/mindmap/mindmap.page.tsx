import { apiMaps } from '@/shared/api';
import { EdgesContext, MapContext, NodesContext } from '@shared/hooks';
import { EdgeType, MapRequest, MapType, NodeType } from '@shared/types';
import { MindMapLayout } from '@widgets/layouts/mindmap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const __initialMapState: MapType = { id: uuidv4(), title: 'NewMap*' };

const __initialNodesState: NodeType[] = [
  {
    nodeId: uuidv4(),
    title: 'Root Node',
    position: { x: 0, y: 0 },
  },
];

const __initialEdgesState: EdgeType[] = [];

export const MindMapPage = () => {
  const { mapId } = useParams();

  const [map, setMap] = useState<MapType>(__initialMapState);
  const [nodesList, setNodesList] = useState<NodeType[]>(__initialNodesState);
  const [edgesList, setEdgesList] = useState<EdgeType[]>(__initialEdgesState);

  const handleGetMapById = async (id: MapType['id']) => {
    const response = await apiMaps.getMapById(id);
    setMap({ id: response.id, title: response.title });
    setNodesList(response.nodes);
    setEdgesList(response.edges);
  };

  const handleSaveMap = async (mapData: MapType) => {
    const saveMapData: MapRequest = {
      ...mapData,
      nodes: nodesList,
      edges: edgesList,
    };
    const response = await apiMaps.saveMap(saveMapData);
    if (!response) {
      return;
    }
    setMap(saveMapData);
  };

  const handleDeleteMapById = () => {};

  const handleCreateNode = (newNodeData: NodeType) => {
    setNodesList((prevNodesList) => [...prevNodesList, { ...newNodeData }]);
  };

  const handleEditNode = (updatedData: NodeType) => {
    setNodesList((prevNodesList) =>
      prevNodesList.map((node) =>
        node.nodeId === updatedData.nodeId ? { ...node, ...updatedData } : node,
      ),
    );
  };

  const handleRemoveNode = (nodeId: NodeType['nodeId']) => {
    setNodesList((prevNodesList) =>
      prevNodesList.filter((node) => node.nodeId !== nodeId),
    );
  };

  const handleCreateEdge = (newEdgeData: EdgeType) => {
    setEdgesList((prevEdgesList) => [...prevEdgesList, newEdgeData]);
  };

  useEffect(() => {
    if (!mapId) {
      return;
    }
    handleGetMapById(mapId);
  }, [mapId]);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        handleGetMapById,
        handleSaveMap,
        handleDeleteMapById,
      }}
    >
      <NodesContext.Provider
        value={{
          nodesList,
          setNodesList,
          handleCreateNode,
          handleEditNode,
          handleRemoveNode,
        }}
      >
        <EdgesContext.Provider
          value={{ edgesList, setEdgesList, handleCreateEdge }}
        >
          <MindMapLayout />
        </EdgesContext.Provider>
      </NodesContext.Provider>
    </MapContext.Provider>
  );
};

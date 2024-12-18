import { EdgesContext, NodesContext } from '@shared/hooks';
import { EdgeType, NodeType } from '@shared/types';
import { MindMapLayout } from '@widgets/layouts/mindmap';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialNodesState: NodeType[] = [
  {
    nodeId: uuidv4(),
    title: 'Root Node',
    position: { x: 0, y: 0 },
  },
];

const initialEdgesState: EdgeType[] = [];

export const MindMapPage = () => {
  const [nodesList, setNodesList] = useState<NodeType[]>(initialNodesState);
  const [edgesList, setEdgesList] = useState<EdgeType[]>(initialEdgesState);

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

  return (
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
  );
};

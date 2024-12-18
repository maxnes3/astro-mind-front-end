import { NodesContext } from "@shared/hooks";
import { NodeType } from "@shared/types";
import { MindMapLayout } from "@widgets/layouts/mindmap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState: NodeType[] = [
  {
    nodeId: uuidv4(),
    title: "Root Node",
    position: { x: 0, y: 0 },
  },
];

export const MindMapPage = () => {
  const [nodesList, setNodesList] = useState<NodeType[]>(initialState);

  const handleCreateNode = (newNodeData: Omit<NodeType, "nodeId">) => {
    setNodesList((prevNodesList) => [
      ...prevNodesList,
      { ...newNodeData, nodeId: uuidv4() },
    ]);
  };

  const handleEditNode = (updatedData: NodeType) => {
    setNodesList((prevNodesList) =>
      prevNodesList.map((node) =>
        node.nodeId === updatedData.nodeId ? { ...node, ...updatedData } : node
      )
    );
  };

  const handleRemoveNode = (nodeId: NodeType["nodeId"]) => {
    setNodesList((prevNodesList) =>
      prevNodesList.filter((node) => node.nodeId !== nodeId)
    );
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
      <MindMapLayout />
    </NodesContext.Provider>
  );
};

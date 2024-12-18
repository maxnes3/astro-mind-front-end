import { NodeType } from "@shared/types";
import styles from "./styles.module.scss";
import { NodesContext } from "@shared/hooks";
import { useState } from "react";
import { Node } from "@shared/components/node";
import { v4 as uuidv4 } from 'uuid';

const initialState: NodeType[] = [
    {
        nodeId: uuidv4(),
        title: 'New Root Node',
        position: { x: 0, y: 0 }
    }
];

export const MindMapLayout = () => {
  const [nodesList, setNodesList] = useState<NodeType[]>(initialState);

  const handleCreateNode = (newNodeData: Omit<NodeType, 'nodeId'>) => {
    setNodesList(prevNodesList => [
        ...prevNodesList,
        { ...newNodeData, nodeId: uuidv4() }
    ]);
  };

  const handleEditNode = () => {};

  const handleRemoveNode = () => {};

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
      <div className={styles.canvas}>
        {nodesList.map((node) => (
          <Node key={node.nodeId} data={node} />
        ))}
      </div>
    </NodesContext.Provider>
  );
};

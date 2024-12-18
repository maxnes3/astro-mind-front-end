import { Dispatch, SetStateAction } from 'react';

export type NodeType = {
  nodeId: string;
  title: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
};

export type EdgeType = {
  leftNodeId: string;
  rightNodeId: string;
};

export interface NodesContextType {
  nodesList: NodeType[];
  setNodesList: Dispatch<SetStateAction<NodeType[]>>;
  handleCreateNode: (newNodeData: NodeType) => void;
  handleEditNode: (updateNodeData: NodeType) => void;
  handleRemoveNode: (nodeId: NodeType['nodeId']) => void;
}

export interface EdgesContextType {
  edgesList: EdgeType[];
  setEdgesList: Dispatch<SetStateAction<EdgeType[]>>;
  handleCreateEdge: (newEdgeData: EdgeType) => void;
}

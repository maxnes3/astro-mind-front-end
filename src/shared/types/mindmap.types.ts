import { Dispatch, SetStateAction } from "react";

export type NodeType = {
    nodeId: string;
    title: string;
    position: { x: number, y: number }
}

export interface NodesContextType {
    nodesList: NodeType[];
    setNodesList: Dispatch<SetStateAction<NodeType[]>>;
    handleCreateNode: (newNodeData: Omit<NodeType, 'nodeId'>) => void;
    handleEditNode: (updateNodeData: NodeType) => void;
    handleRemoveNode: (nodeId: Pick<NodeType, 'nodeId'>) => void;
};
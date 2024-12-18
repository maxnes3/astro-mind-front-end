import { createContext, useContext } from "react";
import { NodesContextType } from "@shared/types";

export const NodesContext = createContext<NodesContextType>({
    nodesList: [],
    setNodesList: () => {},
    handleCreateNode: () => {},
    handleEditNode: () => {},
    handleRemoveNode: () => {},
});

export const useNodesContext = () => useContext(NodesContext);
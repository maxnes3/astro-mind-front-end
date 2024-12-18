import { FC } from "react";
import styles from "./styles.module.scss";
import { NodeType } from "@shared/types";
import { useNodesContext } from "@/shared/hooks";

interface NodeProps {
  data: NodeType;
}

export const Node: FC<NodeProps> = ({ data }) => {
  const { handleEditNode } = useNodesContext();

  return (
    <div className={styles.node}>
      <h1 className={styles.title}>{data.title}</h1>
    </div>
  );
};

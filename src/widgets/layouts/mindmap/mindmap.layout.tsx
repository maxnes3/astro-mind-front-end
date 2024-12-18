import styles from "./styles.module.scss"
import { Node } from "@shared/components/node";
import { useNodesContext } from "@/shared/hooks";

export const MindMapLayout = () => {
  const { nodesList } = useNodesContext();

  return (
    <div className={styles.canvas}>
      {nodesList.map((node) => (
        <Node key={node.nodeId} data={node} />
      ))}
    </div>
  );
};

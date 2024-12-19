import styles from './styles.module.scss';
import { Node } from '@shared/components/node';
import { useEdgesContext, useNodesContext } from '@shared/hooks';
import { Edge } from '@shared/components/edge';
import { Header } from '@widgets/header';

export const MindMapLayout = () => {
  const { edgesList } = useEdgesContext();
  const { nodesList } = useNodesContext();

  return (
    <div className={styles.canvas}>
      <Header />
      {edgesList.map((edge) => (
        <Edge key={edge.leftNodeId + edge.rightNodeId} data={edge} />
      ))}
      {nodesList.map((node) => (
        <Node key={node.nodeId} data={node} />
      ))}
    </div>
  );
};

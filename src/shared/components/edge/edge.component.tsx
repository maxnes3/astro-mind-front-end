import { CSSProperties, FC } from 'react';
import { EdgeType, NodeType } from '@shared/types';
import { useNodesContext } from '@shared/hooks';
import styles from './styles.module.scss';

interface EdgeProps {
  data: EdgeType;
}

const LINE_SIZE = 2;

const getCenterX = (node: NodeType) =>
  node.size ? node.position.x + node.size.width / 2 : node.position.x;
const getCenterY = (node: NodeType) =>
  node.size ? node.position.y + node.size.height / 2 : node.position.y;

export const Edge: FC<EdgeProps> = ({ data }) => {
  const { nodesList } = useNodesContext();

  const leftNode = nodesList.find((node) => node.nodeId === data.leftNodeId);
  const rightNode = nodesList.find((node) => node.nodeId === data.rightNodeId);

  if (!leftNode || !rightNode) return null;

  const x1 = getCenterX(leftNode);
  const y1 = getCenterY(leftNode);
  const x2 = getCenterX(rightNode);
  const y2 = getCenterY(rightNode);

  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  const svgLeft = Math.min(x1, x2);
  const svgTop = Math.min(y1, y2);

  return (
    <svg
      className={styles.edge}
      style={
        {
          '--position-x': `${svgLeft}px`,
          '--position-y': `${svgTop}px`,
        } as CSSProperties
      }
      width={width ? width : LINE_SIZE}
      height={height ? height : LINE_SIZE}
    >
      <line
        x1={x1 - svgLeft}
        y1={y1 - svgTop}
        x2={x2 - svgLeft}
        y2={y2 - svgTop}
        stroke="white"
        strokeWidth={LINE_SIZE}
      />
    </svg>
  );
};

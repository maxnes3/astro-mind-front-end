import { FC, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { NodeType } from '@shared/types';
import { useEdgesContext, useNodesContext } from '@shared/hooks';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { CreateNodeButton } from './helpers';
import { v4 as uuidv4 } from 'uuid';

interface NodeProps {
  data: NodeType;
}

export const Node: FC<NodeProps> = ({ data }) => {
  const { title: initialTitle, position } = data;
  const { handleEditNode, handleCreateNode } = useNodesContext();
  const { handleCreateEdge } = useEdgesContext();

  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: position.x,
    y: position.y,
  });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEditNode({ ...data, title });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDragStop = (
    draggableEvent: DraggableEvent,
    draggableData: DraggableData,
  ) => {
    draggableEvent.preventDefault();
    const newPosition = { x: draggableData.x, y: draggableData.y };
    setCurrentPosition(newPosition);
    handleEditNode({ ...data, position: newPosition });
  };

  const handleAddNodeLeft = () => {
    const newNodeId = uuidv4();
    handleCreateNode({
      nodeId: newNodeId,
      title: 'New Node',
      position: { x: currentPosition.x - 125, y: currentPosition.y },
    });
    handleCreateEdge({
      leftNodeId: data.nodeId,
      rightNodeId: newNodeId,
    });
  };

  const handleAddNodeRight = () => {
    const newNodeId = uuidv4();
    handleCreateNode({
      nodeId: newNodeId,
      title: 'New Node',
      position: { x: currentPosition.x + 125, y: currentPosition.y },
    });
    handleCreateEdge({
      leftNodeId: data.nodeId,
      rightNodeId: newNodeId,
    });
  };

  useEffect(() => {
    if (!nodeRef.current) {
      return;
    }
    const { offsetWidth, offsetHeight } = nodeRef.current;
    handleEditNode({
      ...data,
      size: { width: offsetWidth, height: offsetHeight },
    });
  }, [data, handleEditNode]);

  return (
    <Draggable
      bounds="parent"
      position={currentPosition}
      onStop={handleDragStop}
    >
      <div ref={nodeRef} className={styles.node}>
        {isEditing ? (
          <input
            className={styles.inputTitle}
            type="text"
            value={title}
            onBlur={handleBlur}
            onChange={handleChange}
            maxLength={50}
            autoFocus
          />
        ) : (
          <p
            className={styles.paragraphTitle}
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </p>
        )}
        <CreateNodeButton
          positionCls={styles.plusButtonLeft}
          onClick={handleAddNodeLeft}
        />
        <CreateNodeButton
          positionCls={styles.plusButtonRight}
          onClick={handleAddNodeRight}
        />
      </div>
    </Draggable>
  );
};

import { CSSProperties, FC, useState } from "react";
import styles from "./styles.module.scss";
import { NodeType } from "@shared/types";
import { useNodesContext } from "@/shared/hooks";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface NodeProps {
  data: NodeType;
}

export const Node: FC<NodeProps> = ({ data }) => {
  const { title: initialTitle, position } = data;
  const { handleEditNode } = useNodesContext();

  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
    draggableData: DraggableData
  ) => {
    draggableEvent.preventDefault();
    const newPosition = { x: draggableData.x, y: draggableData.y };
    setCurrentPosition(newPosition);
    handleEditNode({ ...data, position: newPosition });
  };

  return (
    <Draggable
      position={currentPosition}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div
        className={styles.node}
        style={
          {
            "--position-x": `${position.x}px`,
            "--position-y": `${position.y}px`,
          } as CSSProperties
        }
      >
        {isEditing ? (
          <input
            className={styles.inputTitle}
            type="text"
            value={title}
            onBlur={handleBlur}
            onChange={handleChange}
            autoFocus
          />
        ) : (
          <p
            className={styles.paragraphTitle}
            onDoubleClick={handleDoubleClick}
          >
            {title} {position.x} {position.y}
          </p>
        )}
      </div>
    </Draggable>
  );
};

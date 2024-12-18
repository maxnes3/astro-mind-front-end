import { FC } from 'react';
import styles from '../styles.module.scss';

interface CreateNodeButtonProps {
  onClick: VoidFunction;
  positionCls: string;
}

export const CreateNodeButton: FC<CreateNodeButtonProps> = ({
  onClick,
  positionCls,
}) => {
  return (
    <div className={`${styles.plusButton} ${positionCls}`} onClick={onClick}>
      +
    </div>
  );
};

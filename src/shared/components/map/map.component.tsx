import { FC } from 'react';
import styles from './styles.module.scss';
import { MapType } from '@shared/types';
import { useNavigate } from 'react-router-dom';

type MapProps = {
  index: number;
  data: MapType;
};

export const Map: FC<MapProps> = ({ index, data }) => {
  const navigation = useNavigate();

  const handleOpenMindMap = () => {
    navigation(`/mindmap/${data.id}`);
  };

  return (
    <li className={styles.map} onClick={handleOpenMindMap}>
      <div className={styles.index}>{index}</div>
      <span className={styles.title}>{data.title}</span>
    </li>
  );
};

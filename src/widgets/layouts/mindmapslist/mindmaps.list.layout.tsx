import { useMapsContext } from '@shared/hooks';
import styles from './styles.module.scss';
import { Map } from '@shared/components/map/map.component';
import { MapType } from '@/shared/types';

const mockupList: MapType[] = [
  {
    id: 'asdsadsa',
    title: 'First Mind Map',
  },
  {
    id: 'adsd2w',
    title: 'Sec Mind Map',
  },
  {
    id: '1242141',
    title: 'New Mind Map',
  },
];

export const MindMapsListLayout = () => {
  const { handleCreateMap } = useMapsContext();

  return (
    <div className={styles.canvas}>
      <div className={styles.list}>
        {mockupList.map((map, index) => (
          <Map key={map.id} index={index} data={map} />
        ))}
        <button
          type={'button'}
          className={styles.button}
          onClick={() => handleCreateMap}
        >
          + Create new map
        </button>
      </div>
    </div>
  );
};

import { useMapContext } from '@shared/hooks';
import styles from './styles.module.scss';
import MAP_IMG from '@shared/assets/images/map.png?src';
import { useState } from 'react';

export const Header = () => {
  const { map, setMap, handleSaveMap } = useMapContext();

  const [title, setTitle] = useState<string>(map.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (!title.length) {
      setTitle(map.title);
      return;
    }
    setMap({ ...map, title });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.header}>
      <img src={MAP_IMG} alt="map" />
      {isEditing ? (
        <input
          className={styles.inputTitle}
          type="text"
          value={title}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={25}
          autoFocus
        />
      ) : (
        <p className={styles.paragraphTitle} onDoubleClick={handleDoubleClick}>
          {title}
        </p>
      )}
      <button
        type={'button'}
        className={styles.button}
        onClick={() => handleSaveMap}
      >
        Сохранить
      </button>
    </div>
  );
};

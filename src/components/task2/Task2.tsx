import React, { useContext } from 'react';
import { SelectionContext } from '../app/hooks/useSelection';
import { useQuery } from '@tanstack/react-query';
import styles from './Task2.module.css';
import SearchIcon from '../../assets/icons/search.svg?react';

const Task2: React.FC = () => {
  const { selection } = useContext(SelectionContext);

  const params = new URLSearchParams({ tag: selection, limit: '9' }).toString();

  const { data } = useQuery<{ cars: { url: string; id: string }[] }>({
    queryKey: ['cars', selection],
    queryFn: () => fetch(`http://localhost:8000/api/cars?${params}`).then((res) => res.json()),
    enabled: !!selection,
  });

  if (!selection) {
    return (
      <div className={styles.title}>
        <SearchIcon />
        <h1>Use the search to find vehicles</h1>
      </div>
    );
  }

  return (
    <>
      {selection && (
        <div className={styles.label}>
          <h2>
            Search results for : <strong>{selection}</strong>
          </h2>
        </div>
      )}
      <div className={styles.grid}>
        {data?.cars.map((car) => {
          return (
            <div key={car.id} className={styles.imgContainer}>
              <picture>
                <source srcSet={`${car.url}.webp`} />
                <img src={`${car.url}.jpg`} className={styles.img} loading="lazy" />
              </picture>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Task2;

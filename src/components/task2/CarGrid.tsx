import React, { useContext } from 'react';
import { SelectionContext } from '../app/hooks/useSelection';
import { useQuery } from '@tanstack/react-query';
import styles from './CarGrid.module.css';
import SearchIcon from '../../assets/icons/search.svg?react';

type CarsResponse = {
  cars: {
    id: string;
    url: string;
    alt_description: string;
  }[];
};

const CarGrid: React.FC = () => {
  const { selection } = useContext(SelectionContext);

  const params = new URLSearchParams({ tag: selection, limit: '9' }).toString();

  const { data, isLoading } = useQuery({
    queryKey: ['cars', selection],
    queryFn: async (): Promise<CarsResponse> => {
      const response = await fetch(`http://localhost:8000/api/cars?${params}`);
      return response.json();
    },
    enabled: !!selection,
  });

  if (isLoading) {
    return <div>Loading cars...</div>;
  }

  if (!selection) {
    return (
      <div className={styles.title}>
        <SearchIcon />
        <h1>Use the search to find vehicles</h1>
      </div>
    );
  }

  if (!data?.cars?.length) {
    return <h2>No cars to display</h2>;
  }

  return (
    <>
      <div className={styles.label}>
        <h2>Search results for : {selection}</h2>
      </div>
      <div className={styles.grid}>
        {data.cars.map((car) => {
          return (
            <div key={car.id} className={styles.imgContainer}>
              <picture>
                <source srcSet={`${car.url}.webp`} />
                <img src={`${car.url}.jpg`} className={styles.img} loading="lazy" alt={car.alt_description} />
              </picture>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CarGrid;

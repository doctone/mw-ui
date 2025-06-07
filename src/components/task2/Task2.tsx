import React, { useContext } from 'react';
import { SelectionContext } from '../app/hooks/useSelection';
import { useQuery } from '@tanstack/react-query';
import styles from './Task2.module.css';

// Please refer to task 2. Realtime search results of readme.md
const Task2: React.FC = () => {
  const { selection } = useContext(SelectionContext);

  const params = new URLSearchParams({ tag: selection, limit: '9' }).toString();
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data } = useQuery<{ url: string; id: string }[]>({
    queryKey: ['cars', selection],
    queryFn: () => fetch(`http://localhost:8000/api/cars?${params}`).then((res) => res.json()),
  });
  console.log(data);
  return (
    <div className={styles.grid}>
      {data?.map((car) => {
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
  );
};

export default Task2;

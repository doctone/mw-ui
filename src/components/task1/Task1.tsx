import React, { ChangeEvent, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import styles from './Task1.module.scss';

// Please refer to task 1. Realtime search of readme.md
const Task1: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: () => fetch('http://localhost:8000/api/tags').then((res) => res.json()),
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const fuse = new Fuse<string>(data);
    const result = fuse.search(searchTerm);
    setTags(result.map(({ item }) => item));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search tags..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />

        {isFocused && (
          <div className={styles.dropdown}>
            {tags.map((tag) => (
              <div
                key={tag}
                className={styles.suggestion}
                onClick={() => {
                  setSearchTerm(tag);
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task1;

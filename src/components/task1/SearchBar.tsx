import React, { ChangeEvent, useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import styles from './SearchBar.module.scss';
import { SelectionContext } from '../app/hooks/useSelection';
import { useQuery } from '@tanstack/react-query';

// Please refer to task 1. Realtime search of readme.md
const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelection } = useContext(SelectionContext);
  const [isFocused, setIsFocused] = useState(false);

  const { refetch: getTags, data: tags } = useQuery({
    queryKey: ['tags', searchTerm],
    queryFn: (data) =>
      fetch(`http://localhost:8000/api/tags?tag=${encodeURIComponent(data.queryKey[1])}`).then((res) => res.json()),
    enabled: searchTerm?.length >= 2,
  });

  const debouncedSearch = useDebouncedCallback((term) => {
    if (term?.length >= 2) {
      getTags();
    }
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
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
            {tags?.map((tag) => (
              <option
                key={tag}
                className={styles.suggestion}
                onClick={() => {
                  setSearchTerm(tag);
                  setSelection(tag);
                }}
              >
                {tag}
              </option>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

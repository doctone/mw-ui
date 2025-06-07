import React, { ChangeEvent, useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import styles from './SearchBar.module.scss';
import { SelectionContext } from '../app/hooks/useSelection';

// Please refer to task 1. Realtime search of readme.md
const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelection } = useContext(SelectionContext);
  const [tags, setTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useDebouncedCallback((term) => {
    if (term.length >= 2) {
      fetch(`http://localhost:8000/api/tags?tag=${encodeURIComponent(term)}`)
        .then((res) => res.json())
        .then((results) => setTags(results));
    } else {
      setTags([]);
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
            {tags.map((tag) => (
              <div
                key={tag}
                className={styles.suggestion}
                onClick={() => {
                  setSearchTerm(tag);
                  setSelection(tag);
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

export default SearchBar;

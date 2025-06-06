import React, { ChangeEvent, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';

// Please refer to task 1. Realtime search of readme.md
const Task1: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);

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
    <div className="Task1">
      {' '}
      <input type="text" placeholder="Search tags..." value={searchTerm} onChange={handleSearch} />
      {JSON.stringify(tags)}
    </div>
  );
};

export default Task1;

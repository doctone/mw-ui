import React, { useContext } from 'react';
import { SelectionContext } from '../app/hooks/useSelection';

// Please refer to task 2. Realtime search results of readme.md
const Task2: React.FC = () => {
  const { selection } = useContext(SelectionContext);

  return <div className="Task2">{JSON.stringify(selection)}</div>;
};

export default Task2;

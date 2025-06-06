import { createContext, Dispatch, SetStateAction } from 'react';

export const SelectionContext = createContext<{ selection: string; setSelection: Dispatch<SetStateAction<string>> }>(
  null
);

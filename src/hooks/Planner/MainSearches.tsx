import { useEffect, useState } from "react";
import { GenFilter, removedFromBDSP, removedFromSwSh } from "../App/GenFilter";


export function useGenConnectedSearchVars<SearchVars>(defaultSearchVars: SearchVars, genFilter: GenFilter): [
  SearchVars,
  React.Dispatch<React.SetStateAction<SearchVars>>,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  'STARTS' | 'CONTAINS',
  (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
] {
  const [queryVars, setQueryVars] = useState<SearchVars>(defaultSearchVars);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<'STARTS' | 'CONTAINS'>('STARTS');

  // Update search term
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    // Current search mode, new search term
    setQueryVars(searchMode === 'STARTS'
      ? {
          ...queryVars,
          startsWith: e.target.value,
          contains: '',
        }
      : {
          ...queryVars,
          startsWith: '',
          contains: e.target.value,
        }
    );
  }

  // Update search mode
  const handleSearchModeChange = (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => {
    e.preventDefault();

    setSearchMode(mode);
    // New search mode, current search term
    setQueryVars(mode === 'STARTS'
      ? {
          ...queryVars,
          startsWith: searchTerm,
          contains: '',
        }
      : {
          ...queryVars,
          startsWith: '',
          contains: searchTerm,
        }
    );
  }

  // Update gen
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
    });
  }, [genFilter]);

  return [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange];
}

export function useRemovalConnectedSearchVars<SearchVars>(defaultSearchVars: SearchVars, genFilter: GenFilter): [
  SearchVars,
  React.Dispatch<React.SetStateAction<SearchVars>>,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  'STARTS' | 'CONTAINS',
  (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
] {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<SearchVars>(defaultSearchVars, genFilter);
  
  // Update removal flags; gen already handled
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    })
  }, [genFilter]);

  return [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange];
}

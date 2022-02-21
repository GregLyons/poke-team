import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";
import { Dispatches, Filters } from "../../components/App";
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

// List filters
// #region

export type ListFilterArgs<SearchVars> = {
  queryVars: SearchVars
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>
  
  searchTerm: string
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchMode: 'STARTS' | 'CONTAINS'
  handleSearchModeChange: (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
}

export function useListFilter<SearchVars>(
  defaultSearchVars: SearchVars,
  genFilter: GenFilter,
  listFilter: ({
    queryVars,
    setQueryVars,
    searchTerm,
    handleSearchTermChange,
    searchMode,
    handleSearchModeChange,
  }: ListFilterArgs<SearchVars>) => JSX.Element
): [SearchVars, JSX.Element] {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars(defaultSearchVars, genFilter);

  return [
    queryVars,
    listFilter({
      queryVars,
      setQueryVars,
      searchTerm,
      handleSearchTermChange,
      searchMode,
      handleSearchModeChange,
    }),
  ];
}

export function useListFilter_removal<SearchVars>(
  defaultSearchVars: SearchVars,
  genFilter: GenFilter,
  listFilter: ({
    queryVars,
    setQueryVars,
    searchTerm,
    handleSearchTermChange,
    searchMode,
    handleSearchModeChange,
  }: ListFilterArgs<SearchVars>) => JSX.Element
): [SearchVars, JSX.Element] {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useRemovalConnectedSearchVars(defaultSearchVars, genFilter);

  return [
    queryVars,
    listFilter({
      queryVars,
      setQueryVars,
      searchTerm,
      handleSearchTermChange,
      searchMode,
      handleSearchModeChange,
    }),
  ];
}

// #endregion

// List rendering
// #region

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
}

export type ListRenderArgsIcons<SearchQuery> = {
  data: SearchQuery
  dispatches: Dispatches
  filters: Filters
}

export function useListRender<SearchQuery, SearchVars>(
  query: DocumentNode,
  queryVars: SearchVars,
  listRender: ({ data, }: ListRenderArgs<SearchQuery>) => JSX.Element
): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchVars>(query, {
    variables: queryVars,
  });

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      {loading 
        ? <div>Loading...</div>
        : data && listRender({ data, })
      }
    </>
  )
}

export function useListRender_removal_icons<SearchQuery, SearchVars>(
  dispatches: Dispatches,
  filters: Filters,
  query: DocumentNode,
  queryVars: SearchVars,
  listRender: ({ data, dispatches, filters, }: ListRenderArgsIcons<SearchQuery>) => JSX.Element
): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchVars>(query, {
    variables: queryVars,
  });

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      {loading 
        ? <div>Loading...</div>
        : data && listRender({ data, dispatches, filters, })
      }
    </>
  )
}

// #endregion
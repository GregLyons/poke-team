import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useRef, useState } from "react";
import { Dispatches, Filters } from "../components/App";
import SearchBar from "../components/Reusables/SearchBar/SearchBar";
import { NameSearchVars } from "../types-queries/helpers";
import { GenFilter, removedFromBDSP, removedFromSwSh } from "./App/GenFilter";

export type SearchBarProps = {
  title: string
  placeholder?: string
  backgroundLight: 'red' | 'green' | 'blue'
}

export function useGenConnectedSearchVars<SearchVars>({
  defaultSearchVars,
  genFilter,

}: {
  defaultSearchVars: SearchVars
  genFilter: GenFilter
}): {
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
} {
  const [queryVars, setQueryVars] = useState<SearchVars>(defaultSearchVars);

  // Update gen when genFilter changes
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
    });
  }, [genFilter, queryVars, setQueryVars, ]);

  return { queryVars, setQueryVars, };
}

/*
  Given default search variables, genFilter, and some parameters to make a search bar:
    Set queryVars to update when genFilter.gen changes
    Set queryVars to update when the search term changes
    Set queryVars to update when the search mode changes ('startsWith' vs. 'contains')
    Keep track of whether the user is focused on the input field in the search bar
*/
export function useGenConnectedSearchBar<SearchVars extends NameSearchVars>({
  defaultSearchVars,
  genFilter,
  searchBarProps,
}: {
  defaultSearchVars: SearchVars
  genFilter: GenFilter
  searchBarProps?: SearchBarProps
}): {
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  searchBar: JSX.Element
  focusedOnInput: boolean
} {
  const { queryVars, setQueryVars } = useGenConnectedSearchVars<SearchVars>({ defaultSearchVars, genFilter, });
  const [searchMode, setSearchMode] = useState<'STARTS' | 'CONTAINS'>('STARTS');
  const [focusedOnInput, setFocusedOnInput] = useState<boolean>(false);

  // Update search term
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

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
  };

  // Update search mode
  const handleSearchModeChange = (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => {
    e.preventDefault();

    setSearchMode(mode);
    // New search mode, current search term
    setQueryVars(mode === 'STARTS'
      ? {
          ...queryVars,
          startsWith: queryVars.contains,
          contains: '',
        }
      : {
          ...queryVars,
          startsWith: '',
          contains: queryVars.startsWith,
        }
    );
  };

  // Update gen
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
    });
  }, [genFilter, queryVars, setQueryVars, ]);

  return {
    queryVars,
    setQueryVars, 
    searchBar: <>
      {searchBarProps !== undefined
        ? <SearchBar 
            title={searchBarProps.title}
            placeholder={searchBarProps.placeholder || 'ENTER to select first row'}
            backgroundLight={searchBarProps.backgroundLight}

            searchTerm={searchMode === 'STARTS' ? queryVars.startsWith : queryVars.contains}
            handleSearchTermChange={handleSearchTermChange}
            searchMode={searchMode}
            handleSearchModeChange={handleSearchModeChange}
            setFocusedOnInput={setFocusedOnInput}
          />
        : <div></div>
      }
    </>,
    focusedOnInput,
  };
}

export function useRemovalConnectedSearchVars<SearchVars>({
  defaultSearchVars,
  genFilter,
}: {
  defaultSearchVars: SearchVars
  genFilter: GenFilter
}): {
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
} {
  const { queryVars, setQueryVars } = useGenConnectedSearchVars<SearchVars>({defaultSearchVars, genFilter,});
  
  // Update removal flags; gen already handled
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    })
  }, [genFilter, queryVars, setQueryVars, ]);

  return {
    queryVars, setQueryVars,
  };
}

/*
  Do what useGenConnectedSearchVars does, but also:
    Set queryVars to update when the Sw/Sh and BDSP flags change
*/
export function useRemovalConnectedSearchBar<SearchVars extends NameSearchVars>({
  defaultSearchVars,
  genFilter,
  searchBarProps,
}: {
  defaultSearchVars: SearchVars
  genFilter: GenFilter
  searchBarProps?: SearchBarProps
}): {
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  searchBar: JSX.Element
  focusedOnInput: boolean
} {
  const { queryVars, setQueryVars, searchBar, focusedOnInput } = useGenConnectedSearchBar<SearchVars>({defaultSearchVars, genFilter, searchBarProps, });
  
  // Update removal flags; gen already handled
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    })
  }, [genFilter, queryVars, setQueryVars, ]);

  return {
    queryVars,
    setQueryVars, 
    searchBar,
    focusedOnInput,
  };
}

// List filters
/* 
  Types and hooks for filtering searches.
*/
// #region

export type ListFilterArgs<SearchVars> = {
  queryVars: SearchVars
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>
  searchBar: JSX.Element
}

/*
  Do what useGenConnectedSearchVars in terms of setting up the quey variables, but also:
    Connect the search variables to other parameters, as specified by the listFilter function
    In addition to the search variables, return a JSX Element which serves as the filter form for the user
*/
export function useListFilter<SearchVars extends NameSearchVars>({
  defaultSearchVars,
  genFilter,
  searchBarProps,
  listFilter,
}: {
  defaultSearchVars: SearchVars,
  genFilter: GenFilter,
  searchBarProps: SearchBarProps,
  listFilter: ({
    queryVars,
    setQueryVars,
    searchBar,
  }: ListFilterArgs<SearchVars>) => JSX.Element
}): {
  queryVars: SearchVars
  filterForm: JSX.Element
  focusedOnInput: boolean
} {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, }= useGenConnectedSearchBar({defaultSearchVars, genFilter, searchBarProps, });

  return {
    queryVars,
    filterForm: listFilter({
      queryVars,
      setQueryVars,
      searchBar
    }),
    focusedOnInput,
  };
}

/*
  Do what useListFilter does, but with useRemovalConnectedSearchVars instead of useGenConnectedSearchVars
*/
export function useListFilter_removal<SearchVars extends NameSearchVars>({
  defaultSearchVars,
  genFilter,
  searchBarProps,
  listFilter,
}: {
  defaultSearchVars: SearchVars,
  genFilter: GenFilter,
  searchBarProps: SearchBarProps,
  listFilter: ({
    queryVars,
    setQueryVars,
    searchBar,
  }: ListFilterArgs<SearchVars>) => JSX.Element
}): {
  queryVars: SearchVars
  filterForm: JSX.Element
  focusedOnInput: boolean
} {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, }= useRemovalConnectedSearchBar({defaultSearchVars, genFilter, searchBarProps, });

  return {
    queryVars,
    filterForm: listFilter({
      queryVars,
      setQueryVars,
      searchBar
    }),
    focusedOnInput,
  };
}

// #endregion

// List rendering
/*
  Types and hooks for rendering search results
*/
// #region

// If there are no Pokemon icons to render, only the data is needed
export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
}

// If there are Pokemon icons to render, dispatches and filters are needed for interactivity
export type ListRenderArgsIcons<SearchQuery> = {
  data: SearchQuery
  dispatches: Dispatches
  filters: Filters
}

/*
  Whenever queryVars updates, execute query after 'delay' ms have passed. Updating queryVars within this time resets the timer.
*/
export function useDelayedQuery<SearchQuery, SearchVars>({
  query,
  queryVars,
  delay = 300,
}: {
  query: DocumentNode,
  queryVars: SearchVars
  delay?: number
}) {
  const [delayedQueryVars, setDelayedQueryVars] = useState<SearchVars>(queryVars)
  const queryTimer = useRef<NodeJS.Timeout>();

  const { data, loading, error } = useQuery<SearchQuery, SearchVars>(query, {
    variables: delayedQueryVars,
  });

  // // Execute query on initial render
  // useEffect(() => {
  //   executeQuery();
  // }, [execute]);

  // Whenever queryVars updates, set search to execute 'delay' ms later
  // Average keys per minute is 190-220 according to Google, so roughly 3 keys a second. Thus, 300ms is around the average time between key strokes, which is why we set default to be 300ms
  useEffect(() => {
    if (queryTimer.current) {
      clearTimeout(queryTimer.current);
    }
    queryTimer.current = setTimeout(() => { setDelayedQueryVars(queryVars) }, delay);
  }, [queryVars, delayedQueryVars, setDelayedQueryVars, queryTimer]);

  return { data, loading, error };
}

/*
  Given search variables and a search query, render search results according to 'listRender'.
*/
export function useListRender<SearchQuery, SearchVars>(
  query: DocumentNode,
  queryVars: SearchVars,
  listRender: ({ data, }: ListRenderArgs<SearchQuery>) => JSX.Element
): JSX.Element {
  const { data, loading, error } = useDelayedQuery<SearchQuery, SearchVars>({ query, queryVars, });

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

/* 
  Same as useListRender, but for when Pokemon icons need to be rendered
*/
export function useListRender_icons<SearchQuery, SearchVars>(
  dispatches: Dispatches,
  filters: Filters,
  query: DocumentNode,
  queryVars: SearchVars,
  listRender: ({ data, dispatches, filters, }: ListRenderArgsIcons<SearchQuery>) => JSX.Element
): JSX.Element {
  const { data, loading, error } = useDelayedQuery<SearchQuery, SearchVars>({ query, queryVars, });
  
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
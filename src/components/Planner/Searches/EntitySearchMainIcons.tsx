import {
  useState,
} from 'react';
import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from '@apollo/client';

import {
  ListRenderArgsIcons,
} from './../helpers';

import { Dispatches, Filters } from '../../App';
import SearchBar from '../../Reusables/SearchBar/SearchBar';

interface EntitySearchMainIconsProps<SearchQuery, SearchQueryVars> {
  entityPluralString: string

  dispatches: Dispatches
  filters: Filters
  searchTerm: string
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchMode: 'STARTS' | 'CONTAINS'
  handleSearchModeChange: (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
  query: DocumentNode
  queryVars: SearchQueryVars
  listRender: ({ data, dispatches, filters, }: ListRenderArgsIcons<SearchQuery>) => JSX.Element
}

function EntitySearchMainIcons<SearchQuery, SearchQueryVars>({
  entityPluralString,
  dispatches,
  filters,
  searchTerm,
  handleSearchTermChange,
  searchMode,
  handleSearchModeChange,
  listRender,
  query,
  queryVars,
}: EntitySearchMainIconsProps<SearchQuery, SearchQueryVars>): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchQueryVars>(query, {
    variables: queryVars,
  });
  
  if (error) { return (<div>{error.message}</div>); }

  return (
    <div
      className="planner-search__wrapper"
    >
      <form>
        <SearchBar
          title={`Search ${entityPluralString} by name`}
          placeholder={`Search ${entityPluralString}`}
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          searchMode={searchMode}
          handleSearchModeChange={handleSearchModeChange}
        />
      </form>
      <div className="planner-search__results">
        {loading 
          ? <div>Loading...</div>
          : data && listRender({ data, dispatches, filters, })
        }
      </div>
    </div>
  );
};


export default EntitySearchMainIcons;
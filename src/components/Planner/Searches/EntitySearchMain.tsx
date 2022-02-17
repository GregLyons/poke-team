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
  ListRenderArgs,
} from './../helpers';

import { GenFilter } from "../../../hooks/App/GenFilter";
import './Searches.css';
import SearchBar from '../../Reusables/SearchBar/SearchBar';

interface EntitySearchMainProps<SearchQuery, SearchQueryVars> {
  genFilter: GenFilter
  searchTerm: string
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchMode: 'STARTS' | 'CONTAINS'
  handleSearchModeChange: (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
  query: DocumentNode
  queryVars: SearchQueryVars
  listRender: ({ data, genFilter, }: ListRenderArgs<SearchQuery>) => JSX.Element
}

function EntitySearchMain<SearchQuery, SearchQueryVars>({
  genFilter,
  searchTerm,
  handleSearchTermChange,
  searchMode,
  handleSearchModeChange,
  listRender,
  query,
  queryVars,
}: EntitySearchMainProps<SearchQuery, SearchQueryVars>): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchQueryVars>(query, {
    variables: queryVars,
  });
  
  const [searchBox, setSearchBox] = useState('');

  if (error) { return (<div>{error.message}</div>)}

  return (
    <div
      className="planner-search__wrapper"
    >
      <div className="planner-search__padder">
        <form>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
            searchMode={searchMode}
            handleSearchModeChange={handleSearchModeChange}
          />
        </form>
        <div className="planner-search__results">
          {loading 
            ? <div>Loading...</div>
            : data && listRender({ data, genFilter, })
          }
        </div>
      </div>
    </div>
  );
};


export default EntitySearchMain;
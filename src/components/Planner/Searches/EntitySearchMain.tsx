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

interface EntitySearchMainProps<SearchQuery, SearchQueryVars> {
  genFilter: GenFilter
  handleSearchBoxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  query: DocumentNode
  queryVars: SearchQueryVars
  listRender: ({ data, genFilter, }: ListRenderArgs<SearchQuery>) => JSX.Element
}

function EntitySearchMain<SearchQuery, SearchQueryVars>({
  genFilter,
  handleSearchBoxChange,
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
          Search
          <input
            type="text"
            value={searchBox}
            onChange={(e) => {
              setSearchBox(e.target.value);
              handleSearchBoxChange?.(e);
            }}
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
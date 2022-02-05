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

import { PokemonIconDispatches, PokemonIconFilters } from '../../App';

interface EntitySearchMainIconsProps<SearchQuery, SearchQueryVars> {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  handleSearchBoxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  query: DocumentNode
  queryVars: SearchQueryVars
  listRender: ({ data, dispatches, filters, }: ListRenderArgsIcons<SearchQuery>) => JSX.Element
}

function EntitySearchMainIcons<SearchQuery, SearchQueryVars>({
  dispatches,
  filters,
  handleSearchBoxChange,
  listRender,
  query,
  queryVars,
}: EntitySearchMainIconsProps<SearchQuery, SearchQueryVars>): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchQueryVars>(query, {
    variables: queryVars,
  });
  
  const [searchBox, setSearchBox] = useState('');

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
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
      {loading 
        ? <div>Loading...</div>
        : data && listRender({ data, dispatches, filters, })
      }
    </>
  );
};


export default EntitySearchMainIcons;
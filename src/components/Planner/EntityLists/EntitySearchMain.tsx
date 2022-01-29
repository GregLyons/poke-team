import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useSearchParams,
} from 'react-router-dom';
import {
  DocumentNode,
} from 'graphql';
import {
  useLazyQuery, useQuery,
} from '@apollo/client';

import {
  GenerationNum,
} from '../../../types-queries/helpers';
import {
  ListRenderArgs,
} from './helpers';

import {
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from '../../../hooks/app-hooks';
import { TierFilter } from '../../../utils/smogonLogic';

interface EntitySearchMainProps<SearchQuery, SearchQueryVars> {
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter?: TierFilter
  pokemonFilter?: PokemonFilter
  handleSearchBoxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  query: DocumentNode
  queryVars: SearchQueryVars
  listRender: ({ data, dispatchCart, dispatchTeam }: ListRenderArgs<SearchQuery>) => JSX.Element
}

function EntitySearchMain<SearchQuery, SearchQueryVars>({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
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
        : data && listRender({ data, dispatchCart, dispatchTeam, tierFilter, genFilter, pokemonFilter, })
      }
    </>
  );
};


export default EntitySearchMain;
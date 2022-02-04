import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from "@apollo/client";


import { TierFilter } from '../../../hooks/App/TierFilter';
import { CartAction } from "../../../hooks/App/Cart";
import { TeamAction } from "../../../hooks/App/Team";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { ListRenderArgs } from '../helpers';

import './Pages.css';


interface EntityConnectionSearchProps<SearchQuery, SearchQueryVars> {
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter?: TierFilter
  pokemonFilter?: PokemonFilter
  listRender: ({ data, dispatchCart, dispatchTeam }: ListRenderArgs<SearchQuery>) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearch<SearchQuery, SearchQueryVars>({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
  listRender,
  query,
  queryVars,
}: EntityConnectionSearchProps<SearchQuery, SearchQueryVars>): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchQueryVars>(
    query,
    {
      variables: {
        ...queryVars,
      }
    }
  );

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      {loading 
        ? <div>Loading...</div>
        : data && listRender({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, })
      }
    </>
  );
};

export default EntityConnectionSearch;
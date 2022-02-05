import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from "@apollo/client";

import { ListRenderArgsIcons } from '../helpers';

import './Pages.css';
import { PokemonIconDispatches, PokemonIconFilters } from '../../App';


interface EntityConnectionSearchIconsProps<SearchQuery, SearchQueryVars> {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  listRender: ({data, dispatches, filters, }: ListRenderArgsIcons<SearchQuery>) => JSX.Element
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearchIcons<SearchQuery, SearchQueryVars>({
  dispatches,
  filters,
  listRender,
  query,
  queryVars,
}: EntityConnectionSearchIconsProps<SearchQuery, SearchQueryVars>): JSX.Element {
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
        : data && listRender({ data, dispatches, filters, })
      }
    </>
  );
};

export default EntityConnectionSearchIcons;
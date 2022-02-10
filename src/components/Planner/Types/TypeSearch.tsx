import {
  Outlet,
} from 'react-router-dom';

import {
  TypeSearchQuery,
  TypeSearchResult,
  TypeSearchVars,
  TypeInSearch,

  TYPE_SEARCH_QUERY,
} from '../../../types-queries/Planner/Type';

import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { ListRenderArgsIcons } from '../helpers';
import { PokemonIconDispatches, PokemonIconFilters } from '../../App';
import EntitySearchMainIcons from '../Searches/EntitySearchMainIcons';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<TypeSearchQuery>) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);
  
  return (
    <>
      {data.types.map((typeSearchResult: TypeSearchResult) => {
        const type = new TypeInSearch(typeSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Type"
              key={'typeEntry_' + type.id}
              name={type.formattedName}
              linkName={type.name}
              description={type.description}
              icons={{
                pokemonIconData: type.pokemonIconData,
                linkIconDatum: {
                  iconClass: 'type',
                  iconDatum: type.typeIconDatum,
                },
                dispatches,
                filters,
                cartNote: `Pokemon with the Type '${type.formattedName}'.`
              }}
            />
          </>
        );
      })}
    </>
  );
}

type TypeSearchMainProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const TypeSearch = ({
  dispatches,
  filters,
}: TypeSearchMainProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<TypeSearchVars>(
    {
      gen: filters.genFilter.gen,
      startsWith: '',
      limit: 20,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    filters.genFilter);

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }

  return (
    <>
      <EntitySearchMainIcons
        dispatches={dispatches}
        filters={filters}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={TYPE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default TypeSearch;
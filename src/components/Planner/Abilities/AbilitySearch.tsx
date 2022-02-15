import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgsIcons,
} from '../helpers';
import {
  AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars,
  AbilityInSearch,

  ABILITY_SEARCH_QUERY,
} from '../../../types-queries/Planner/Ability';

import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntitySearchMainIcons from '../Searches/EntitySearchMainIcons';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { PokemonIconDispatches, PokemonIconFilters } from '../../App';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  
  return (
    <>
      {data.abilities.map((abilitySearchResult: AbilitySearchResult) => {
        const ability = new AbilityInSearch(abilitySearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Ability"
              key={'abilityEntry_' + ability.id}
              name={ability.formattedName}
              linkName={ability.name}
              description={ability.description}
              icons={{
                pokemonIconData: ability.pokemonIconData,
                dispatches,
                filters,
                cartNote: `Pokemon who have '${ability.formattedName}'.`
              }}
            />
          </>
        );
      })}
    </>
  );
}

type AbilitySearchMainProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const AbilitySearch = ({
  dispatches,
  filters,
}: AbilitySearchMainProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<AbilitySearchVars>(
    {
      gen: filters.genFilter.gen,
      contains: '',
      limit: 10,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    filters.genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      contains: e.target.value,
    });
  }

  return (
    <>
      <EntitySearchMainIcons
        dispatches={dispatches}
        filters={filters}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={ABILITY_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default AbilitySearch;
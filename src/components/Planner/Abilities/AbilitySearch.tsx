import {
  Outlet,
} from 'react-router-dom';

import {
  AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars,
  AbilityInSearch,

  ABILITY_SEARCH_QUERY,
} from '../../../types-queries/Planner/Ability';

import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_icons, } from '../../../hooks/Searches';
import { Dispatches, Filters } from '../../App';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import MainSearch from '../Searches/MainSearch';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  
  return (
    <>
      {data.abilities.edges.map((abilitySearchResult: AbilitySearchResult) => {
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

const listFilter = ({
  queryVars,
  setQueryVars,
  searchBar,
}: ListFilterArgs<AbilitySearchVars>) => {
  return (
    <form>
      {searchBar}
    </form>
  );
}

type AbilitySearchMainProps = {
  dispatches: Dispatches
  filters: Filters
}

const AbilitySearch = ({
  dispatches,
  filters,
}: AbilitySearchMainProps) => {
  const { queryVars, filterForm, focusedOnInput, } = useListFilter_removal<AbilitySearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 10,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: 'Search abilities by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

  const results = useListRender_icons<AbilitySearchQuery, AbilitySearchVars>(
    dispatches,
    filters,
    ABILITY_SEARCH_QUERY,
    queryVars,
    listRender,
  );

  return (
    <>
      <MainSearch
        filterForm={filterForm}
        results={results}
      />
      <Outlet />
    </>
  );
};

export default AbilitySearch;
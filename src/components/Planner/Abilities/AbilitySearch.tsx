import {
  Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_icons } from '../../../hooks/Searches';
import {
  AbilityInSearch, AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars, ABILITY_SEARCH_QUERY
} from '../../../types-queries/Planner/Ability';
import { Dispatches, Filters } from '../../App';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import MainSearch from '../MainSearch/MainSearch';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  
  return (
    <>
      {data.abilities.edges.map((abilitySearchResult: AbilitySearchResult) => {
        const ability = new AbilityInSearch(abilitySearchResult);

        return (
          <SearchEntry
            entityClass="Ability"
            key={ability.name}
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
    <>
      {searchBar}
    </>
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
  const { queryVars, filterForm, } = useListFilter_removal<AbilitySearchVars>({
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
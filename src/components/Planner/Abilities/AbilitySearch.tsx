import {
  Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal_pagination, useListRender_icons } from '../../../hooks/Searches';
import {
  AbilityInSearch, AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars, ABILITY_SEARCH_QUERY
} from '../../../types-queries/Planner/Ability';
import { Dispatches, Filters } from '../../App';
import Button from '../../Reusables/Button/Button';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import MainSearch from '../MainSearch/MainSearch';

const listRender = (
  limit: number,
  offset: number,
  onNextPageClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void, onPrevPageClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
) => (
  { data, dispatches, filters, }: ListRenderArgsIcons<AbilitySearchQuery>
) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);

  const count = data.abilities.count;
  
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
      <li>
        <fieldset className="planner-search__page-change">
          <legend className="hidden-label">Change page</legend>
          <label htmlFor="planner_ability_prev" className="hidden-label">Previous page</label>
          <Button
            title="Previous page"
            label="PREV PAGE"
            id="planner_ability_prev"
    
            active={true}
            onClick={onPrevPageClick}
            disabled={offset - limit < 0}
            immediate={true}
          />
          <label htmlFor="planner_ability_next" className="hidden-label">Next page</label>
          <Button
            title="Next page"
            label="NEXT PAGE"
            id="planner_ability_next"
    
            active={true}
            onClick={onNextPageClick}
            disabled={offset + limit > count}
            immediate={true}
          />
        </fieldset>
      </li>
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
  const { queryVars, filterForm, onNextPageClick, onPrevPageClick, } = useListFilter_removal_pagination<AbilitySearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 10,
      offset: 0,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'planner_ability_search',
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
    listRender(queryVars.limit, queryVars.offset, onNextPageClick, onPrevPageClick),
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
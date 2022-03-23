import {
  Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal_pagination, useListRender_icons } from '../../../hooks/Searches';
import {
  TypeInSearch, TypeSearchQuery,
  TypeSearchResult,
  TypeSearchVars, TYPE_SEARCH_QUERY
} from '../../../types-queries/Planner/Type';
import { Dispatches, Filters } from '../../App';
import Button from '../../Reusables/Button/Button';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import MainSearch from '../MainSearch/MainSearch';

const listRender = (
  limit: number,
  offset: number,
  onNextPageClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void, onPrevPageClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
) => (
  { data, dispatches, filters, }: ListRenderArgsIcons<TypeSearchQuery>
) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);

  const count = data.types.count;
  
  return (
    <>
      {data.types.edges.map((typeSearchResult: TypeSearchResult) => {
        const type = new TypeInSearch(typeSearchResult);
        
        return (
          <SearchEntry
            entityClass="Type"
            key={type.name}
            name={type.formattedName}
            linkName={type.name}
            description=''
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
}: ListFilterArgs<TypeSearchVars>) => {
  return (
    <>
      {searchBar}
    </>
  );
}

type TypeSearchMainProps = {
  dispatches: Dispatches
  filters: Filters
}

const TypeSearch = ({
  dispatches,
  filters,
}: TypeSearchMainProps) => {
  const { queryVars, filterForm, onNextPageClick, onPrevPageClick, } = useListFilter_removal_pagination<TypeSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 5,
      offset: 0,
      
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'planner_type_search',
      title: 'Search types by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

  const results = useListRender_icons<TypeSearchQuery, TypeSearchVars>(
    dispatches,
    filters,
    TYPE_SEARCH_QUERY,
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

export default TypeSearch;
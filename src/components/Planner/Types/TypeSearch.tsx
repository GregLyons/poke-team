import {
    Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_icons } from '../../../hooks/Searches';
import {
    TypeInSearch, TypeSearchQuery,
    TypeSearchResult,
    TypeSearchVars, TYPE_SEARCH_QUERY
} from '../../../types-queries/Planner/Type';
import { Dispatches, Filters } from '../../App';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import MainSearch from '../MainSearch/MainSearch';




const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<TypeSearchQuery>) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);
  
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
    </>
  );
}

const listFilter = ({
  queryVars,
  setQueryVars,
  searchBar,
}: ListFilterArgs<TypeSearchVars>) => {
  return (
    <form>
      {searchBar}
    </form>
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
  const { queryVars, filterForm, focusedOnInput, } = useListFilter_removal<TypeSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 20,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    genFilter: filters.genFilter,
    searchBarProps: {
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

export default TypeSearch;
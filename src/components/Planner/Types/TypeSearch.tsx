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

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { Dispatches, Filters } from '../../App';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_removal_icons } from '../../../hooks/Planner/MainSearches';
import MainSearch from '../Searches/MainSearch';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<TypeSearchQuery>) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);
  
  return (
    <>
      {data.types.edges.map((typeSearchResult: TypeSearchResult) => {
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

const listFilter = ({
  queryVars,
  setQueryVars,
  searchBar,
}: ListFilterArgs<TypeSearchVars>) => {
  return (
    <form>
      <SearchBar
        title={`Search types by name`}
        placeholder={`Search types`}
        {...searchBar}
        backgroundLight="blue"
      />
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
  const [queryVars, filterForm] = useListFilter_removal<TypeSearchVars>(
    {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 20,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    filters.genFilter,
    listFilter,
  );

    const results = useListRender_removal_icons<TypeSearchQuery, TypeSearchVars>(
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
import {
  Outlet,
} from 'react-router-dom';


import {
  UsageMethodSearchQuery,
  UsageMethodSearchResult,
  UsageMethodSearchVars,
  UsageMethodInSearch,

  USAGEMETHOD_SEARCH_QUERY,
} from '../../../types-queries/Planner/UsageMethod';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';

import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Searches';
import MainSearch from '../Searches/MainSearch';

const listRender = ({ data, }: ListRenderArgs<UsageMethodSearchQuery>) => {
  if (!data || !data.usageMethods) return (<div>Data not found for the query 'usageMethods'.</div>);
  
  return (
    <>
      {data.usageMethods.edges.map((usageMethodSearchResult: UsageMethodSearchResult) => {
        const usageMethod = new UsageMethodInSearch(usageMethodSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Usage method"
              key={'usageMethodEntry_' + usageMethod.id}
              name={usageMethod.formattedName}
              linkName={usageMethod.name}
              description={usageMethod.description}
              icons={{
                linkIconDatum: {
                  iconClass: 'usageMethod',
                  iconDatum: usageMethod.iconDatum,
                }
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
}: ListFilterArgs<UsageMethodSearchVars>) => {
  return (
    <form>
      {searchBar}
    </form>
  );
}

type UsageMethodSearchMainProps = {
  genFilter: GenFilter
}

const UsageMethodSearch = ({
  genFilter,
}: UsageMethodSearchMainProps) => {
  const { queryVars, filterForm, focusedOnInput, } = useListFilter<UsageMethodSearchVars>({
    defaultSearchVars: {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
    },
    genFilter,
    searchBarProps: {
      title: 'Search usage methods by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

  const results = useListRender<UsageMethodSearchQuery, UsageMethodSearchVars>(
    USAGEMETHOD_SEARCH_QUERY,
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

export default UsageMethodSearch;
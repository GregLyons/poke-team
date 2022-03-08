import {
  Outlet
} from 'react-router-dom';
import { GenFilter } from "../../../hooks/App/GenFilter";
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Searches';
import {
  StatInSearch, StatSearchQuery,
  StatSearchResult,
  StatSearchVars, STAT_SEARCH_QUERY
} from '../../../types-queries/Planner/Stat';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import MainSearch from '../MainSearch/MainSearch';






const listRender = ({ data, }: ListRenderArgs<StatSearchQuery>) => {
  if (!data || !data.stats) return (<div>Data not found for the query 'stats'.</div>);
  
  return (
    <>
      {data.stats.edges.map((statSearchResult: StatSearchResult) => {
        const stat = new StatInSearch(statSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Stat"
              key={'statEntry_' + stat.name}
              name={stat.formattedName}
              linkName={stat.name}
              description={stat.description}
              icons={{
                linkIconDatum: {
                  iconClass: 'stat',
                  iconDatum: stat.iconDatum,
                },
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
}: ListFilterArgs<StatSearchVars>) => {
  return (
    <form>
      {searchBar}
    </form>
  );
}

type StatSearchMainProps = {
  genFilter: GenFilter
}

const StatSearch = ({
  genFilter,
}: StatSearchMainProps) => {
  const { queryVars, filterForm, focusedOnInput, } = useListFilter<StatSearchVars>({
    defaultSearchVars: {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
    },
    genFilter,
    searchBarProps: {
      title: 'Search statuses by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

  const results = useListRender<StatSearchQuery, StatSearchVars>(
    STAT_SEARCH_QUERY,
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

export default StatSearch;
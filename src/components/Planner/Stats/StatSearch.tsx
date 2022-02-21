import {
  Outlet,
} from 'react-router-dom';


import {
  StatSearchQuery,
  StatSearchResult,
  StatSearchVars,
  StatInSearch,

  STAT_SEARCH_QUERY,
} from '../../../types-queries/Planner/Stat';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';

import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Planner/MainSearches';
import MainSearch from '../Searches/MainSearch';

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
              key={'statEntry_' + stat.id}
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
  searchTerm,
  handleSearchTermChange,
  searchMode,
  handleSearchModeChange,
}: ListFilterArgs<StatSearchVars>) => {
  return (
    <form>
      <SearchBar
        title={`Search stats by name`}
        placeholder={`Search stats`}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        backgroundLight="blue"
      />
    </form>
  );
}

type StatSearchMainProps = {
  genFilter: GenFilter
}

const StatSearch = ({
  genFilter,
}: StatSearchMainProps) => {
  const [queryVars, filterForm] = useListFilter<StatSearchVars>(
    {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
    },
    genFilter,
    listFilter,
  );

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
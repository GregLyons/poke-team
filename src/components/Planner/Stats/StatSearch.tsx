import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, 
} from '../helpers';
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
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

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

type StatSearchMainProps = {
  genFilter: GenFilter
}

const StatSearch = ({
  genFilter,
}: StatSearchMainProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<StatSearchVars>(
    {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
    },
    genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      contains: e.target.value,
    });
  }


  return (
    <>
       <EntitySearchMain
        entityPluralString='stats'
        genFilter={genFilter}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        listRender={listRender}
        query={STAT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default StatSearch;
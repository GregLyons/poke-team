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

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

const listRender = ({ data, }: ListRenderArgs<StatSearchQuery>) => {
  if (!data || !data.stats) return (<div>Data not found for the query 'stats'.</div>);
  
  return (
    <>
      {data.stats.map((statSearchResult: StatSearchResult) => {
        const stat = new StatInSearch(statSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Stat"
              key={'statEntry_' + stat.id}
              name={stat.formattedName}
              linkName={stat.name}
              description={stat.description}
            />
          </>
        );
      })}
    </>
  );
}

type StatSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  dispatchBGManager: React.Dispatch<BGAction>
  genFilter: GenFilter
}

const StatSearch = ({
  dispatchCart,
  dispatchTeam,
  dispatchBGManager,
  genFilter,
}: StatSearchMainProps) => {
  const [queryVars, setQueryVars] = useGenConnectedSearchVars<StatSearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
    },
    genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }


  return (
    <>
      <EntitySearchMain
        genFilter={genFilter}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={STAT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default StatSearch;
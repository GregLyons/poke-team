import {
  useState,
} from 'react';
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
} from '../../../../types-queries/Planner/Stat';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

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
  gen: GenerationNum
}

const StatSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: StatSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<StatSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 100,
  })

  const handleSubmit: (newQueryVars: StatSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain
        gen={gen}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={STAT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default StatSearch;
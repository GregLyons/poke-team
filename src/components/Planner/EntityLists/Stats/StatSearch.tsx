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
} from '../../../../types-queries/Stat';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import StatEntry from './StatEntry';
import EntitySearchMain from '../EntitySearchMain';

const listRender = ({ data, }: ListRenderArgs<StatSearchQuery>) => {
  if (!data || !data.stats) return (<div>Data not found for the query 'stats'.</div>);
  
  return (
    <>
      {data.stats.map((stat: StatSearchResult) => (
          <>
            <StatEntry
              key={'statEntry_' + stat.id}
              stat={new StatInSearch(stat)} 
            />
          </>
        ))}
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
    limit: 5,
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
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
  UsageMethodSearchQuery,
  UsageMethodSearchResult,
  UsageMethodSearchVars,
  UsageMethodInSearch,

  USAGEMETHOD_SEARCH_QUERY,
} from '../../../../types-queries/Planner/UsageMethod';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

const listRender = ({ data, }: ListRenderArgs<UsageMethodSearchQuery>) => {
  if (!data || !data.usageMethods) return (<div>Data not found for the query 'usageMethods'.</div>);
  
  return (
    <>
      {data.usageMethods.map((usageMethodSearchResult: UsageMethodSearchResult) => {
        const usageMethod = new UsageMethodInSearch(usageMethodSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Usage method"
              key={'usageMethodEntry_' + usageMethod.id}
              name={usageMethod.formattedName}
              linkName={usageMethod.name}
              description={usageMethod.description}
            />
          </>
        );
      })}
    </>
  );
}

type UsageMethodSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const UsageMethodSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: UsageMethodSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<UsageMethodSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 100,
  })

  const handleSubmit: (newQueryVars: UsageMethodSearchVars) => void = (newQueryVars) => {
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
        query={USAGEMETHOD_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default UsageMethodSearch;
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
  StatusSearchQuery,
  StatusSearchResult,
  StatusSearchVars,
  StatusInSearch,

  STATUS_SEARCH_QUERY,
} from '../../../../types-queries/Planner/Status';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

const listRender = ({ data, }: ListRenderArgs<StatusSearchQuery>) => {
  if (!data || !data.statuses) return (<div>Data not found for the query 'statuses'.</div>);
  
  return (
    <>
      {data.statuses.map((statusSearchResult: StatusSearchResult) => {
        const status = new StatusInSearch(statusSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Status"
              key={'statusEntry_' + status.id}
              name={status.formattedName}
              linkName={status.name}
              description={status.description}
              data={[
                {
                  key: 'Volatile', value: status.volatile ? 'Yes' : 'No'
                },
              ]}
            />
          </>
        );
      })}
    </>
  );
}

type StatusSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const StatusSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: StatusSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<StatusSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 100,
  })

  const handleSubmit: (newQueryVars: StatusSearchVars) => void = (newQueryVars) => {
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
        query={STATUS_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default StatusSearch;
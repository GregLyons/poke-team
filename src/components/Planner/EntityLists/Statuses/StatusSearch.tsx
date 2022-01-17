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
} from '../../../../types-queries/Status';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import StatusEntry from './StatusEntry';
import EntitySearchMain from '../EntitySearchMain';

const listRender = ({ data, }: ListRenderArgs<StatusSearchQuery>) => {
  if (!data || !data.statuses) return (<div>Data not found for the query 'statuses'.</div>);
  
  return (
    <>
      {data.statuses.map((status: StatusSearchResult) => (
          <>
            <StatusEntry
              key={'statusEntry_' + status.id}
              status={new StatusInSearch(status)} 
            />
          </>
        ))}
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
    limit: 5,
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
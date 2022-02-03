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
} from '../../../types-queries/Planner/Status';

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

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
                  key: 'VOL', title: 'Is a volatile status effect', value: status.volatile ? 'Yes' : 'No'
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
  genFilter: GenFilter
}

const StatusSearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
}: StatusSearchMainProps) => {
  const [queryVars, setQueryVars] = useGenConnectedSearchVars<StatusSearchVars>(
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
        query={STATUS_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default StatusSearch;
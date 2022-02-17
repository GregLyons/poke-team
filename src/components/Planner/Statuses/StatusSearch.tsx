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

import { GenFilter } from "../../../hooks/App/GenFilter";

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
              icons={{
                linkIconDatum: {
                  iconClass: 'status',
                  iconDatum: status.iconDatum,
                }
              }}
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
  genFilter: GenFilter
}

const StatusSearch = ({
  genFilter,
}: StatusSearchMainProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<StatusSearchVars>(
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
        genFilter={genFilter}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        listRender={listRender}
        query={STATUS_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default StatusSearch;
import {
  Outlet,
} from 'react-router-dom';


import {
  StatusSearchQuery,
  StatusSearchResult,
  StatusSearchVars,
  StatusInSearch,

  STATUS_SEARCH_QUERY,
} from '../../../types-queries/Planner/Status';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';

import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Searches';
import MainSearch from '../Searches/MainSearch';

const listRender = ({ data, }: ListRenderArgs<StatusSearchQuery>) => {
  if (!data || !data.statuses) return (<div>Data not found for the query 'statuses'.</div>);
  
  return (
    <>
      {data.statuses.edges.map((statusSearchResult: StatusSearchResult) => {
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

const listFilter = ({
  queryVars,
  setQueryVars,
  searchBar,
}: ListFilterArgs<StatusSearchVars>) => {
  // TODO: volatility

  return (
    <form>
      {searchBar}
    </form>
  );
}

type StatusSearchMainProps = {
  genFilter: GenFilter
}

const StatusSearch = ({
  genFilter,
}: StatusSearchMainProps) => {
  const { queryVars, filterForm, focusedOnInput, } = useListFilter<StatusSearchVars>({
    defaultSearchVars: {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
      volatile: null,
    },
    genFilter,
    searchBarProps: {
      title: 'Search statuses by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

  const results = useListRender<StatusSearchQuery, StatusSearchVars>(
    STATUS_SEARCH_QUERY,
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

export default StatusSearch;
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
} from '../../../types-queries/Planner/UsageMethod';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

const listRender = ({ data, }: ListRenderArgs<UsageMethodSearchQuery>) => {
  if (!data || !data.usageMethods) return (<div>Data not found for the query 'usageMethods'.</div>);
  
  return (
    <>
      {data.usageMethods.edges.map((usageMethodSearchResult: UsageMethodSearchResult) => {
        const usageMethod = new UsageMethodInSearch(usageMethodSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Usage method"
              key={'usageMethodEntry_' + usageMethod.id}
              name={usageMethod.formattedName}
              linkName={usageMethod.name}
              description={usageMethod.description}
              icons={{
                linkIconDatum: {
                  iconClass: 'usageMethod',
                  iconDatum: usageMethod.iconDatum,
                }
              }}
            />
          </>
        );
      })}
    </>
  );
}

type UsageMethodSearchMainProps = {
  genFilter: GenFilter
}

const UsageMethodSearch = ({
  genFilter,
}: UsageMethodSearchMainProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<UsageMethodSearchVars>(
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
       entityPluralString='usage methods'
        genFilter={genFilter}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        listRender={listRender}
        query={USAGEMETHOD_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default UsageMethodSearch;
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, 
} from '../helpers';
import {
  EffectSearchQuery,
  EffectSearchResult,
  EffectSearchVars,
  EffectInSearch,

  EFFECT_SEARCH_QUERY,
} from '../../../types-queries/Planner/Effect';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

const listRender = ({ data, }: ListRenderArgs<EffectSearchQuery>) => {
  if (!data || !data.effects) return (<div>Data not found for the query 'effects'.</div>);
  
  return (
    <>
      {data.effects.edges.map((effectSearchResult: EffectSearchResult) => {
        const effect = new EffectInSearch(effectSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Effect"
              key={'effectEntry_' + effect.id}
              name={effect.formattedName}
              linkName={effect.name}
              description={effect.description}
            />
          </>
        );
      })}
    </>
  );
}

type EffectSearchMainProps = {
  genFilter: GenFilter
}

const EffectSearch = ({
  genFilter,
}: EffectSearchMainProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<EffectSearchVars>(
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
        query={EFFECT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default EffectSearch;
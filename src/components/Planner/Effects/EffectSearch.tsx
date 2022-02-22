import {
  Outlet,
} from 'react-router-dom';

import {
  EffectSearchQuery,
  EffectSearchResult,
  EffectSearchVars,
  EffectInSearch,

  EFFECT_SEARCH_QUERY,
} from '../../../types-queries/Planner/Effect';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Planner/MainSearches';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { ItemSearchQuery, ItemSearchVars } from '../../../types-queries/Planner/Item';
import MainSearch from '../Searches/MainSearch';

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

const listFilter = ({
  queryVars,
  setQueryVars,
  searchTerm,
  handleSearchTermChange,
  searchMode,
  handleSearchModeChange,
}: ListFilterArgs<EffectSearchVars>) => {
  return (
    <form>
      <SearchBar
        title={`Search effects by name`}
        placeholder={`Search effects`}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        backgroundLight="blue"
      />
    </form>
  );
}

type EffectSearchMainProps = {
  genFilter: GenFilter
}

const EffectSearch = ({
  genFilter,
}: EffectSearchMainProps) => {
  const [queryVars, filterForm] = useListFilter<EffectSearchVars>(
    {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
    },
    genFilter,
    listFilter,
  );

  const results = useListRender<EffectSearchQuery, EffectSearchVars>(
    EFFECT_SEARCH_QUERY,
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

export default EffectSearch;
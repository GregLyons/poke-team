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
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Searches';
import MainSearch from '../MainSearch/MainSearch';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import { listToggleValue } from '../helpers';
import Button from '../../Reusables/Button/Button';
import { EffectClass, EFFECT_CLASS_MAP, EFFECT_TITLE_MAP } from '../../../types-queries/entities';

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
              key={'effectEntry_' + effect.name}
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
  searchBar,
}: ListFilterArgs<EffectSearchVars>) => {
  const handleClassSelect = listToggleValue<EffectSearchVars, EffectClass>(queryVars, setQueryVars, 'effectClass');

  return (
    <form>
      {searchBar}
      <DropdownMenu
        title="CLASS"
        items={Array.from(EFFECT_CLASS_MAP.entries()).map(([key, value]) => {
          const selected = queryVars.effectClass.includes(key);

          return {
            id: key,
            label: (
              <Button
                title={selected
                  ? `Exclude ${EFFECT_TITLE_MAP.get(key)}.`
                  : `Include ${EFFECT_TITLE_MAP.get(key)}.`
                }
                label={value}
                active={selected}
                onClick={e => e.preventDefault()}
                disabled={false}
                immediate={false}
              />
            ),
            selected,
          };
        })}
        toggleSelect={handleClassSelect}
        dropdownWidth={'clamp(5vw, 50ch, 80%)'}
        itemWidth={'15ch'}
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
  const { queryVars, filterForm, focusedOnInput, } = useListFilter<EffectSearchVars>({
    defaultSearchVars: {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,
      effectClass: Array.from(EFFECT_CLASS_MAP.keys()),
    },
    genFilter,
    searchBarProps: {
      title: 'Search effects by name',
      backgroundLight: 'blue',
    },
    listFilter,
});

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
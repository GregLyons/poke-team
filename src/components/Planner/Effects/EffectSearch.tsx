import {
  Outlet
} from 'react-router-dom';
import { GenFilter } from "../../../hooks/App/GenFilter";
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Searches';
import { EffectClass, EFFECT_CLASS_MAP, EFFECT_TITLE_MAP } from '../../../types-queries/entities';
import {
  EffectInSearch, EffectSearchQuery,
  EffectSearchResult,
  EffectSearchVars, EFFECT_SEARCH_QUERY
} from '../../../types-queries/Planner/Effect';
import Checkbox from '../../Reusables/Checkbox/Checkbox';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import { listToggleValue } from '../helpers';
import MainSearch from '../MainSearch/MainSearch';

const listRender = ({ data, }: ListRenderArgs<EffectSearchQuery>) => {
  if (!data || !data.effects) return (<div>Data not found for the query 'effects'.</div>);
  
  return (
    <>
      {data.effects.edges.map((effectSearchResult: EffectSearchResult) => {
        const effect = new EffectInSearch(effectSearchResult);

        return (
          <SearchEntry
            entityClass="Effect"
            key={effect.name}
            name={effect.formattedName}
            linkName={effect.name}
            description={effect.description}
          />
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
    <>
      {searchBar}
      <DropdownMenu
        label="CLASS"
        content={<div>
          {Array.from(EFFECT_CLASS_MAP.entries()).map(([key, value]) => {
            const checked = queryVars.effectClass.includes(key);
            
            return <Checkbox
              key={key}

              id={key + '_effect_class'}
              label={value}
              title={checked
                ? `Exclude ${EFFECT_TITLE_MAP.get(key)}.`
                : `Include ${EFFECT_TITLE_MAP.get(key)}.`
              }

              checked={checked}
              onChange={handleClassSelect(key)}
            />
          })}
        </div>}
        
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        backgroundLight="blue"
      />
    </>
  );
}

type EffectSearchMainProps = {
  genFilter: GenFilter
}

const EffectSearch = ({
  genFilter,
}: EffectSearchMainProps) => {
  const { queryVars, filterForm, } = useListFilter<EffectSearchVars>({
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
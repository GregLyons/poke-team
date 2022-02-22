import {
  Outlet,
} from 'react-router-dom';

import { listToggleValue, rangeSelect, sliderSelect, } from '../helpers';
import {
  FieldStateSearchQuery,
  FieldStateSearchResult,
  FieldStateSearchVars,
  FieldStateInSearch,

  FIELDSTATE_SEARCH_QUERY,
} from '../../../types-queries/Planner/FieldState';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { ENUMCASE_TO_TITLECASE } from '../../../utils/constants';
import { Dispatch, SetStateAction } from 'react';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { FieldStateClass, FieldStateDamagePercent, FieldStateTargetClass, FIELDSTATE_CLASS_MAP, FIELDSTATE_TARGETCLASS_MAP } from '../../../types-queries/helpers';
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Planner/MainSearches';
import MainSearch from '../Searches/MainSearch';

const listRender = ({ data, }: ListRenderArgs<FieldStateSearchQuery>) => {
  if (!data || !data.fieldStates) return (<div>Data not found for the query 'fieldStates'.</div>);
  
  return (
    <>
      {data.fieldStates.edges.map((fieldStateSearchResult: FieldStateSearchResult) => {
        const fieldState = new FieldStateInSearch(fieldStateSearchResult);
        
        // Build up field state data, leaving out certain default values
        const fieldStateData: {
          key: string, 
          title: string,
          value: string | number | boolean,
        }[] = [{ key: 'CLASS', title: 'Field state class', value: ENUMCASE_TO_TITLECASE(fieldState.fieldStateClass), }];
        
        if (fieldState.damagePercent > 0) fieldStateData.push({ key: '%HP', title: 'Percent of max HP in damage', value: fieldState.damagePercent + '%', });

        fieldStateData.push({ key: 'GRND', title: 'Only affects grounded targets', value: fieldState.grounded ? 'Yes' : 'No', })

        if (fieldState.maxLayers > 1) fieldStateData.push({ key: 'MAX', title: 'Max number of layers', value: fieldState.maxLayers, });

        fieldStateData.push({ key: 'TAR', title: 'Target', value: ENUMCASE_TO_TITLECASE(fieldState.target), });
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Field state"
              key={'fieldStateEntry_' + fieldState.id}
              name={fieldState.formattedName}
              linkName={fieldState.name}
              data={fieldStateData}
              description={fieldState.description}
              icons={{
                linkIconDatum: {
                  iconClass: 'fieldState',
                  iconDatum: fieldState.iconDatum,
                }
              }}
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
}: ListFilterArgs<FieldStateSearchVars>) => {
  const handleClassSelect = listToggleValue<FieldStateSearchVars, FieldStateClass>(queryVars, setQueryVars, 'fieldStateClass');

  const handleDamagePercentRange = rangeSelect<FieldStateSearchVars>(queryVars, setQueryVars, 'minDamagePercent', 'maxDamagePercent');

  const handleMaxLayers = sliderSelect<FieldStateSearchVars>(queryVars, setQueryVars, 'maxLayers');

  // TODO: grounded filter

  const handleTargetClassSelect = listToggleValue<FieldStateSearchVars, FieldStateTargetClass>(queryVars, setQueryVars, 'target');

  return (
    <form>
      <SearchBar
        title={`Search field states by name`}
        placeholder={`Search field states`}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        backgroundLight="blue"
      />
    </form>
  );
}

type FieldStateSearchMainProps = {
  genFilter: GenFilter
}

const FieldStateSearch = ({
  genFilter,
}: FieldStateSearchMainProps) => {
  const [queryVars, filterForm] = useListFilter<FieldStateSearchVars>(
    {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,

      fieldStateClass: Array.from(FIELDSTATE_CLASS_MAP.keys()),
      maxDamagePercent: 100,
      minDamagePercent: 0,
      maxLayers: 3,
      grounded: null,
      target: Array.from(FIELDSTATE_TARGETCLASS_MAP.keys()),
    },
    genFilter,
    listFilter,
  );

  const results = useListRender<FieldStateSearchQuery, FieldStateSearchVars>(
    FIELDSTATE_SEARCH_QUERY,
    queryVars,
    listRender,
  )

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

export default FieldStateSearch;
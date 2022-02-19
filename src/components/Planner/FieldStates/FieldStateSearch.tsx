import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, listToggleValue, rangeSelect, 
} from '../helpers';
import {
  FieldStateSearchQuery,
  FieldStateSearchResult,
  FieldStateSearchVars,
  FieldStateInSearch,

  FIELDSTATE_SEARCH_QUERY,
} from '../../../types-queries/Planner/FieldState';

import { GenFilter } from "../../../hooks/App/GenFilter";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { ENUMCASE_TO_TITLECASE } from '../../../utils/constants';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { Dispatch, SetStateAction } from 'react';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { FieldStateClass, FieldStateDamagePercent, FieldStateTargetClass } from '../../../types-queries/helpers';

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


function listFilter (
  queryVars: FieldStateSearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<FieldStateSearchVars>>,
  searchTerm: string,
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchMode: 'STARTS' | 'CONTAINS',
  handleSearchModeChange: (e: React.MouseEvent<HTMLElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
) {
  const handleClassSelect =  listToggleValue<FieldStateSearchVars, FieldStateClass>(queryVars, setQueryVars, 'fieldStateClass');

  const handleDamagePercentRange = rangeSelect<FieldStateSearchVars>(queryVars, setQueryVars, 0, 100, 'minDamagePercent', 'maxDamagePercent');


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
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<FieldStateSearchVars>(
    {
      gen: genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 100,

      fieldStateClass: [],
      maxDamagePercent: 100,
      minDamagePercent: 0,
      maxLayers: 3,
      grounded: null,
      target: [],
    },
    genFilter,
  );

  return (
    <>
       <EntitySearchMain
        entityPluralString='field states'
        genFilter={genFilter}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        listRender={listRender}
        query={FIELDSTATE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default FieldStateSearch;
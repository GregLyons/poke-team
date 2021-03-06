import {
  Outlet
} from 'react-router-dom';
import { GenFilter } from "../../../hooks/App/GenFilter";
import { ListFilterArgs, ListRenderArgs, useListFilter, useListRender } from '../../../hooks/Searches';
import { FieldStateClass, FieldStateTargetClass, FIELDSTATE_CLASS_MAP, FIELDSTATE_TARGETCLASS_MAP } from '../../../types-queries/entities';
import {
  FieldStateInSearch, FieldStateSearchQuery,
  FieldStateSearchResult,
  FieldStateSearchVars, FIELDSTATE_SEARCH_QUERY
} from '../../../types-queries/Planner/FieldState';
import { ENUMCASE_TO_TITLECASE } from '../../../utils/constants';
import Checkbox from '../../Reusables/Checkbox/Checkbox';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import ThreeToggle from '../../Reusables/ThreeToggle/ThreeToggle';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import { listToggleValue, rangeSelect, threeToggle } from '../helpers';
import MainSearch from '../MainSearch/MainSearch';

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
          <SearchEntry
            entityClass="Field state"
            key={fieldState.name}
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
        );
      })}
    </>
  );
}

const listFilter = ({
  queryVars,
  setQueryVars,
  searchBar,
}: ListFilterArgs<FieldStateSearchVars>) => {
  const handleClassSelect = listToggleValue<FieldStateSearchVars, FieldStateClass>(queryVars, setQueryVars, 'fieldStateClass');

  const handleDamagePercentRange = rangeSelect<FieldStateSearchVars>(queryVars, setQueryVars, 'minDamagePercent', 'maxDamagePercent');

  // const handleMaxLayers = sliderSelect<FieldStateSearchVars>(queryVars, setQueryVars, 'maxLayers');

  const setGrounded = threeToggle<FieldStateSearchVars>(queryVars, setQueryVars, 'grounded');

  const handleTargetClassSelect = listToggleValue<FieldStateSearchVars, FieldStateTargetClass>(queryVars, setQueryVars, 'target');

  return (
    <>
      {searchBar}
      <label htmlFor="field_state_class_filter_trigger" className="hidden-label">Field state class dropdown</label>
      <DropdownMenu
        triggerID="field_state_class_filter_trigger"
        label="CLASS"

        content={<fieldset>
          <legend className="hidden-label">Filter field states by class</legend>
          {Array.from(FIELDSTATE_CLASS_MAP.entries()).map(([key, value]) => {
            const checked = queryVars.fieldStateClass.includes(key);

            return <Checkbox
              key={key}

              id={key + '_field_state_class'}
              label={value}
              title={checked
                ? `Exclude ${value} field states.`
                : `Include ${value} field states.`
              }

              checked={checked}
              onChange={handleClassSelect(key)}
            />
          })}
        </fieldset>}
        
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        backgroundLight="blue"
      />
      <label htmlFor="field_state_target_filter_trigger" className="hidden-label">Field state target dropdown</label>
      <DropdownMenu
        triggerID="field_state_target_filter_trigger"
        label="TARGET"

        content={<fieldset>
          <legend className="hidden-label">Filter field states by target</legend>
          {Array.from(FIELDSTATE_TARGETCLASS_MAP.entries()).map(([key, value]) => {
            const checked = queryVars.target.includes(key);

            return <Checkbox
              key={key}

              id={key + '_field_state_target_class'}
              label={value}
              title={checked
                ? `Exclude field states which target ${value}.`
                : `Include field states which target ${value}.`
              }

              checked={checked}
              onChange={handleTargetClassSelect(key)}
            />
          })}
        </fieldset>}
        
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        backgroundLight="blue"
      />
      <ThreeToggle
        label="GROUNDED"
        selection={queryVars.grounded}
        setSelection={setGrounded}
      />
      {/* {handleDamagePercentRange && <DoubleSlider
        titleFor="damage percent"
        {...handleDamagePercentRange}
        min={0}
        minValue={queryVars.minDamagePercent}
        max={100}
        maxValue={queryVars.maxDamagePercent}
      />} */}
      {/* {handleMaxLayers && <Slider
        titleFor="max layers"
        {...handleMaxLayers}
        min={0}
        max={3}
        value={queryVars.maxLayers}
      />} */}
    </>
  );
}

type FieldStateSearchMainProps = {
  genFilter: GenFilter
}

const FieldStateSearch = ({
  genFilter,
}: FieldStateSearchMainProps) => {
  const { queryVars, filterForm, } = useListFilter<FieldStateSearchVars>({
    defaultSearchVars: {
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
    searchBarProps: {
      id: 'planner_field_state_search',
      title: 'Search field states by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

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
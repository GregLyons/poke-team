import {
  Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { TYPE_NAMES } from '../../../hooks/App/PokemonFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_icons } from '../../../hooks/Searches';
import { MoveCategory, MoveTargetClass, MOVE_CATEGORY_MAP, MOVE_TARGETCLASS_MAP, MOVE_TYPE_MAP } from '../../../types-queries/entities';
import { CapsTypeName, toCapsTypeName } from '../../../types-queries/helpers';
import {
  MoveInSearch, MoveSearchQuery,
  MoveSearchResult,
  MoveSearchVars, MOVE_SEARCH_QUERY
} from '../../../types-queries/Planner/Move';
import {
  ENUMCASE_TO_TITLECASE
} from '../../../utils/constants';
import { Dispatches, Filters } from '../../App';
import Checkbox from '../../Reusables/Checkbox/Checkbox';
import DoubleSlider from '../../Reusables/DoubleSlider/DoubleSlider';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import ThreeToggle from '../../Reusables/ThreeToggle/ThreeToggle';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import { listToggleValue, rangeSelect, threeToggle } from '../helpers';
import MainSearch from '../MainSearch/MainSearch';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  
  return (
    <>
      {data.moves.edges.map((moveSearchResult: MoveSearchResult) => {
        const move = new MoveInSearch(moveSearchResult);

        return (
          <SearchEntry
            entityClass="Move"
            key={move.name}
            name={move.formattedName}
            linkName={move.name}
            description={move.description}
            data={[
              {
                key: 'POW', title: 'Power', value: move.power,
              },
              {
                key: 'PP', title: 'PP', value: move.pp === 0 ? '--': move.pp,
              },
              {
                key: 'ACC', title: 'Accuracy', value: move.accuracy === 0 ? '--' : move.accuracy,
              },
              {
                key: 'CAT', title: 'Damage category', value: ENUMCASE_TO_TITLECASE(move.category),
              },
              {
                key: 'CON', title: 'Makes contact', value: move.contact ? 'Yes' : 'No'
              },
              {
                key: 'PRI', title: 'Priority', value: move.priority,
              },
              {
                key: 'TAR', title: 'Target', value: ENUMCASE_TO_TITLECASE(move.target).replace('adjacent', 'adj.'),
              },
            ]}
            icons={{
              pokemonIconData: move.pokemonIconData,
              linkIconDatum: {
                iconClass: 'type',
                iconDatum: move.typeIconDatum,
              },
              dispatches,
              filters,
              cartNote: `Pokemon who learn '${move.formattedName}'.`
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
}: ListFilterArgs<MoveSearchVars>) => {
  const handleAccuracyRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minAccuracy', 'maxAccuracy');

  const handlePowerRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minPower', 'maxPower');

  const handlePPRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minPP', 'maxPP');

  const handlePriorityRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minPriority', 'maxPriority');

  const setBypassAccuracy = threeToggle<MoveSearchVars>(queryVars, setQueryVars, 'bypassAccuracy');

  const handleCategorySelect = listToggleValue<MoveSearchVars, MoveCategory>(queryVars, setQueryVars, 'category');

  const handleTypeSelect = listToggleValue<MoveSearchVars, CapsTypeName>(queryVars, setQueryVars, 'types');

  const handleTargetClassSelect = listToggleValue<MoveSearchVars, MoveTargetClass>(queryVars, setQueryVars, 'target');

  const setVariablePower = threeToggle<MoveSearchVars>(queryVars, setQueryVars, 'variablePower');

  return (
    <>
      {searchBar}
      {handleAccuracyRange && handlePowerRange && handlePPRange && handlePriorityRange && <>
        <label htmlFor="move_range_filter_trigger" className="hidden-label">Move range dropdown</label>
        <DropdownMenu
          triggerID="move_range_filter_trigger"
          label="RANGES"
          content={<fieldset
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <legend className="hidden-label">Filter moves by accuracy, power, PP, and priority</legend>
            {['Accuracy', 'Power', 'PP ', 'Priority'].map(attributeName => {
              let min: number, max: number, 
                  minKey: keyof MoveSearchVars, maxKey: keyof MoveSearchVars,
                  handleRange: {
                    updateMinValue: (value: number) => void,
                    updateMaxValue: (value: number) => void,
                  };
              switch(attributeName) {
                case 'Accuracy':
                  min = 0;
                  max = 100;
                  minKey = 'minAccuracy';
                  maxKey = 'maxAccuracy';
                  handleRange = handleAccuracyRange;

                  break;

                case 'Power':
                  min = 0;
                  max = 300;
                  minKey = 'minPower';
                  maxKey = 'maxPower';
                  handleRange = handlePowerRange;

                  break;

                case 'PP ':
                  min = 0;
                  max = 40;
                  minKey = 'minPP';
                  maxKey = 'maxPP';
                  handleRange = handlePPRange;

                  break;

                case 'Priority':
                  min = -7;
                  max = 7;
                  minKey = 'minPriority';
                  maxKey = 'maxPriority';
                  handleRange = handlePriorityRange;

                  break;

                // Shouldn't be reached
                default:
                  min = 0;
                  max = 100;
                  minKey = 'minAccuracy';
                  maxKey = 'maxAccuracy';
                  handleRange = handleAccuracyRange;
              }

              return (
                <div
                  key={attributeName}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                  }}
                >
                  <div style={{
                    width: '3ch',
                  }}>
                    {attributeName.slice(0, 3)}
                  </div>
                  <DoubleSlider
                    titleFor={attributeName}
                    min={min}
                    minValue={queryVars[minKey]}
                    max={max}
                    maxValue={queryVars[maxKey]}
                    {...handleRange}
                  />
                </div>
              );
          })}
          </fieldset>}

          dropdownWidth={'clamp(10vw, 15ch, 30%)'}
          backgroundLight="blue"
        />
      </>}
      <label htmlFor="move_category_filter_trigger" className="hidden-label">Move category dropdown</label>
      <DropdownMenu
        triggerID="move_category_filter_trigger"
        label="CATEGORY"

        content={<fieldset>
          <legend className="hidden-label">Filter by move category</legend>
          {Array.from(MOVE_CATEGORY_MAP.entries()).map(([moveCategory, formattedMoveCategory]) => {
            const checked = queryVars.category.includes(moveCategory);
            
            let titleString: string
            switch(moveCategory) {
              case 'VARIES':
                titleString = 'whose category varies';
                break;
              default:
                titleString = `in the ${formattedMoveCategory} category`
            }

            return <Checkbox
              key={moveCategory}
              
              id={moveCategory + '_move_category'}
              label={formattedMoveCategory}
              title={checked
                ? `Exclude moves ${titleString}.`
                : `Include moves ${titleString}.`
              }

              checked={checked}
              onChange={handleCategorySelect(moveCategory)}
            />
          })}
        </fieldset>}

        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        backgroundLight="blue"
      />
      <label htmlFor="move_type_filter_trigger">Move type dropdown</label>
      <DropdownMenu
        triggerID="move_type_filter_trigger"
        label={'TYPE'}

        content={<fieldset>
          <legend className="hidden-label">Filter moves by type</legend>
          {Array.from(MOVE_TYPE_MAP.entries()).map(([typeName, formattedTypeName]) => {
            const checked = queryVars.types.includes(typeName);

            return <Checkbox
              key={typeName}

              id={typeName + '_move_type'}
              label={formattedTypeName}
              title={checked
                ? `Exclude ${formattedTypeName}-type Moves.`
                : `Include ${formattedTypeName}-type Moves.`
              }

              checked={checked}
              onChange={handleTypeSelect(typeName)}
            />
          })}
        </fieldset>}
        
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        backgroundLight={"blue"}
      />
      <label htmlFor="move_target_filter_trigger">Move target dropdown</label>
      <DropdownMenu
        triggerID="move_target_filter_trigger"
        label="TARGET"
        
        content={<fieldset>
          <legend className="hidden-label">Filter moves by target</legend>
          {Array.from(MOVE_TARGETCLASS_MAP.entries()).map(([targetClassName, formattedTargetClassName]) => {
            const checked = queryVars.target.includes(targetClassName);

            return <Checkbox
              key={targetClassName}

              id={targetClassName + '_move_target'}
              label={formattedTargetClassName}
              title={checked
                ? `Exclude moves which target ${formattedTargetClassName}.`
                : `Include moves which target ${formattedTargetClassName}.`
              }

              checked={checked}
              onChange={handleTargetClassSelect(targetClassName)}
            />
          })}
        </fieldset>}
        
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        backgroundLight="blue"
      />
      <ThreeToggle
        label="BYPASS ACC."
        selection={queryVars.bypassAccuracy}
        setSelection={setBypassAccuracy}
      />
      <ThreeToggle
        label="VARIABLE POW."
        selection={queryVars.variablePower}
        setSelection={setVariablePower}
      />
    </>
  );
}

type MoveSearchProps = {
  dispatches: Dispatches
  filters: Filters
}

const MoveSearch = ({
  dispatches,
  filters,
}: MoveSearchProps) => {
  const { queryVars, filterForm, } = useListFilter_removal<MoveSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 10,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),

      maxAccuracy: 100,
      minAccuracy: 0,
      maxPower: 300,
      minPower: 0,
      maxPP: 40,
      minPP: 0,
      maxPriority: 7,
      minPriority: -7,

      bypassAccuracy: null,
      category: Array.from(MOVE_CATEGORY_MAP.keys()),
      target: Array.from(MOVE_TARGETCLASS_MAP.keys()),
      types: Array.from(TYPE_NAMES.map(toCapsTypeName)),
      variablePower: null,
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: 'Search moves by name',
      backgroundLight: 'blue',
    },
    listFilter,
});

  const results = useListRender_icons<MoveSearchQuery, MoveSearchVars>(
    dispatches,
    filters,
    MOVE_SEARCH_QUERY,
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

export default MoveSearch;
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
import Button from '../../Reusables/Button/Button';
import DoubleSlider from '../../Reusables/DoubleSlider/DoubleSlider';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import { listToggleValue, rangeSelect } from '../helpers';
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

  // TODO: bypass accuracy

  const handleCategorySelect = listToggleValue<MoveSearchVars, MoveCategory>(queryVars, setQueryVars, 'category');

  const handleTypeSelect = listToggleValue<MoveSearchVars, CapsTypeName>(queryVars, setQueryVars, 'types');

  const handleTargetClassSelect = listToggleValue<MoveSearchVars, MoveTargetClass>(queryVars, setQueryVars, 'target');

  // TODO: variable power

  return (
    <>
      {searchBar}
      {handleAccuracyRange && handlePowerRange && handlePPRange && handlePriorityRange && <DropdownMenu
        title="RANGES"
        items={['Accuracy', 'Power', 'PP ', 'Priority'].map(attributeName => {
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

          return {
            id: attributeName,
            label: (
              <div>
                <div>
                  {attributeName.slice(0, 3)}
                </div>
                <DoubleSlider
                  key={attributeName}
                  titleFor={attributeName}
                  min={min}
                  minValue={queryVars[minKey]}
                  max={max}
                  maxValue={queryVars[maxKey]}
                  {...handleRange}
                />
              </div>
            ),
            selected: true,
          }
        })}
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        itemWidth={'100%'}
        backgroundLight="blue"
      />}
      <DropdownMenu
        title="CATEGORY"
        items={Array.from(MOVE_CATEGORY_MAP.entries()).map(([key, value]) => {
          const selected = queryVars.category.includes(key);
          
          let titleString: string
          switch(key) {
            case 'VARIES':
              titleString = 'whose category varies';
              break;
            default:
              titleString = `in the ${value} category`
          }

          return {
            id: key,
            label: (
              <Button
                key={key}
                title={selected
                  ? `Exclude moves ${titleString}.`
                  : `Include moves ${titleString}.`
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
        toggleSelect={handleCategorySelect}
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        itemWidth={'15ch'}
        backgroundLight="blue"
      />
      <DropdownMenu
        title={'TYPE'}
        items={Array.from(MOVE_TYPE_MAP.entries()).map(([key, value]) => {
          const selected = queryVars.types.includes(key);

          return {
            id: key,
            label: (
              <Button
                key={key}
                title={selected
                  ? `Exclude ${value}-type Moves.`
                  : `Include ${value}-type Moves.`
                }
                label={value}
                active={selected}
                onClick={e => e.preventDefault()}
                disabled={false}
                immediate={false}
              />
            ),
            selected,
          }
        })}
        toggleSelect={handleTypeSelect}
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        itemWidth={'10ch'}
        backgroundLight={"blue"}
      />
      <DropdownMenu
        title="TARGET"
        items={Array.from(MOVE_TARGETCLASS_MAP.entries()).map(([key, value]) => {
          const selected = queryVars.target.includes(key);

          return {
            id: key,
            label: (
              <Button
                key={key}
                title={selected
                  ? `Exclude moves which target ${value}.`
                  : `Include moves which target ${value}.`
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
        toggleSelect={handleTargetClassSelect}
        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
        itemWidth={'25ch'}
        backgroundLight="blue"
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
  const { queryVars, filterForm, focusedOnInput, } = useListFilter_removal<MoveSearchVars>({
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
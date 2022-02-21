import {
  Outlet,
} from 'react-router-dom';

import {
  MoveSearchQuery,
  MoveSearchResult,
  MoveSearchVars,
  MoveInSearch,

  MOVE_SEARCH_QUERY,
} from '../../../types-queries/Planner/Move';

import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import {
  ENUMCASE_TO_TITLECASE,
} from '../../../utils/constants';
import { listToggleValue, rangeSelect } from '../helpers';
import { Dispatches, Filters } from '../../App';
import EntitySearchMainIcons from '../Searches/EntitySearchMainIcons';
import { EnumTypeName, MoveCategory, MoveTargetClass, MOVE_CATEGORY_MAP, MOVE_TARGETCLASS_MAP, toEnumTypeName } from '../../../types-queries/helpers';
import { TYPE_NAMES } from '../../../hooks/App/PokemonFilter';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_removal_icons } from '../../../hooks/Planner/MainSearches';
import MainSearch from '../Searches/MainSearch';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  
  return (
    <>
      {data.moves.edges.map((moveSearchResult: MoveSearchResult) => {
        const move = new MoveInSearch(moveSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Move"
              key={'moveEntry_' + move.id}
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
}: ListFilterArgs<MoveSearchVars>) => {
  const handleAccuracyRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minAccuracy', 'maxAccuracy');

  const handlePowerRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minPower', 'maxPower');

  const handlePPRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minPP', 'maxPP');

  const handlePriorityRange = rangeSelect<MoveSearchVars>(queryVars, setQueryVars, 'minPriority', 'maxPriority');

  // TODO: bypass accuracy

  const handleCategorySelect = listToggleValue<MoveSearchVars, MoveCategory>(queryVars, setQueryVars, 'category');

  const handleTypeSelect = listToggleValue<MoveSearchVars, EnumTypeName>(queryVars, setQueryVars, 'types');

  const handleTargetClassSelect = listToggleValue<MoveSearchVars, MoveTargetClass>(queryVars, setQueryVars, 'target');

  // TODO: variable power

  return (
    <form>
      <SearchBar
        title={`Search moves by name`}
        placeholder={`Search moves`}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        backgroundLight="blue"
      />
    </form>
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
  const [queryVars, filterForm] = useListFilter_removal<MoveSearchVars>(
    {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 10,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),

      maxAccuracy: 100,
      minAccuracy: 0,
      maxPower: 999,
      minPower: 0,
      maxPP: 64,
      minPP: 0,
      maxPriority: 7,
      minPriority: -7,

      bypassAccuracy: null,
      category: Array.from(MOVE_CATEGORY_MAP.keys()),
      target: Array.from(MOVE_TARGETCLASS_MAP.keys()),
      types: Array.from(TYPE_NAMES.map(toEnumTypeName)),
      variablePower: null,
    },
    filters.genFilter,
    listFilter,
  );

  const results = useListRender_removal_icons<MoveSearchQuery, MoveSearchVars>(
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
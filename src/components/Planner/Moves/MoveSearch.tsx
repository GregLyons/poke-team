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
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { ListFilterArgs, ListRenderArgsIcons, listToggleValue, rangeSelect } from '../helpers';
import { Dispatches, Filters } from '../../App';
import EntitySearchMainIcons from '../Searches/EntitySearchMainIcons';
import { MoveCategory, MOVE_CATEGORY_MAP, MOVE_TARGETCLASS_MAP, toEnumTypeName } from '../../../types-queries/helpers';
import { TYPE_NAMES } from '../../../hooks/App/PokemonFilter';
import SearchBar from '../../Reusables/SearchBar/SearchBar';

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
  // TODO: volatility

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
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useRemovalConnectedSearchVars<MoveSearchVars>(
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
  );

  return (
    <>
      <EntitySearchMainIcons
        entityPluralString='moves'
        dispatches={dispatches}
        filters={filters}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        searchMode={searchMode}
        handleSearchModeChange={handleSearchModeChange}
        listRender={listRender}
        query={MOVE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default MoveSearch;
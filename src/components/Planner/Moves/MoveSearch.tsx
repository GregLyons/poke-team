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
import { ListRenderArgsIcons } from '../helpers';
import { Dispatches, Filters } from '../../App';
import EntitySearchMainIcons from '../Searches/EntitySearchMainIcons';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  
  return (
    <>
      {data.moves.map((moveSearchResult: MoveSearchResult) => {
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
    },
    filters.genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      contains: e.target.value,
    });
  }

  return (
    <>
      <EntitySearchMainIcons
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
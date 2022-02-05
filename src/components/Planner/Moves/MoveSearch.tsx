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
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingPokemonFilterError,
  MissingTierFilterError,
} from '../helpers';

import { TeamAction } from '../../../hooks/App/Team';
import { CartAction } from '../../../hooks/App/Cart';
import { GenFilter, removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { PokemonFilter } from '../../../hooks/App/PokemonFilter';

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import {
  ENUMCASE_TO_TITLECASE,
} from '../../../utils/constants';
import { TierFilter } from "../../../hooks/App/TierFilter";
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { BGAction } from '../../../hooks/App/BGManager';

const listRender = ({ data, dispatchCart, dispatchTeam, dispatchBGManager, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  if (!dispatchCart || !dispatchTeam || !dispatchBGManager) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntitySearchMain component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed pokemonFilter to the EntitySearchMain component.');
  
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
                typeIconDatum: move.typeIconDatum,
                dispatchCart,
                dispatchTeam,
                dispatchBGManager,
                genFilter,
                tierFilter,
                pokemonFilter,
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
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  dispatchBGManager: React.Dispatch<BGAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const MoveSearch = ({
  dispatchCart,
  dispatchTeam,
  dispatchBGManager,
  genFilter,
  tierFilter,
  pokemonFilter,
}: MoveSearchProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<MoveSearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    },
    genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }

  return (
    <>
      <EntitySearchMain 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        dispatchBGManager={dispatchBGManager}
        genFilter={genFilter}
        tierFilter={tierFilter}
        pokemonFilter={pokemonFilter}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={MOVE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default MoveSearch;
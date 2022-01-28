import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  MoveSearchQuery,
  MoveSearchResult,
  MoveSearchVars,
  MoveInSearch,

  MOVE_SEARCH_QUERY,
} from '../../../../types-queries/Planner/Move';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';
import {
  ListRenderArgs,
  MissingDispatchError,
  MissingGenError,
  MissingPokemonFilterError,
  MissingTierFilterError,
} from '../helpers';

import { 
  CartAction,
  GenFilter,
  PokemonFilter,
  removedFromBDSP,
  removedFromSwSh,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';
import {
  ENUMCASE_TO_TITLECASE,
} from '../../../../utils/constants';
import {
  TierFilter,
} from '../../../../utils/smogonLogic';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../../hooks/planner-hooks';

const listRender = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
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
              genFilter={genFilter}
              entityClass="Move"
              key={'moveEntry_' + move.id}
              name={move.formattedName}
              linkName={move.name}
              description={move.description}
              data={[
                {
                  key: 'Accuracy', value: move.accuracy === 0 ? '--' : move.accuracy,
                },
                {
                  key: 'Category', value: ENUMCASE_TO_TITLECASE(move.category),
                },
                {
                  key: 'Contact', value: move.contact ? 'Yes' : 'No'
                },
                {
                  key: 'Power', value: move.power,
                },
                {
                  key: 'PP', value: move.pp === 0 ? '--': move.pp,
                },
                {
                  key: 'Priority', value: move.priority,
                },
                {
                  key: 'Target', value: ENUMCASE_TO_TITLECASE(move.target),
                },
              ]}
              icons={{
                pokemonIconData: move.pokemonIconData,
                typeIconDatum: move.typeIconDatum,
                dispatchCart,
                dispatchTeam,
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
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const MoveSearch = ({
  dispatchCart,
  dispatchTeam,
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
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
  MissingTierFilterError,
} from '../helpers';

import { 
  CartAction,
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

const listRender = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the EntitySearchMain component.');
  
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
                gen,
                tierFilter,
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
  gen: GenerationNum
  tierFilter: TierFilter
}

const MoveSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: MoveSearchProps) => {
  const [queryVars, setQueryVars] = useState<MoveSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: MoveSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
        tierFilter={tierFilter}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={MOVE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default MoveSearch;
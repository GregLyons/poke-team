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
} from '../../../../types-queries/Move';

import MoveEntry from './MoveEntry';
import EntitySearchMain from '../EntitySearchMain';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';
import { 
  CartAction,
  TeamAction,
} from "../../../App";
import {
  ListRenderArgs, MissingDispatchError,
} from '../entityListRender';

const listRender = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.')
  
  return (
    <>
      {data.moves.map((move: MoveSearchResult) => (
          <>
            <MoveEntry 
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              key={'moveEntry_' + move.id}
              move={new MoveInSearch(move)} 
            />
          </>
        ))}
    </>
  );
}

type MoveSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const MoveSearchMain = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: MoveSearchMainProps) => {
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
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={MOVE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default MoveSearchMain;
import {
  useContext, useState,
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
import { GenerationNum } from '../../../../types-queries/Generation';

const listRender = (data: MoveSearchQuery) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  
  return (
    <>
      {data.moves.map((move: MoveSearchResult) => (
          <>
            <MoveEntry 
              key={'moveEntry_' + move.id}
              move={new MoveInSearch(move)} 
            />
          </>
        ))}
    </>
  );
}

type MoveSearchMainProps = {
  gen: GenerationNum
}

const MoveSearchMain = ({ gen }: MoveSearchMainProps) => {
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
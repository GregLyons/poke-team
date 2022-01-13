import {
  useContext, useState,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import {
  GenContext,
} from '../../../../contexts';

import {
  MoveSearchQuery,
  MoveSearchResult,
  MoveSearchVars,
  MoveInSearch,

  MOVE_SEARCH_QUERY,
} from '../../../../types-queries/Move';

import MoveEntry from './MoveEntry';
import EntitySearchMain from '../EntitySearchMain';

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
const MoveSearchMain = () => {
  const { gen } = useContext(GenContext);

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
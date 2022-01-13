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
  MoveSearchQueryVars,
  MOVE_SEARCH_QUERY,
} from './moveQueries';

import {
  MoveSearchResult,
  MoveSearchQueryResult,
} from '../../../../typeDefs/Move';

import MoveEntry from './MoveEntry';
import EntitySearchMain from '../EntitySearchMain';

const listRender = (data: MoveSearchQuery) => {
  return (
    <>
      {data.moves.map((move: MoveSearchQueryResult) => (
          <>
            <MoveEntry 
              key={'moveEntry_' + move.id}
              move={new MoveSearchResult(move)} 
            />
          </>
        ))}
    </>
  );
}
const MoveSearchMain = () => {
  const { gen } = useContext(GenContext);

  const [queryVars, setQueryVars] = useState<MoveSearchQueryVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: MoveSearchQueryVars) => void = (newQueryVars) => {
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
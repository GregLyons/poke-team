import {
  useContext, useState,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import { DocumentNode } from 'graphql';

import {
  GenContext,
  TeamContext,
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
import MoveSearchMainControls from './MoveSearchMainControls';

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
  const [queryVars, setQueryVars] = useState({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: any) => void = (newQueryVars) => {
    setQueryVars({
      ...queryVars,
      gen: gen,
      ...newQueryVars,
    });
  }

  const sampleQuery: MoveSearchQuery = { moves: [] };
  return (
    <>  
      <div></div>
      <EntitySearchMain 
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={MOVE_SEARCH_QUERY}
        queryVars={queryVars}
        sampleQuery={sampleQuery}
      />
      <Outlet />
    </>
  );
};

export default MoveSearchMain;
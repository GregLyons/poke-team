import {
  useContext,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import { DocumentNode } from 'graphql';

import {
  TeamContext,
} from '../../../../contexts';

import {
  MoveSearchQuery,
  MOVE_SEARCH_QUERY,
} from './moveQueries';

import {
  MoveSearchResult,
  MoveSearchQueryResult,
} from '../../../../typeDefs/Move';

import MoveEntry from './MoveEntry';
import EntitySearchMain from '../EntitySearchMain';
import MoveSearchMainControls from './MoveSearchMainControls';

const listRender: (data: MoveSearchQuery) => JSX.Element = (data) => {
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
  
  return (
    <>  
      <EntitySearchMain 
        controls={MoveSearchMainControls()}
        query={MOVE_SEARCH_QUERY}
        listRender={listRender}
      />
      <Outlet />
    </>
  );
};

export default MoveSearchMain;
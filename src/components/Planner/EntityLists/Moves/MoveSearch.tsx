// React and contexts
// #region

import {
  useContext,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import {
  TeamContext,
} from '../../../../contexts';

// #endregion

// Apollo
// #region

import {
  MOVE_SEARCH_QUERY,
} from './moveQueries';

// #endregion

// Types
// #region

import {
  Move,
  MoveGQLResult,
} from '../../../../typeDefs/Move';

// #endregion

// Components
// #region

import MoveEntry from './MoveEntry';
import EntitySearch from '../../../EntitySearch';

// #endregion



const MoveSearch = () => {
  const { addToTeam } = useContext(TeamContext);
  
  return (
    <>   
      <EntitySearch 
        query={MOVE_SEARCH_QUERY}
        keyName={'moves'}
        listRender={(move: MoveGQLResult) => (
          <>
            <MoveEntry 
              key={'moveEntry_' + move.id} 
              addToTeam={addToTeam}
              move={new Move(move)} 
            />
          </>
          )}
      />
      <Outlet />
    </>
  );
};

export default MoveSearch;
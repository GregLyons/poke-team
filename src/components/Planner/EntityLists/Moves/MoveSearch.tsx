// React and contexts
// #region

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  Outlet,
  useSearchParams,
} from 'react-router-dom';

import {
  GenContext,
  TeamContext,
} from '../../../../contexts';

// #endregion

// Apollo
// #region

import {
  useLazyQuery,
} from '@apollo/client';
import {
  MOVE_SEARCH_QUERY,
} from './queries';

// #endregion

// Types
// #region

import { Pokemon } from '../../../../typeDefs/Pokemon';
import {
  Move,
  MoveGQLResult,
} from '../../../../typeDefs/Move';

// #endregion

// Components
// #region

import MoveEntry from './MoveEntry';
import { stringToGenNumber } from '../../../../typeDefs/Generation';
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
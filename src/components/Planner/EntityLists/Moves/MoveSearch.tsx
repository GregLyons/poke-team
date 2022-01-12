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
  MoveInSearch,
  MoveSearchResult,
} from '../../../../typeDefs/Move';

// #endregion

// Components
// #region

import MoveEntry from './MoveEntry';
import EntitySearchWithSearchParams, { EntitySearchOnEntityPage } from '../EntitySearch';
import { DocumentNode } from 'graphql';
import { StringLiteralLike } from 'typescript';

// #endregion

type MoveSearchProps = {
  entityName?: string
  isMainSearchPage: boolean
  keyName?: string
  query: DocumentNode
}

const MoveSearch = ({
  entityName,
  isMainSearchPage,
  keyName,
  query,
}: MoveSearchProps) => {
  const { addToTeam } = useContext(TeamContext);
  return (
    <>  
      {isMainSearchPage
        ? <EntitySearchWithSearchParams 
            query={query}
            keyName={'moves'}
            listRender={(move: MoveSearchResult) => (
              <>
                <MoveEntry 
                  key={'moveEntry_' + move.id} 
                  addToTeam={addToTeam}
                  move={new MoveInSearch(move)} 
                />
              </>
            )}
          />
        : ''
      }
      <Outlet />
    </>
  );
};

type MoveSearchPageProps = {
  entityName: string
  query: DocumentNode
  queryName: string
  searchKeyName: string
}

export const MoveSearchPage = ({
  entityName,
  queryName,
  query,
  searchKeyName,
}: MoveSearchPageProps) => {
  const { addToTeam } = useContext(TeamContext);
  return (
    <>
      <EntitySearchOnEntityPage 
        pageEntityName={entityName}
        query={query}
        queryName={queryName}
        searchKeyName={searchKeyName}
        listRender={(move: MoveSearchResult) => (
          <>
            <MoveEntry 
              key={'moveEntry_' + move.id} 
              addToTeam={addToTeam}
              move={new MoveInSearch(move)} 
            />
          </>
        )}
      />
      <Outlet />
    </>
  );
};

export default MoveSearch;
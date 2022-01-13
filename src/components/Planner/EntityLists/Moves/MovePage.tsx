import {
  useContext, useMemo, useState,
} from 'react';

import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';

import {
  useQuery
} from '@apollo/client';

import {
  MOVE_PAGE_QUERY,
  MovePageQuery,
  MovePageQueryVars,
  MOVE_PAGE_EFFECTS_QUERY,
  MovePageEffectQueryVars,
  MovePageEffectQuery,
} from './moveQueries';

import { GenContext } from '../../../../contexts';
import EntitySearchPage from '../EntitySearchPage';
import { EffectGQLResult } from '../../../../types-queries/Effect';

function changeHandler<QueryVars>(setQueryVars: React.Dispatch<React.SetStateAction<QueryVars>>): (x: QueryVars) => void {
  return setQueryVars;
}

function useChangeHandler<QueryVars>(defaultQueryVars: QueryVars): [QueryVars, (newQueryVars: QueryVars) => void] {
  const [queryVars, setQueryVars] = useState<QueryVars>(defaultQueryVars);
  
  return [queryVars, changeHandler<QueryVars>(setQueryVars)];
}

const listRender = (data: MovePageEffectQuery) => {
  return (
    {data.effects.edges.map()}
  )
}

const MovePage = () => {
  const params = useParams();

  const { gen } = useContext(GenContext);
  
  const moveName = params.moveId || '';

  const [effectQueryVars, handleChangeEffect] = useChangeHandler<MovePageEffectQueryVars>({
    gen: gen,
    name: moveName,
    limit: 5,
  });

  const { loading, error, data } = useQuery(
    MOVE_PAGE_QUERY,
    {
      variables: {
        gen: gen,
        name: moveName,
      }
    }
  );

  if (loading) return (
    <div>
      Loading...
    </div>
  );
  if (error) return (
    <div>
      Error! {error.message}
    </div>
  ); 
  // Happens when gen counter is brought below when the move was introduced.
  if (data.moveByName.length === 0) return (
    <div>
      This move doesn't exist in Generation {gen}.
    </div>
  )
  
  const result = data.moveByName[0];
  return (
    <>
      <EntitySearchPage
        handleChange={handleChangeEffect}
        listRender={effectListRender}
        query={MOVE_PAGE_EFFECTS_QUERY}
        queryVars={effectQueryVars}
      />
      <Outlet />
    </>
  );
}

export default MovePage;
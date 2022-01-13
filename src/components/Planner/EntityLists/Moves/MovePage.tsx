import {
  useContext,
} from 'react';

import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';

import {
  useQuery,
} from '@apollo/client';

import {
  GenContext,
} from '../../../../contexts';

import EntityConnectionSearch, { useEntityConnectionChangeHandler, } from '../EntityConnectionSearch';

import {
  MOVE_PAGE_QUERY,
  MOVE_EFFECT_QUERY,

  MovePageResult,
  MovePageQuery,
  MovePageQueryVars,
  MoveEffectQuery,
  MoveEffectQueryVars,
  MoveEffectResult,
  MoveEffectEdge,
} from '../../../../types-queries/Move';

const listRenderMoveEffect = (data: MoveEffectQuery) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  return (
    <>
      {data.moveByName[0].effects.edges.map((effectEdge: MoveEffectEdge) => (
        <>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </>
      ))}
    </>
  )
}

const MovePage = () => {
  const params = useParams();

  const { gen } = useContext(GenContext);
  
  const moveName = params.moveId || '';

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<MoveEffectQueryVars>({
    gen: gen,
    name: moveName,
    startsWith: '',
  });

  const { loading, error, data } = useQuery<MovePageQuery, MovePageQueryVars>(
    MOVE_PAGE_QUERY,
    {
      variables: {
        gen: gen,
        name: moveName,
      }
    }
  );
  
  if (!data || !data.moveByName) return (
    <div>
      Data not found for '{moveName}'.
    </div>
  );
  if (!data.moveByName) return (
    <div>
      'moveByName' is not a valid query for '{moveName}'.
    </div>
  )
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

  const moveResult = data.moveByName[0];

  // Happens when gen counter is brought below when the move was introduced.
  if (moveResult.introduced.edges[0].node.number > gen) return (
    <div>
      {moveResult.formattedName} doesn't exist in Generation {gen}.
    </div>
  )

  return (
    <>
      <h1>{moveResult.formattedName}</h1>

      <h2>Effects</h2>
      <EntityConnectionSearch
        handleChange={handleChangeEffect}
        listRender={listRenderMoveEffect}
        query={MOVE_EFFECT_QUERY}
        queryVars={effectQueryVars}
      />
      <Outlet />
    </>
  );
}

export default MovePage;
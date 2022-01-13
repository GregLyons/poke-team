import {
  useContext, useRef,
} from 'react';

import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';

import {
  useLazyQuery,
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
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';

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
    
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const debutGen = useRef<number>(0);
  
  const [executeSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('moveByName'));

  console.log('yo');
  if (debutGen.current === 0) {
    executeSearch({
      variables: {
        gen: gen,
        name: moveName,
      }
    });

    // 
    debutGen.current = Number.MAX_SAFE_INTEGER;
  }
  console.log('rendering');
  if (!data_introduced || !data_introduced.moveByName || (data_introduced.moveByName.length === 0)) return (
    <div>
      Data not found for '{moveName}'.
    </div>
  );
  if (!data_introduced.moveByName) return (
    <div>
      'moveByName' is not a valid query for '{moveName}'.
    </div>
  )
  
  if (loading_introduced) return (
    <div>
      Loading...
    </div>
  );
  
  if (error_introduced) return (
    <div>
      Error for introduction query! {error_introduced.message}
    </div>
  ); 
  const introductionResult = data_introduced.moveByName[0];
  debutGen.current = introductionResult.introduced.edges[0].node.number

  if (debutGen.current > gen) return (
    <div>
      {moveName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the move exists in this gen, we check the actual data
  // # region
  
  if (!data || !data.moveByName || data.moveByName.length === 0) return (
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
  
  // #endregion

  const moveResult = data.moveByName[0];
  
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
import {
  useContext, useEffect, useRef,
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
  EntityPageQueryName,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';

const listRenderMoveEffect = (data: MoveEffectQuery) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  return (
    <>
      {data.moveByName[0].effects.edges.map((effectEdge: MoveEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
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
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<MovePageQuery, MovePageQueryVars>(
  MOVE_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: gen,
        name: moveName,
      }
    })
  }, [gen, moveName, executeSearch]);
    
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('moveByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: moveName,
      }
    });
  }, [])

  if (loading_introduced) {
    console.log('loading debut');
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error_introduced) {
    console.log('error debut');
    return (
      <div>
        Error for introduction query! {error_introduced.message}
      </div>
    );
  } 

  if (!data_introduced || !data_introduced.moveByName || (data_introduced.moveByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{moveName}'.
    </div>
    );
  }

  const debutGen = data_introduced.moveByName[0].introduced.edges[0].node.number;

  if (debutGen > gen) return (
    <div>
      {moveName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the move exists in this gen, we check the actual data
  // # region

  if (loading) {
    console.log('loading');
    return (
      <div>
        Loading...
      </div>
    );
  }
  else if (error) {
    console.log('error');
    return (
      <div>
        Error! {error.message}
      </div>
    )
  }
  if (!data) {
    console.log('data not found');
    return (
      <div>
        Data not found for '{moveName}'.
      </div>
    );
  }
  else if (!data.moveByName) {
    console.log('invalid query');
    return (
      <div>
        'moveByName' is not a valid query for '{moveName}'.
      </div>
    );
  }
  else if (data.moveByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
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
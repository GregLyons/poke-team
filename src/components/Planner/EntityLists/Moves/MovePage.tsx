import {
  useEffect,
} from 'react';
import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';
import {
  useLazyQuery,
} from '@apollo/client';


import {
  MOVE_PAGE_QUERY,
  MOVE_EFFECT_QUERY,
  
  MovePageQuery,
  MovePageQueryVars,

  MoveEffectEdge,
  MoveEffectQuery,
  MoveEffectQueryVars,

  MoveFieldStateEdge,
  MoveFieldStateQuery,
  MoveFieldStateQueryVars,
  MOVE_FIELDSTATE_QUERY,
} from '../../../../types-queries/Move';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import { GenerationNum } from '../../../../types-queries/Generation';
import {
  ListRenderArgs,
  useEntityConnectionChangeHandler,
} from '../helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntityConnectionSearch from '../EntityConnectionSearch';

const listRenderMoveEffect = ({ data, }: ListRenderArgs<MoveEffectQuery>) => {
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

const listRenderMoveFieldState = ({ data, }: ListRenderArgs<MoveFieldStateQuery>) => {
  if (!data || !data.moveByName) return (<div>Data not found for the query 'moveByName'.</div>);

  const fieldStateEdges = data.moveByName[0].createsFieldState.edges
    .concat(data.moveByName[0].enhancedByFieldState.edges)
    .concat(data.moveByName[0].hinderedByFieldState.edges)
    .concat(data.moveByName[0].removesFieldState.edges);

  return (
    <>
      {fieldStateEdges.map((fieldStateEdge: MoveFieldStateEdge) => (
        <div>
          <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

type MovePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const MovePage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: MovePageProps) => {
  const params = useParams();
  
  const moveName = params.moveId || '';

  // Connections
  // #region
  
  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<MoveEffectQueryVars>({
    gen: gen,
    name: moveName,
    startsWith: '',
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<MoveFieldStateQueryVars>({
    gen: gen,
    name: moveName,
    startsWith: '',
  });

  // #endregion
  
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
        gen={gen}
        handleChange={handleChangeEffect}
        listRender={listRenderMoveEffect}
        query={MOVE_EFFECT_QUERY}
        queryVars={effectQueryVars}
      />

      <h2>FieldStates</h2>
      <EntityConnectionSearch
        gen={gen}
        handleChange={handleChangeFieldState}
        listRender={listRenderMoveFieldState}
        query={MOVE_FIELDSTATE_QUERY}
        queryVars={fieldStateQueryVars}
      />
      <Outlet />
    </>
  );
}

export default MovePage;
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
  ABILITY_PAGE_QUERY,
  ABILITY_EFFECT_QUERY,
  
  AbilityPageQuery,
  AbilityPageQueryVars,

  AbilityEffectEdge,
  AbilityEffectQuery,
  AbilityEffectQueryVars,

  AbilityFieldStateEdge,
  AbilityFieldStateQuery,
  AbilityFieldStateQueryVars,
  ABILITY_FIELDSTATE_QUERY,
  AbilityOnPage,
} from '../../../../types-queries/Ability';
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

const listRenderAbilityEffect = ({ data, }: ListRenderArgs<AbilityEffectQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  return (
    <>
      {data.abilityByName[0].effects.edges.map((effectEdge: AbilityEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

const listRenderAbilityFieldState = ({ data, }: ListRenderArgs<AbilityFieldStateQuery>) => {
  if (!data || !data.abilityByName) return (<div>Data not found for the query 'abilityByName'.</div>);

  const fieldStateEdges = data.abilityByName[0].activatedByFieldState.edges
    .concat(data.abilityByName[0].createsFieldState.edges)
    .concat(data.abilityByName[0].ignoresFieldState.edges)
    .concat(data.abilityByName[0].preventsFieldState.edges)
    .concat(data.abilityByName[0].removesFieldState.edges)
    .concat(data.abilityByName[0].suppressesFieldState.edges);

  return (
    <>
      {fieldStateEdges.map((fieldStateEdge: AbilityFieldStateEdge) => (
        <div>
          <Link to={`../fieldStates/${fieldStateEdge.node.name}`}>{fieldStateEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

type AbilityPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const AbilityPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: AbilityPageProps) => {
  const params = useParams();
  
  const abilityName = params.abilityId || '';
  
  // Connections
  // #region

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<AbilityEffectQueryVars>({
    gen: gen,
    name: abilityName,
    startsWith: '',
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<AbilityFieldStateQueryVars>({
    gen: gen,
    name: abilityName,
    startsWith: '',
  });

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<AbilityPageQuery, AbilityPageQueryVars>(
  ABILITY_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: gen,
        name: abilityName,
      }
    })
  }, [gen, abilityName, executeSearch]);
    
  // Before actually getting the ability data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('abilityByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: abilityName,
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

  if (!data_introduced || !data_introduced.abilityByName || (data_introduced.abilityByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{abilityName}'.
    </div>
    );
  }

  const debutGen = data_introduced.abilityByName[0].introduced.edges[0].node.number;

  if (debutGen > gen) return (
    <div>
      {abilityName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the ability exists in this gen, we check the actual data
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
        Data not found for '{abilityName}'.
      </div>
    );
  }
  else if (!data.abilityByName) {
    console.log('invalid query');
    return (
      <div>
        'abilityByName' is not a valid query for '{abilityName}'.
      </div>
    );
  }
  else if (data.abilityByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion
  const abilityResult = new AbilityOnPage(data.abilityByName[0]);
  
  return (
    <>
      <h1>{abilityResult.formattedName}</h1>

      {abilityResult.effectCount > 0 && <>
        <h2>Effects</h2>
        <EntityConnectionSearch
          gen={gen}
          handleChange={handleChangeEffect}
          listRender={listRenderAbilityEffect}
          query={ABILITY_EFFECT_QUERY}
          queryVars={effectQueryVars}
        />
      </>}
      
      {abilityResult.fieldStateCount > 0 && <>
        <h2>FieldStates</h2>
        <EntityConnectionSearch
          gen={gen}
          handleChange={handleChangeFieldState}
          listRender={listRenderAbilityFieldState}
          query={ABILITY_FIELDSTATE_QUERY}
          queryVars={fieldStateQueryVars}
        />
      </>}
      <Outlet />
    </>
  );
}

export default AbilityPage;
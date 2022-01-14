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
  ListRenderArgs,
  useEntityConnectionChangeHandler,
} from '../helpers';
import {
  EFFECT_PAGE_QUERY,
  EffectPageQuery,
  EffectPageQueryVars,

  EFFECT_ABILITY_QUERY,
  EffectAbilityQuery,
  EffectAbilityQueryVars,
  EffectAbilityEdge,

  EFFECT_ITEM_QUERY,
  EffectItemQuery,
  EffectItemQueryVars,
  EffectItemEdge,

  EFFECT_MOVE_QUERY,
  EffectMoveQuery,
  EffectMoveQueryVars,
  EffectMoveEdge,
  EffectOnPage,
  EffectFieldStateQuery,
  EffectFieldStateEdge,
  EFFECT_FIELDSTATE_QUERY,
  EffectFieldStateQueryVars,
} from '../../../../types-queries/Effect';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntityConnectionSearch from '../EntityConnectionSearch';
import EntityAccordion from '../EntityAccordion';
import { listRenderEffectAbility, listRenderEffectFieldState, listRenderEffectItem, listRenderEffectMove } from './EffectConnections';

type EffectPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const EffectPage = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: EffectPageProps) => {
  const params = useParams();
  
  const effectName = params.effectId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, handleChangeAbility] = useEntityConnectionChangeHandler<EffectAbilityQueryVars>({
    gen: gen,
    name: effectName,
    startsWith: '',
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<EffectFieldStateQueryVars>({
    gen: gen,
    name: effectName,
    startsWith: '',
  });

  const [itemQueryVars, handleChangeItem] = useEntityConnectionChangeHandler<EffectItemQueryVars>({
    gen: gen,
    name: effectName,
    startsWith: '',
  });

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<EffectMoveQueryVars>({
    gen: gen,
    name: effectName,
    startsWith: '',
  });

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<EffectPageQuery, EffectPageQueryVars>(
  EFFECT_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: gen,
        name: effectName,
      }
    })
  }, [gen, effectName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('effectByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: effectName,
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

  if (!data_introduced || !data_introduced.effectByName || (data_introduced.effectByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{effectName}'.
    </div>
    );
  }

  const debutGen = data_introduced.effectByName[0].introduced.edges[0].node.number;

  if (debutGen > gen) return (
    <div>
      {effectName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the effect exists in this gen, we check the actual data
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
  else if (!data) {
    console.log('data not found');
    return (
      <div>
        Data not found for '{effectName}'.
      </div>
    );
  }
  else if (!data.effectByName) {
    console.log('invalid query');
    return (
      <div>
        'effectByName' is not a valid query for '{effectName}'.
      </div>
    );
  }
  else if (data.effectByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const effectResult = new EffectOnPage(data.effectByName[0]);

  return (
    <>
      <h1>{effectResult.formattedName}</h1>
      <EntityAccordion 
        accordionData={[
          {
            title: `Abilities with '${effectResult.formattedName}'`,
            content: effectResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                handleChange={handleChangeAbility}
                listRender={listRenderEffectAbility}
                query={EFFECT_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: `Field states with '${effectResult.formattedName}'`,
            content: effectResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                handleChange={handleChangeFieldState}
                listRender={listRenderEffectFieldState}
                query={EFFECT_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: `Items with '${effectResult.formattedName}'`,
            content: effectResult.itemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                handleChange={handleChangeItem}
                listRender={listRenderEffectItem}
                query={EFFECT_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: `Moves with '${effectResult.formattedName}'`,
            content: effectResult.moveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                handleChange={handleChangeMove}
                listRender={listRenderEffectMove}
                query={EFFECT_MOVE_QUERY}
                queryVars={moveQueryVars}
              />
            </>,
          },
        ]}
      />
      

      
      
      
      
      
      <Outlet />
      
      {/* <EntityAccordion
        accordionData={accordionData}
      /> */}

      {/* Descriptions */}      
      {/* <h2>Descriptions</h2>

      {result.descriptions.edges.map((edge: any) => {
        return (
          <div key={edge.versionGroupCode}>
            {edge.versionGroupCode}: {edge.node.text}
          </div>
        );
      })} */}

      {/* Abilities */}
      {/* {result.abilities.count > 0 && (<h2>Abilities</h2>)} */}
      {/* {result.abilities.edges && result.abilities.edges.length > 0
        && result.abilities.edges.map((ability: any) => {
          return (
            <div key={'abilities_' + ability.node.id}>
              {ability.node.name}
            </div>
          )
        })
      } */}

      {/* Field States */}
      {/* {result.fieldStates.count > 0 
        && (<h2>Field States</h2>)} */}
      {/* {result.fieldStates.edges && result.fieldStates.edges.length > 0
        && result.fieldStates.edges.map((fieldState: any) => {
          return (
            <div key={'fieldState_' + fieldState.node.id}>
              {fieldState.node.name}
            </div>
          )
        })
      } */}

      {/* Items */}
      {/* {result.items.count > 0
        && (<h2>Items</h2>)} */}
      {/* {result.items.edges && result.items.edges.length > 0
        && result.items.edges.map((items: any) => {
          return (
            <div key={'items_' + items.node.id}>
              {items.node.name}
            </div>
          )
        })
      } */}

      {/* Moves */}
      {/* {result.moves.count > 0 
        && (<h2>Moves</h2>)}
      {result.moves.edges && result.moves.edges.length > 0
        && result.moves.edges.map((edge: any) => {
          return (
            <Link
              to={`../moves/${edge.node.name}`}
              key={'move_' + edge.node.id}
            >
              {edge.node.name}
            </Link>
          )
        })
      } */}
    </>
  );
}

export default EffectPage;
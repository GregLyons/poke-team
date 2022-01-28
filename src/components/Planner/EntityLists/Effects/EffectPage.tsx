import {
  useEffect,
} from 'react';
import {
  Outlet,
  useParams,
} from 'react-router-dom';
import {
  useLazyQuery,
} from '@apollo/client';

import {
  EFFECT_PAGE_QUERY,
  EffectPageQuery,
  EffectPageQueryVars,
  EffectOnPage,

  EFFECT_ABILITY_QUERY,
  EffectAbilityQueryVars,

  EFFECT_FIELDSTATE_QUERY,
  EffectFieldStateQueryVars,

  EFFECT_ITEM_QUERY,
  EffectItemQueryVars,

  EFFECT_MOVE_QUERY,
  EffectMoveQueryVars,
} from '../../../../types-queries/Planner/Effect';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import {
  TierFilter,
} from '../../../../utils/smogonLogic';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  GenFilter,
  removedFromBDSP,
  removedFromSwSh,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntityConnectionSearch from '../EntityConnectionSearch';
import ConnectionAccordion from '../ConnectionAccordion';
import { listRenderEffectAbility, listRenderEffectFieldState, listRenderEffectItem, listRenderEffectMove } from './EffectConnections';
import AuxEntityDescription from '../AuxEntityDescription';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../../hooks/planner-hooks';

type EffectPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const EffectPage = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: EffectPageProps) => {
  const params = useParams();
  
  const effectName = params.effectId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, setAbilityQueryVars] = useRemovalConnectedSearchVars<EffectAbilityQueryVars>({
    gen: genFilter.gen,
    name: effectName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [fieldStateQueryVars, setFieldStateQueryVars] = useGenConnectedSearchVars<EffectFieldStateQueryVars>({
    gen: genFilter.gen,
    name: effectName,
  }, genFilter);

  const [itemQueryVars, setItemQueryVars] = useGenConnectedSearchVars<EffectItemQueryVars>({
    gen: genFilter.gen,
    name: effectName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [moveQueryVars, setMoveQueryVars] = useGenConnectedSearchVars<EffectMoveQueryVars>({
    gen: genFilter.gen,
    name: effectName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<EffectPageQuery, EffectPageQueryVars>(
  EFFECT_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: effectName,
        removedFromSwSh: removedFromSwSh(genFilter),
        removedFromBDSP: removedFromBDSP(genFilter),
      }
    })
  }, [genFilter, effectName, executeSearch]);
      
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

  if (debutGen > genFilter.gen) return (
    <div>
      {effectName} doesn't exist in Generation {genFilter.gen}.
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
    <div className="planner__page">
      <h1 className="planner__page-header">{effectResult.formattedName}</h1>

      <AuxEntityDescription
        description={effectResult.description}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Abilities with '${effectResult.formattedName}'`,
            content: effectResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
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
                genFilter={genFilter}
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
                genFilter={genFilter}
                tierFilter={tierFilter}
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
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderEffectMove}
                query={EFFECT_MOVE_QUERY}
                queryVars={moveQueryVars}
              />
            </>,
          },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default EffectPage;
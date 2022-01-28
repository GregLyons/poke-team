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
  FIELDSTATE_PAGE_QUERY,
  FieldStatePageQuery,
  FieldStatePageQueryVars,
  FieldStateOnPage,

  FIELDSTATE_ABILITY_QUERY,
  FieldStateAbilityQueryVars,

  FIELDSTATE_EFFECT_QUERY,
  FieldStateEffectQueryVars,

  FIELDSTATE_ITEM_QUERY,
  FieldStateItemQueryVars,

  FIELDSTATE_MOVE_QUERY,
  FieldStateMoveQueryVars,

  FIELDSTATE_STAT_QUERY,
  FieldStateStatQueryVars,

  FIELDSTATE_STATUS_QUERY,
  FieldStateStatusQueryVars,

  FIELDSTATE_TYPE_QUERY,
  FieldStateTypeQueryVars,
} from '../../../../types-queries/Planner/FieldState';
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
import {
  listRenderFieldStateAbility,
  listRenderFieldStateEffect,
  listRenderFieldStateItem,
  listRenderFieldStateMove,
  listRenderFieldStateStat,
  listRenderFieldStateStatus,
  listRenderFieldStateType,
} from './FieldStateConnections';
import AuxEntityDescription from '../AuxEntityDescription';

import EntityConnectionSearch from '../EntityConnectionSearch';
import ConnectionAccordion from '../ConnectionAccordion';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../../hooks/planner-hooks';

type FieldStatePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const FieldStatePage = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: FieldStatePageProps) => {
  const params = useParams();
  
  const fieldStateName = params.fieldStateId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, setAbilityQueryVars] = useGenConnectedSearchVars<FieldStateAbilityQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
  }, genFilter);

  const [effectQueryVars, setEffectQueryVars] = useGenConnectedSearchVars<FieldStateEffectQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
  }, genFilter);

  const [itemQueryVars, setItemQueryVars] = useGenConnectedSearchVars<FieldStateItemQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
  }, genFilter);

  const [moveQueryVars, setMoveQueryVars] = useRemovalConnectedSearchVars<FieldStateMoveQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [statQueryVars, setStatQueryVars] = useGenConnectedSearchVars<FieldStateStatQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
  }, genFilter);

  const [statusQueryVars, setStatusQueryVars] = useGenConnectedSearchVars<FieldStateStatusQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
  }, genFilter);

  const [typeQueryVars, setTypeQueryVars] = useRemovalConnectedSearchVars<FieldStateTypeQueryVars>({
    gen: genFilter.gen,
    name: fieldStateName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<FieldStatePageQuery, FieldStatePageQueryVars>(
  FIELDSTATE_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: fieldStateName,
        removedFromSwSh: removedFromSwSh(genFilter),
        removedFromBDSP: removedFromBDSP(genFilter),
      }
    })
  }, [genFilter, fieldStateName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('fieldStateByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: fieldStateName,
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

  if (!data_introduced || !data_introduced.fieldStateByName || (data_introduced.fieldStateByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{fieldStateName}'.
    </div>
    );
  }

  const debutGen = data_introduced.fieldStateByName[0].introduced.edges[0].node.number;

  if (debutGen > genFilter.gen) return (
    <div>
      {fieldStateName} doesn't exist in Generation {genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the fieldState exists in this gen, we check the actual data
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
        Data not found for '{fieldStateName}'.
      </div>
    );
  }
  else if (!data.fieldStateByName) {
    console.log('invalid query');
    return (
      <div>
        'fieldStateByName' is not a valid query for '{fieldStateName}'.
      </div>
    );
  }
  else if (data.fieldStateByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const fieldStateResult = new FieldStateOnPage(data.fieldStateByName[0]);

  return (
    <div className="planner__page">
      <h1 className="planner__page-header">{fieldStateResult.formattedName}</h1>

      <AuxEntityDescription
        description={fieldStateResult.description}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Ability interactions with ${fieldStateResult.formattedName}`,
            content: fieldStateResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderFieldStateAbility}
                query={FIELDSTATE_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: `Effects of ${fieldStateResult.formattedName}`,
            content: fieldStateResult.effectCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                listRender={listRenderFieldStateEffect}
                query={FIELDSTATE_EFFECT_QUERY}
                queryVars={effectQueryVars}
              />
            </>,
          },
          {
            title: `Item interactions with ${fieldStateResult.formattedName}`,
            content: fieldStateResult.itemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderFieldStateItem}
                query={FIELDSTATE_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: `Move interactions with ${fieldStateResult.formattedName}`,
            content: fieldStateResult.moveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderFieldStateMove}
                query={FIELDSTATE_MOVE_QUERY}
                queryVars={moveQueryVars}
              />
            </>,
          },
          {
            title: `Stat interactions with ${fieldStateResult.formattedName}`,
            content: fieldStateResult.modifiesStatCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                listRender={listRenderFieldStateStat}
                query={FIELDSTATE_STAT_QUERY}
                queryVars={statQueryVars}
              />
            </>,
          },
          {
            title: `Status interactions with ${fieldStateResult.formattedName}`,
            content: fieldStateResult.statusCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                listRender={listRenderFieldStateStatus}
                query={FIELDSTATE_STATUS_QUERY}
                queryVars={statusQueryVars}
              />
            </>,
          },
          {
            title: `Type interactions with ${fieldStateResult.formattedName}`,
            content: fieldStateResult.typeCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderFieldStateType}
                query={FIELDSTATE_TYPE_QUERY}
                queryVars={typeQueryVars}
              />
            </>,
          },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default FieldStatePage;
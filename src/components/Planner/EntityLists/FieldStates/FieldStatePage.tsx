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
  useEntityConnectionChangeHandler,
} from '../helpers';
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
  TeamAction,
} from "../../../App";
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

type FieldStatePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const FieldStatePage = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: FieldStatePageProps) => {
  const params = useParams();
  
  const fieldStateName = params.fieldStateId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, handleChangeAbility] = useEntityConnectionChangeHandler<FieldStateAbilityQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<FieldStateEffectQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  const [itemQueryVars, handleChangeItem] = useEntityConnectionChangeHandler<FieldStateItemQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<FieldStateMoveQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  const [statQueryVars, handleChangeStat] = useEntityConnectionChangeHandler<FieldStateStatQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  const [statusQueryVars, handleChangeStatus] = useEntityConnectionChangeHandler<FieldStateStatusQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  const [typeQueryVars, handleChangeType] = useEntityConnectionChangeHandler<FieldStateTypeQueryVars>({
    gen: gen,
    name: fieldStateName,
  });

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<FieldStatePageQuery, FieldStatePageQueryVars>(
  FIELDSTATE_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: gen,
        name: fieldStateName,
      }
    })
  }, [gen, fieldStateName, executeSearch]);
      
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

  if (debutGen > gen) return (
    <div>
      {fieldStateName} doesn't exist in Generation {gen}.
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
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeAbility}
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
                gen={gen}
                handleChange={handleChangeEffect}
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
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeItem}
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
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeMove}
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
                gen={gen}
                handleChange={handleChangeStat}
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
                gen={gen}
                handleChange={handleChangeStatus}
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
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeType}
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
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
  STATUS_PAGE_QUERY,
  StatusPageQuery,
  StatusPageQueryVars,
  StatusOnPage,

  STATUS_ABILITY_QUERY,
  StatusAbilityQueryVars,

  STATUS_FIELDSTATE_QUERY,
  StatusFieldStateQueryVars,

  STATUS_ITEM_QUERY,
  StatusItemQueryVars,

  STATUS_MOVE_QUERY,
  StatusMoveQueryVars,
} from '../../../../types-queries/Planner/Status';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS, TierFilter,
} from '../../../../utils/constants';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntityConnectionSearch from '../EntityConnectionSearch';
import ConnectionAccordion from '../ConnectionAccordion';
import {
  listRenderStatusAbility,
  listRenderStatusFieldState,
  listRenderStatusItem,
  listRenderStatusMove
} from './StatusConnections';
import AuxEntityDescription from '../AuxEntityDescription';

type StatusPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const StatusPage = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: StatusPageProps) => {
  const params = useParams();
  
  const statusName = params.statusId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, handleChangeAbility] = useEntityConnectionChangeHandler<StatusAbilityQueryVars>({
    gen: gen,
    name: statusName,
  });

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<StatusFieldStateQueryVars>({
    gen: gen,
    name: statusName,
  });

  const [itemQueryVars, handleChangeItem] = useEntityConnectionChangeHandler<StatusItemQueryVars>({
    gen: gen,
    name: statusName,
  });

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<StatusMoveQueryVars>({
    gen: gen,
    name: statusName,
  });

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<StatusPageQuery, StatusPageQueryVars>(
  STATUS_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: gen,
        name: statusName,
      }
    })
  }, [gen, statusName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('statusByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: statusName,
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

  if (!data_introduced || !data_introduced.statusByName || (data_introduced.statusByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{statusName}'.
    </div>
    );
  }

  const debutGen = data_introduced.statusByName[0].introduced.edges[0].node.number;

  if (debutGen > gen) return (
    <div>
      {statusName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the status exists in this gen, we check the actual data
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
    console.log()
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
        Data not found for '{statusName}'.
      </div>
    );
  }
  else if (!data.statusByName) {
    console.log('invalid query');
    return (
      <div>
        'statusByName' is not a valid query for '{statusName}'.
      </div>
    );
  }
  else if (data.statusByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const statusResult = new StatusOnPage(data.statusByName[0]);

  return (
    <div className="planner__page">
      <h1 className="planner__page-header">{statusResult.formattedName}</h1>

      <AuxEntityDescription
        description={statusResult.description}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Ability interactions with ${statusResult.formattedName}`,
            content: statusResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeAbility}
                listRender={listRenderStatusAbility}
                query={STATUS_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: `Field state interactions with ${statusResult.formattedName}`,
            content: statusResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                handleChange={handleChangeEffect}
                listRender={listRenderStatusFieldState}
                query={STATUS_FIELDSTATE_QUERY}
                queryVars={effectQueryVars}
              />
            </>,
          },
          {
            title: `Item interactions with ${statusResult.formattedName}`,
            content: statusResult.itemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeItem}
                listRender={listRenderStatusItem}
                query={STATUS_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: `Move interactions with ${statusResult.formattedName}`,
            content: statusResult.moveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeMove}
                listRender={listRenderStatusMove}
                query={STATUS_MOVE_QUERY}
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

export default StatusPage;
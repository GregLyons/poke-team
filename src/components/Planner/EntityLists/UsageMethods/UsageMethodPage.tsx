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
  USAGEMETHOD_PAGE_QUERY,
  UsageMethodPageQuery,
  UsageMethodPageQueryVars,
  UsageMethodOnPage,

  USAGEMETHOD_ABILITY_QUERY,
  UsageMethodAbilityQueryVars,

  USAGEMETHOD_ITEM_QUERY,
  UsageMethodItemQueryVars,

  USAGEMETHOD_MOVE_QUERY,
  UsageMethodMoveQueryVars,
} from '../../../../types-queries/Planner/UsageMethod';
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
  TeamAction,
} from '../../../../hooks/app-hooks';
import {
  listRenderUsageMethodAbility,
  listRenderUsageMethodItem,
  listRenderUsageMethodMove,
} from './UsageMethodConnections';
import AuxEntityDescription from '../AuxEntityDescription';

import EntityConnectionSearch from '../EntityConnectionSearch';
import ConnectionAccordion from '../ConnectionAccordion';

type UsageMethodPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const UsageMethodPage = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: UsageMethodPageProps) => {
  const params = useParams();
  
  const usageMethodName = params.usageMethodId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, handleChangeAbility] = useEntityConnectionChangeHandler<UsageMethodAbilityQueryVars>({
    gen: genFilter.gen,
    name: usageMethodName,
  });
  const [itemQueryVars, handleChangeItem] = useEntityConnectionChangeHandler<UsageMethodItemQueryVars>({
    gen: genFilter.gen,
    name: usageMethodName,
  });

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<UsageMethodMoveQueryVars>({
    gen: genFilter.gen,
    name: usageMethodName,
  });

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<UsageMethodPageQuery, UsageMethodPageQueryVars>(
  USAGEMETHOD_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: usageMethodName,
      }
    })
  }, [genFilter, usageMethodName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('usageMethodByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: usageMethodName,
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

  if (!data_introduced || !data_introduced.usageMethodByName || (data_introduced.usageMethodByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{usageMethodName}'.
    </div>
    );
  }

  const debutGen = data_introduced.usageMethodByName[0].introduced.edges[0].node.number;

  if (debutGen > genFilter.gen) return (
    <div>
      {usageMethodName} doesn't exist in Generation {genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the usageMethod exists in this gen, we check the actual data
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
        Data not found for '{usageMethodName}'.
      </div>
    );
  }
  else if (!data.usageMethodByName) {
    console.log('invalid query');
    return (
      <div>
        'usageMethodByName' is not a valid query for '{usageMethodName}'.
      </div>
    );
  }
  else if (data.usageMethodByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const usageMethodResult = new UsageMethodOnPage(data.usageMethodByName[0]);

  return (
    <div className="planner__page">
      <h1 className="planner__page-header">{usageMethodResult.formattedName}</h1>

      <AuxEntityDescription
        description={usageMethodResult.description}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Ability interactions with ${usageMethodResult.formattedName}`,
            content: usageMethodResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                handleChange={handleChangeAbility}
                listRender={listRenderUsageMethodAbility}
                query={USAGEMETHOD_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: `Item interactions with ${usageMethodResult.formattedName}`,
            content: usageMethodResult.itemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                handleChange={handleChangeItem}
                listRender={listRenderUsageMethodItem}
                query={USAGEMETHOD_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: `Move interactions with ${usageMethodResult.formattedName}`,
            content: usageMethodResult.moveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                handleChange={handleChangeMove}
                listRender={listRenderUsageMethodMove}
                query={USAGEMETHOD_MOVE_QUERY}
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

export default UsageMethodPage;
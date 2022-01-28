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
  STAT_PAGE_QUERY,
  StatPageQuery,
  StatPageQueryVars,
  StatOnPage,

  STAT_ABILITY_QUERY,
  StatAbilityQueryVars,

  STAT_FIELDSTATE_QUERY,
  StatFieldStateQueryVars,

  STAT_ITEM_QUERY,
  StatItemQueryVars,

  STAT_MOVE_QUERY,
  StatMoveQueryVars,
} from '../../../../types-queries/Planner/Stat';
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
import { listRenderStatAbility, listRenderStatFieldState, listRenderStatItem, listRenderStatMove } from './StatConnections';
import AuxEntityDescription from '../AuxEntityDescription';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../../hooks/planner-hooks';

type StatPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const StatPage = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: StatPageProps) => {
  const params = useParams();
  
  const statName = params.statId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, setAbilityQueryVars] = useRemovalConnectedSearchVars<StatAbilityQueryVars>({
    gen: genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [fieldStateQueryVars, setFieldStateQueryVars] = useGenConnectedSearchVars<StatFieldStateQueryVars>({
    gen: genFilter.gen,
    name: statName,
  }, genFilter);

  const [itemQueryVars, setItemQueryVars] = useRemovalConnectedSearchVars<StatItemQueryVars>({
    gen: genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [moveQueryVars, setMoveQueryVars] = useRemovalConnectedSearchVars<StatMoveQueryVars>({
    gen: genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<StatPageQuery, StatPageQueryVars>(
  STAT_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: statName,
        removedFromSwSh: removedFromSwSh(genFilter),
        removedFromBDSP: removedFromBDSP(genFilter),
      }
    })
  }, [genFilter, statName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('statByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: statName,
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

  if (!data_introduced || !data_introduced.statByName || (data_introduced.statByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{statName}'.
    </div>
    );
  }

  const debutGen = data_introduced.statByName[0].introduced.edges[0].node.number;

  if (debutGen > genFilter.gen) return (
    <div>
      {statName} doesn't exist in Generation {genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the stat exists in this gen, we check the actual data
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
        Data not found for '{statName}'.
      </div>
    );
  }
  else if (!data.statByName) {
    console.log('invalid query');
    return (
      <div>
        'statByName' is not a valid query for '{statName}'.
      </div>
    );
  }
  else if (data.statByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const statResult = new StatOnPage(data.statByName[0]);

  return (
    <div className="planner__page">
      <h1 className="planner__page-header">{statResult.formattedName}</h1>

      <AuxEntityDescription
        description={statResult.description}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Abilities with '${statResult.formattedName}'`,
            content: statResult.modifiedByAbilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderStatAbility}
                query={STAT_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: `Field states with '${statResult.formattedName}'`,
            content: statResult.modifiedByFieldStateCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                listRender={listRenderStatFieldState}
                query={STAT_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: `Items with '${statResult.formattedName}'`,
            content: statResult.modifiedByItemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderStatItem}
                query={STAT_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: `Moves with '${statResult.formattedName}'`,
            content: statResult.modifiedByMoveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                listRender={listRenderStatMove}
                query={STAT_MOVE_QUERY}
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

export default StatPage;
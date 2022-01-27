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
  ABILITY_PAGE_QUERY,
  AbilityPageQuery,
  AbilityPageQueryVars,
  AbilityOnPage,
  
  ABILITY_EFFECT_QUERY,
  AbilityEffectQueryVars,

  ABILITY_FIELDSTATE_QUERY,
  AbilityFieldStateQueryVars,

  ABILITY_STAT_QUERY,
  AbilityStatQueryVars,

  ABILITY_STATUS_QUERY,
  AbilityStatusQueryVars,

  ABILITY_TYPE_QUERY,
  AbilityTypeQueryVars,

  ABILITY_USAGEMETHOD_QUERY,
  AbilityUsageMethodQueryVars,
} from '../../../../types-queries/Planner/Ability';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import { GenerationNum } from '../../../../types-queries/helpers';
import {
  useEntityConnectionChangeHandler,
} from '../helpers';
import {
  listRenderAbilityEffect,
  listRenderAbilityFieldState,
  listRenderAbilityStat,
  listRenderAbilityStatus,
  listRenderAbilityType,
  listRenderAbilityUsageMethod,
} from './AbilityConnections';

import { 
  CartAction,
  GenFilter,
  removedFromBDSP,
  removedFromSwSh,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntityConnectionSearch from '../EntityConnectionSearch';
import ConnectionAccordion from '../ConnectionAccordion';
import MainEntityDescriptionTable from '../MainEntityDescriptionTable';

type AbilityPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
}

const AbilityPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: AbilityPageProps) => {
  const params = useParams();
  
  const abilityName = params.abilityId || '';
  
  // Connections
  // #region

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<AbilityEffectQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<AbilityFieldStateQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  });

  const [statQueryVars, handleChangeStat] = useEntityConnectionChangeHandler<AbilityStatQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  });

  const [statusQueryVars, handleChangeStatus] = useEntityConnectionChangeHandler<AbilityStatusQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  });

  const [typeQueryVars, handleChangeType] = useEntityConnectionChangeHandler<AbilityTypeQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  });

  const [usageMethodQueryVars, handleChangeUsageMethod] = useEntityConnectionChangeHandler<AbilityUsageMethodQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  });

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<AbilityPageQuery, AbilityPageQueryVars>(
  ABILITY_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: abilityName,
      }
    })
  }, [genFilter, abilityName, executeSearch]);
    
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

  if (debutGen > genFilter.gen) return (
    <div>
      {abilityName} doesn't exist in Generation {genFilter.gen}.
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
    <div className="planner__page">
      <h1 className="planner__page-header">{abilityResult.formattedName}</h1>

      <MainEntityDescriptionTable
        descriptions={abilityResult.descriptions}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Effects of ${abilityResult.formattedName}`,
            content: abilityResult.effectCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                handleChange={handleChangeEffect}
                listRender={listRenderAbilityEffect}
                query={ABILITY_EFFECT_QUERY}
                queryVars={effectQueryVars}
              />
            </>,
          },
          {
            title: `Field state interactions with ${abilityResult.formattedName}`,
            content: abilityResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                handleChange={handleChangeFieldState}
                listRender={listRenderAbilityFieldState}
                query={ABILITY_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: `Stat interactions with ${abilityResult.formattedName}`,
            content: abilityResult.modifiesStatCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                handleChange={handleChangeStat}
                listRender={listRenderAbilityStat}
                query={ABILITY_STAT_QUERY}
                queryVars={statQueryVars}
              />
            </>,
          },
          {
            title: `Status interactions with ${abilityResult.formattedName}`,
            content: abilityResult.statusCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                handleChange={handleChangeStatus}
                listRender={listRenderAbilityStatus}
                query={ABILITY_STATUS_QUERY}
                queryVars={statusQueryVars}
              />
            </>,
          },
          {
            title: `Type interactions with ${abilityResult.formattedName}`,
            content: abilityResult.typeCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                handleChange={handleChangeType}
                listRender={listRenderAbilityType}
                query={ABILITY_TYPE_QUERY}
                queryVars={typeQueryVars}
              />
            </>,
          },
          {
            title: `Usage method interactions with ${abilityResult.formattedName}`,
            content: abilityResult.usageMethodCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                handleChange={handleChangeUsageMethod}
                listRender={listRenderAbilityUsageMethod}
                query={ABILITY_USAGEMETHOD_QUERY}
                queryVars={usageMethodQueryVars}
              />
            </>,
          },
        ]} 
      />
      <Outlet />
    </div>
  );
}

export default AbilityPage;
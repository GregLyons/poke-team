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
} from '../../../types-queries/Planner/Ability';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../utils/constants';
import { GenerationNum } from '../../../types-queries/helpers';
import {
  listRenderAbilityEffect,
  listRenderAbilityFieldState,
  listRenderAbilityStat,
  listRenderAbilityStatus,
  listRenderAbilityType,
  listRenderAbilityUsageMethod,
} from './AbilityConnections';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import MainEntityDescriptionTable from '../Pages/MainEntityDescriptionTable';
import Accordion from '../../Reusables/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { TeamAction } from '../../../hooks/App/Team';
import { CartAction } from '../../../hooks/App/Cart';
import { GenFilter, removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { PokemonFilter } from '../../../hooks/App/PokemonFilter';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { TierFilter } from '../../../hooks/App/TierFilter';

type AbilityPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const AbilityPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: AbilityPageProps) => {
  const params = useParams();
  
  const abilityName = params.abilityId || '';
  
  // Connections
  // #region

  const [effectQueryVars, handleChangeEffect] = useGenConnectedSearchVars<AbilityEffectQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  }, genFilter);

  const [fieldStateQueryVars, handleChangeFieldState] = useGenConnectedSearchVars<AbilityFieldStateQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  }, genFilter);

  const [statQueryVars, handleChangeStat] = useGenConnectedSearchVars<AbilityStatQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  }, genFilter);

  const [statusQueryVars, handleChangeStatus] = useGenConnectedSearchVars<AbilityStatusQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  }, genFilter);

  const [typeQueryVars, handleChangeType] = useRemovalConnectedSearchVars<AbilityTypeQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
  }, genFilter);

  const [usageMethodQueryVars, handleChangeUsageMethod] = useGenConnectedSearchVars<AbilityUsageMethodQueryVars>({
    gen: genFilter.gen,
    name: abilityName,
  }, genFilter);

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

      <Accordion
        accordionContext='planner'
        accordionData={[
          {
            title: <ConnectionAccordionTitle
              titleText={`Effects of ${abilityResult.formattedName}`}
            />,
            content: abilityResult.effectCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderAbilityEffect}
                query={ABILITY_EFFECT_QUERY}
                queryVars={effectQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Field state interactions with ${abilityResult.formattedName}`}
            />,
            content: abilityResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderAbilityFieldState}
                query={ABILITY_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Stat interactions with ${abilityResult.formattedName}`}
            />,
            content: abilityResult.modifiesStatCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderAbilityStat}
                query={ABILITY_STAT_QUERY}
                queryVars={statQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Status interactions with ${abilityResult.formattedName}`}
            />,
            content: abilityResult.statusCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderAbilityStatus}
                query={ABILITY_STATUS_QUERY}
                queryVars={statusQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Type interactions with ${abilityResult.formattedName}`}
            />,
            content: abilityResult.typeCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                genFilter={genFilter}
                tierFilter={tierFilter}
                pokemonFilter={pokemonFilter}
                listRender={listRenderAbilityType}
                query={ABILITY_TYPE_QUERY}
                queryVars={typeQueryVars}
              />
            </>,
          },
          {
            title: <ConnectionAccordionTitle
              titleText={`Usage method interactions with ${abilityResult.formattedName}`}
            />,
            content: abilityResult.usageMethodCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
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
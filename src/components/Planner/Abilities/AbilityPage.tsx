import {
  Outlet,
  useParams,
} from 'react-router-dom';

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
  listRenderAbilityEffect,
  listRenderAbilityFieldState,
  listRenderAbilityStat,
  listRenderAbilityStatus,
  listRenderAbilityType,
  listRenderAbilityUsageMethod,
} from './AbilityConnections';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { Dispatches, Filters } from '../../App';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

type AbilityPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const AbilityPage = ({ 
  dispatches,
  filters,
}: AbilityPageProps) => {
  const params = useParams();
  
  const abilityName = params.abilityId || '';
  
  // Connections
  // #region

  const { queryVars: effectQueryVars, } = useGenConnectedSearchVars<AbilityEffectQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: abilityName,
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<AbilityFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: abilityName,
  }, genFilter: filters.genFilter});

  const { queryVars: statQueryVars, } = useGenConnectedSearchVars<AbilityStatQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: abilityName,
  }, genFilter: filters.genFilter});

  const { queryVars: statusQueryVars, } = useGenConnectedSearchVars<AbilityStatusQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: abilityName,
  }, genFilter: filters.genFilter});

  const { queryVars: typeQueryVars, } = useRemovalConnectedSearchVars<AbilityTypeQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: abilityName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: usageMethodQueryVars, } = useGenConnectedSearchVars<AbilityUsageMethodQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: abilityName,
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<AbilityPageQuery, AbilityPageQueryVars>(
  ABILITY_PAGE_QUERY,
    {
      gen: filters.genFilter.gen,
      name: abilityName,
    },
    abilityName,
  );

  const debutComponent = useDebutQuery(abilityName, 'Ability', filters.genFilter);

  if (debutComponent) return debutComponent;
  if (pageComponent) return pageComponent;

  if (!data?.abilityByName || !data.abilityByName[0]) return <div>Data not found for '{abilityName}'</div>;

  const abilityResult = new AbilityOnPage(data.abilityByName[0]);
  
  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{abilityResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Effects of ${abilityResult.formattedName}`}
              />,
              content: abilityResult.effectCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
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
                  genFilter={filters.genFilter}
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
                  genFilter={filters.genFilter}
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
                  genFilter={filters.genFilter}
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
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
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
                  genFilter={filters.genFilter}
                  listRender={listRenderAbilityUsageMethod}
                  query={ABILITY_USAGEMETHOD_QUERY}
                  queryVars={usageMethodQueryVars}
                />
              </>,
            },
          ]} 
        />
      </div>
      <Outlet />
    </div>
  );
}

export default AbilityPage;
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
} from '../../../types-queries/Planner/FieldState';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../utils/constants';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import {
  listRenderFieldStateAbility,
  listRenderFieldStateEffect,
  listRenderFieldStateItem,
  listRenderFieldStateMove,
  listRenderFieldStateStat,
  listRenderFieldStateStatus,
  listRenderFieldStateType,
} from './FieldStateConnections';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

type FieldStatePageProps = {
  dispatches: Dispatches
  filters: Filters
}

const FieldStatePage = ({
  dispatches,
  filters,
}: FieldStatePageProps) => {
  const params = useParams();
  
  const fieldStateName = params.fieldStateId || '';

  // Connection queries
  // #region 
  
  const { queryVars: abilityQueryVars, } = useGenConnectedSearchVars<FieldStateAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
  }, genFilter: filters.genFilter});

  const { queryVars: effectQueryVars, } = useGenConnectedSearchVars<FieldStateEffectQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, } = useGenConnectedSearchVars<FieldStateItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, } = useRemovalConnectedSearchVars<FieldStateMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: statQueryVars, } = useGenConnectedSearchVars<FieldStateStatQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
  }, genFilter: filters.genFilter});

  const { queryVars: statusQueryVars, } = useGenConnectedSearchVars<FieldStateStatusQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
  }, genFilter: filters.genFilter});

  const { queryVars: typeQueryVars, } = useRemovalConnectedSearchVars<FieldStateTypeQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: fieldStateName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion

  
  const { data, pageComponent, } = usePageQuery<FieldStatePageQuery, FieldStatePageQueryVars>(
    FIELDSTATE_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: fieldStateName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      fieldStateName,
    );
  
    const debutComponent = useDebutQuery(fieldStateName, 'Field state', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.fieldStateByName || !data?.fieldStateByName[0]) return <div>Data not found for '{fieldStateName}'</div>;
  

  const fieldStateResult = new FieldStateOnPage(data.fieldStateByName[0]);

  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{fieldStateResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Ability interactions with ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.abilityCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderFieldStateAbility}
                  query={FIELDSTATE_ABILITY_QUERY}
                  queryVars={abilityQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Effects of ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.effectCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderFieldStateEffect}
                  query={FIELDSTATE_EFFECT_QUERY}
                  queryVars={effectQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Item interactions with ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.itemCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderFieldStateItem}
                  query={FIELDSTATE_ITEM_QUERY}
                  queryVars={itemQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Move interactions with ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.moveCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderFieldStateMove}
                  query={FIELDSTATE_MOVE_QUERY}
                  queryVars={moveQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Stat interactions with ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.modifiesStatCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderFieldStateStat}
                  query={FIELDSTATE_STAT_QUERY}
                  queryVars={statQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Status interactions with ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.statusCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderFieldStateStatus}
                  query={FIELDSTATE_STATUS_QUERY}
                  queryVars={statusQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Type interactions with ${fieldStateResult.formattedName}`}
              />,
              content: fieldStateResult.typeCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderFieldStateType}
                  query={FIELDSTATE_TYPE_QUERY}
                  queryVars={typeQueryVars}
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

export default FieldStatePage;
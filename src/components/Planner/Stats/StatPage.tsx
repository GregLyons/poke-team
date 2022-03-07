import {
  Outlet,
  useParams,
} from 'react-router-dom';

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
} from '../../../types-queries/Planner/Stat';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { listRenderStatAbility, listRenderStatFieldState, listRenderStatItem, listRenderStatMove } from './StatConnections';
import { useGenConnectedSearchVars, useRemovalConnectedSearchBar, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

type StatPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const StatPage = ({
  dispatches,
  filters,
}: StatPageProps) => {
  const params = useParams();
  
  const statName = params.statId || '';

  // Connection queries
  // #region 
  
  const { queryVars: abilityQueryVars, } = useRemovalConnectedSearchVars<StatAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<StatFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, } = useRemovalConnectedSearchVars<StatItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, } = useRemovalConnectedSearchVars<StatMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion

  
  const { data, pageComponent, } = usePageQuery<StatPageQuery, StatPageQueryVars>(
    STAT_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: statName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      statName,
    );
  
    const debutComponent = useDebutQuery(statName, 'Stat', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.statByName || !data?.statByName[0]) return <div>Data not found for '{statName}'</div>;


  const statResult = new StatOnPage(data.statByName[0]);

  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{statResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion 
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Abilities with '${statResult.formattedName}'`}
              />,
              content: statResult.modifiedByAbilityCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderStatAbility}
                  query={STAT_ABILITY_QUERY}
                  queryVars={abilityQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field states with '${statResult.formattedName}'`}
              />,
              content: statResult.modifiedByFieldStateCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderStatFieldState}
                  query={STAT_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Items with '${statResult.formattedName}'`}
              />,
              content: statResult.modifiedByItemCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderStatItem}
                  query={STAT_ITEM_QUERY}
                  queryVars={itemQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Moves with '${statResult.formattedName}'`}
              />,
              content: statResult.modifiedByMoveCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderStatMove}
                  query={STAT_MOVE_QUERY}
                  queryVars={moveQueryVars}
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

export default StatPage;
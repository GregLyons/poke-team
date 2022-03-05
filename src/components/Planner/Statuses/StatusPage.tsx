import {
  Outlet,
  useParams,
} from 'react-router-dom';

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
} from '../../../types-queries/Planner/Status';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import {
  listRenderStatusAbility,
  listRenderStatusFieldState,
  listRenderStatusItem,
  listRenderStatusMove
} from './StatusConnections';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

type StatusPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const StatusPage = ({
  dispatches,
  filters,
}: StatusPageProps) => {
  const params = useParams();
  
  const statusName = params.statusId || '';

  // Connection queries
  // #region 
  
  const { queryVars: abilityQueryVars, } = useRemovalConnectedSearchVars<StatusAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statusName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<StatusFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statusName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, } = useRemovalConnectedSearchVars<StatusItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statusName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, } = useRemovalConnectedSearchVars<StatusMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statusName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<StatusPageQuery, StatusPageQueryVars>(
    STATUS_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: statusName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      statusName,
    );
  
    const debutComponent = useDebutQuery(statusName, 'Status', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.statusByName) return <div>Data not found for '{statusName}'</div>;


  const statusResult = new StatusOnPage(data.statusByName[0]);

  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{statusResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Ability interactions with ${statusResult.formattedName}`}
              />,
              content: statusResult.abilityCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderStatusAbility}
                  query={STATUS_ABILITY_QUERY}
                  queryVars={abilityQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field state interactions with ${statusResult.formattedName}`}
              />,
              content: statusResult.fieldStateCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderStatusFieldState}
                  query={STATUS_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Item interactions with ${statusResult.formattedName}`}
              />,
              content: statusResult.itemCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderStatusItem}
                  query={STATUS_ITEM_QUERY}
                  queryVars={itemQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Move interactions with ${statusResult.formattedName}`}
              />,
              content: statusResult.moveCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderStatusMove}
                  query={STATUS_MOVE_QUERY}
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

export default StatusPage;
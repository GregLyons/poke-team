import {
    Outlet,
    useParams
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';
import { useGenConnectedSearchVars } from '../../../hooks/Searches';
import {
    MoveEffectQueryVars, MoveFieldStateQueryVars, MoveOnPage, MovePageQuery,
    MovePageQueryVars, MoveStatQueryVars, MoveStatusQueryVars, MoveTypeQueryVars, MoveUsageMethodQueryVars, MOVE_EFFECT_QUERY, MOVE_FIELDSTATE_QUERY, MOVE_PAGE_QUERY, MOVE_STATUS_QUERY, MOVE_STAT_QUERY, MOVE_TYPE_QUERY, MOVE_USAGEMETHOD_QUERY
} from '../../../types-queries/Planner/Move';
import { Dispatches, Filters } from '../../App';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import {
    listRenderMoveEffect,
    listRenderMoveFieldState,
    listRenderMoveStat,
    listRenderMoveStatus,
    listRenderMoveType,
    listRenderMoveUsageMethod
} from './MoveConnections';

type MovePageProps = {
  dispatches: Dispatches
  filters: Filters
}

const MovePage = ({ 
  dispatches,
  filters,
}: MovePageProps) => {
  const params = useParams();
  
  const moveName = params.moveId || '';

  // Connections
  // #region
  
  const { queryVars: effectQueryVars, } = useGenConnectedSearchVars<MoveEffectQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: moveName,
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<MoveFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: moveName,
  }, genFilter: filters.genFilter});

  const { queryVars: statQueryVars, } = useGenConnectedSearchVars<MoveStatQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: moveName,
  }, genFilter: filters.genFilter});

  const { queryVars: statusQueryVars, } = useGenConnectedSearchVars<MoveStatusQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: moveName,
  }, genFilter: filters.genFilter});

  const { queryVars: typeQueryVars, } = useGenConnectedSearchVars<MoveTypeQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: moveName,
  }, genFilter: filters.genFilter});

  const { queryVars: usageMethodQueryVars, } = useGenConnectedSearchVars<MoveUsageMethodQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: moveName,
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<MovePageQuery, MovePageQueryVars>(
    MOVE_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: moveName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      moveName,
    );
  
    const debutComponent = useDebutQuery(moveName, 'Move', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.moveByName || !data?.moveByName[0]) return <div>Data not found for '{moveName}'</div>;


  const moveResult = new MoveOnPage(data.moveByName[0]);
  
  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{moveResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Effects of ${moveResult.formattedName}`}
              />,
              content: moveResult.effectCount > 0 && <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveEffect}
                  query={MOVE_EFFECT_QUERY}
                  queryVars={effectQueryVars}
              />
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field state interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.fieldStateCount > 0 && <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveFieldState}
                  query={MOVE_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
              />
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Stat interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.modifiesStatCount > 0 && <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveStat}
                  query={MOVE_STAT_QUERY}
                  queryVars={statQueryVars}
              />
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Status interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.statusCount > 0 && <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveStatus}
                  query={MOVE_STATUS_QUERY}
                  queryVars={statusQueryVars}
              />
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Type interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.typeCount > 0 && <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderMoveType}
                  query={MOVE_TYPE_QUERY}
                  queryVars={typeQueryVars}
              />
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Usage method interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.usageMethodCount > 0 && <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveUsageMethod}
                  query={MOVE_USAGEMETHOD_QUERY}
                  queryVars={usageMethodQueryVars}
              />
            },
          ]}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default MovePage;
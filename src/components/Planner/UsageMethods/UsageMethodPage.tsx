import {
  Outlet,
  useParams,
} from 'react-router-dom';

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
} from '../../../types-queries/Planner/UsageMethod';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import {
  listRenderUsageMethodAbility,
  listRenderUsageMethodItem,
  listRenderUsageMethodMove,
} from './UsageMethodConnections';

import { useRemovalConnectedSearchBar, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

type UsageMethodPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const UsageMethodPage = ({
  dispatches,
  filters,
}: UsageMethodPageProps) => {
  const params = useParams();
  
  const usageMethodName = params.usageMethodId || '';

  // Connection queries
  // #region 
  
  const { queryVars: abilityQueryVars, } = useRemovalConnectedSearchVars<UsageMethodAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});
  const { queryVars: itemQueryVars, } = useRemovalConnectedSearchVars<UsageMethodItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, } = useRemovalConnectedSearchVars<UsageMethodMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<UsageMethodPageQuery, UsageMethodPageQueryVars>(
    USAGEMETHOD_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: usageMethodName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      usageMethodName,
    );
  
    const debutComponent = useDebutQuery(usageMethodName, 'Usage method', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.usageMethodByName || !data?.usageMethodByName[0]) return <div>Data not found for '{usageMethodName}'</div>;


  const usageMethodResult = new UsageMethodOnPage(data.usageMethodByName[0]);

  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{usageMethodResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion 
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Ability interactions with ${usageMethodResult.formattedName}`}
              />,
              content: usageMethodResult.abilityCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderUsageMethodAbility}
                  query={USAGEMETHOD_ABILITY_QUERY}
                  queryVars={abilityQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Item interactions with ${usageMethodResult.formattedName}`}
              />,
              content: usageMethodResult.itemCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderUsageMethodItem}
                  query={USAGEMETHOD_ITEM_QUERY}
                  queryVars={itemQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Move interactions with ${usageMethodResult.formattedName}`}
              />,
              content: usageMethodResult.moveCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderUsageMethodMove}
                  query={USAGEMETHOD_MOVE_QUERY}
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

export default UsageMethodPage;
import {
  Outlet,
  useParams,
} from 'react-router-dom';

import {
  ITEM_PAGE_QUERY,
  ItemPageQuery,
  ItemPageQueryVars,
  ItemOnPage,
  
  ITEM_EFFECT_QUERY,
  ItemEffectQueryVars,

  ITEM_FIELDSTATE_QUERY,
  ItemFieldStateQueryVars,

  ITEM_STAT_QUERY,
  ItemStatQueryVars,

  ITEM_STATUS_QUERY,
  ItemStatusQueryVars,

  ITEM_TYPE_QUERY,
  ItemTypeQueryVars,

  ITEM_USAGEMETHOD_QUERY,
  ItemUsageMethodQueryVars,
} from '../../../types-queries/Planner/Item';
import {
  listRenderItemEffect,
  listRenderItemFieldState,
  listRenderItemStat,
  listRenderItemStatus,
  listRenderItemType,
  listRenderItemUsageMethod,
} from './ItemConnections';

import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { useGenConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';
import { useDebutQuery, usePageQuery } from '../../../hooks/Planner/PageQueries';

type ItemPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const ItemPage = ({ 
  dispatches,
  filters,
}: ItemPageProps) => {
  const params = useParams();
  
  const itemName = params.itemId || '';
  
  // Connections
  // #region

  const { queryVars: effectQueryVars, } = useGenConnectedSearchVars<ItemEffectQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: itemName,
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, } = useGenConnectedSearchVars<ItemFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: itemName,
  }, genFilter: filters.genFilter});

  const { queryVars: statQueryVars, } = useGenConnectedSearchVars<ItemStatQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: itemName,
  }, genFilter: filters.genFilter});

  const { queryVars: statusQueryVars, } = useGenConnectedSearchVars<ItemStatusQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: itemName,
  }, genFilter: filters.genFilter});

  const { queryVars: typeQueryVars, } = useGenConnectedSearchVars<ItemTypeQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: itemName,
  }, genFilter: filters.genFilter});

  const { queryVars: usageMethodQueryVars, } = useGenConnectedSearchVars<ItemUsageMethodQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: itemName,
  }, genFilter: filters.genFilter});

  // #endregion
  
  const { data, pageComponent, } = usePageQuery<ItemPageQuery, ItemPageQueryVars>(
    ITEM_PAGE_QUERY,
      {
        gen: filters.genFilter.gen,
        name: itemName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      },
      itemName,
    );
  
    const debutComponent = useDebutQuery(itemName, 'Item', filters.genFilter);
  
    if (debutComponent) return debutComponent;
    if (pageComponent) return pageComponent;
  
    if (!data?.itemByName) return <div>Data not found for '{itemName}'</div>;


  const itemResult = new ItemOnPage(data.itemByName[0]);
  
  return (
    <div className="planner-page__wrapper">
      <h1 className="planner-page__header">{itemResult.formattedName}</h1>
      <div className="planner-page__accordion-wrapper">
        <Accordion
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Effects of ${itemResult.formattedName}`}
              />,
              content: itemResult.effectCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderItemEffect}
                  query={ITEM_EFFECT_QUERY}
                  queryVars={effectQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field state interactions with ${itemResult.formattedName}`}
              />,
              content: itemResult.fieldStateCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderItemFieldState}
                  query={ITEM_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Stat interactions with ${itemResult.formattedName}`}
              />,
              content: itemResult.modifiesStatCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderItemStat}
                  query={ITEM_STAT_QUERY}
                  queryVars={statQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Status interactions with ${itemResult.formattedName}`}
              />,
              content: itemResult.statusCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderItemStatus}
                  query={ITEM_STATUS_QUERY}
                  queryVars={statusQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Type interactions with ${itemResult.formattedName}`}
              />,
              content: itemResult.typeCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderItemType}
                  query={ITEM_TYPE_QUERY}
                  queryVars={typeQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Usage method interactions with ${itemResult.formattedName}`}
              />,
              content: itemResult.usageMethodCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderItemUsageMethod}
                  query={ITEM_USAGEMETHOD_QUERY}
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

export default ItemPage;
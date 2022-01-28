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
} from '../../../../types-queries/Planner/Item';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';
import {
  listRenderItemEffect,
  listRenderItemFieldState,
  listRenderItemStat,
  listRenderItemStatus,
  listRenderItemType,
  listRenderItemUsageMethod,
} from './ItemConnections';

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
import { useGenConnectedSearchVars } from '../../../../hooks/planner-hooks';

type ItemPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
}

const ItemPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: ItemPageProps) => {
  const params = useParams();
  
  const itemName = params.itemId || '';
  
  // Connections
  // #region

  const [effectQueryVars, setEffectQueryVars] = useGenConnectedSearchVars<ItemEffectQueryVars>({
    gen: genFilter.gen,
    name: itemName,
  }, genFilter);

  const [fieldStateQueryVars, setFieldStateQueryVars] = useGenConnectedSearchVars<ItemFieldStateQueryVars>({
    gen: genFilter.gen,
    name: itemName,
  }, genFilter);

  const [statQueryVars, setStatQueryVars] = useGenConnectedSearchVars<ItemStatQueryVars>({
    gen: genFilter.gen,
    name: itemName,
  }, genFilter);

  const [statusQueryVars, setStatusQueryVars] = useGenConnectedSearchVars<ItemStatusQueryVars>({
    gen: genFilter.gen,
    name: itemName,
  }, genFilter);

  const [typeQueryVars, setTypeQueryVars] = useGenConnectedSearchVars<ItemTypeQueryVars>({
    gen: genFilter.gen,
    name: itemName,
  }, genFilter);

  const [usageMethodQueryVars, setUsageMethodQueryVars] = useGenConnectedSearchVars<ItemUsageMethodQueryVars>({
    gen: genFilter.gen,
    name: itemName,
  }, genFilter);

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<ItemPageQuery, ItemPageQueryVars>(
  ITEM_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: itemName,
        removedFromSwSh: removedFromSwSh(genFilter),
        removedFromBDSP: removedFromBDSP(genFilter),
      }
    })
  }, [genFilter, itemName, executeSearch]);
    
  // Before actually getting the item data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('itemByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: itemName,
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

  if (!data_introduced || !data_introduced.itemByName || (data_introduced.itemByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{itemName}'.
    </div>
    );
  }

  const debutGen = data_introduced.itemByName[0].introduced.edges[0].node.number;

  if (debutGen > genFilter.gen) return (
    <div>
      {itemName} doesn't exist in Generation {genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the item exists in this gen, we check the actual data
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
        Data not found for '{itemName}'.
      </div>
    );
  }
  else if (!data.itemByName) {
    console.log('invalid query');
    return (
      <div>
        'itemByName' is not a valid query for '{itemName}'.
      </div>
    );
  }
  else if (data.itemByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const itemResult = new ItemOnPage(data.itemByName[0]);
  
  return (
    <div className="planner__page">
      <h1 className="planner__page-header">{itemResult.formattedName}</h1>

      <MainEntityDescriptionTable
        descriptions={itemResult.descriptions}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Effects of ${itemResult.formattedName}`,
            content: itemResult.effectCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderItemEffect}
                query={ITEM_EFFECT_QUERY}
                queryVars={effectQueryVars}
              />
            </>,
          },
          {
            title: `Field state interactions with ${itemResult.formattedName}`,
            content: itemResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderItemFieldState}
                query={ITEM_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: `Stat interactions with ${itemResult.formattedName}`,
            content: itemResult.modifiesStatCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderItemStat}
                query={ITEM_STAT_QUERY}
                queryVars={statQueryVars}
              />
            </>,
          },
          {
            title: `Status interactions with ${itemResult.formattedName}`,
            content: itemResult.statusCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderItemStatus}
                query={ITEM_STATUS_QUERY}
                queryVars={statusQueryVars}
              />
            </>,
          },
          {
            title: `Type interactions with ${itemResult.formattedName}`,
            content: itemResult.typeCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderItemType}
                query={ITEM_TYPE_QUERY}
                queryVars={typeQueryVars}
              />
            </>,
          },
          {
            title: `Usage method interactions with ${itemResult.formattedName}`,
            content: itemResult.usageMethodCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderItemUsageMethod}
                query={ITEM_USAGEMETHOD_QUERY}
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

export default ItemPage;
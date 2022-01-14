import {
  useEffect,
} from 'react';
import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';
import {
  useLazyQuery,
} from '@apollo/client';

import {
  ITEM_PAGE_QUERY,
  ITEM_EFFECT_QUERY,
  
  ItemPageQuery,
  ItemPageQueryVars,

  ItemEffectEdge,
  ItemEffectQuery,
  ItemEffectQueryVars,

  ItemFieldStateEdge,
  ItemFieldStateQuery,
  ItemFieldStateQueryVars,
  ITEM_FIELDSTATE_QUERY,
  ItemOnPage,
} from '../../../../types-queries/Item';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import { GenerationNum } from '../../../../types-queries/Generation';
import {
  ListRenderArgs,
  useEntityConnectionChangeHandler,
} from '../helpers';
import {
  listRenderItemEffect,
  listRenderItemFieldState,
} from './ItemConnections';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntityConnectionSearch from '../EntityConnectionSearch';
import EntityAccordion from '../EntityAccordion';
type ItemPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const ItemPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: ItemPageProps) => {
  const params = useParams();
  
  const itemName = params.itemId || '';
  
  // Connections
  // #region

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<ItemEffectQueryVars>({
    gen: gen,
    name: itemName,
    startsWith: '',
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<ItemFieldStateQueryVars>({
    gen: gen,
    name: itemName,
    startsWith: '',
  });

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<ItemPageQuery, ItemPageQueryVars>(
  ITEM_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: gen,
        name: itemName,
      }
    })
  }, [gen, itemName, executeSearch]);
    
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

  if (debutGen > gen) return (
    <div>
      {itemName} doesn't exist in Generation {gen}.
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
    <>
      <h1>{itemResult.formattedName}</h1>

      <EntityAccordion 
        accordionData={[
          {
            title: `Effects of ${itemResult.formattedName}`,
            content: itemResult.effectCount > 0 && <>
              <EntityConnectionSearch
                gen={gen}
                handleChange={handleChangeEffect}
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
                gen={gen}
                handleChange={handleChangeFieldState}
                listRender={listRenderItemFieldState}
                query={ITEM_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
        ]}
      />
      <Outlet />
    </>
  );
}

export default ItemPage;
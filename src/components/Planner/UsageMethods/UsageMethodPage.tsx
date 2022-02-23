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
  listRenderUsageMethodAbility,
  listRenderUsageMethodItem,
  listRenderUsageMethodMove,
} from './UsageMethodConnections';

import { useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';

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
  
  const { queryVars: abilityQueryVars, setQueryVars: setAbilityQueryVars, } = useRemovalConnectedSearchVars<UsageMethodAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});
  const { queryVars: itemQueryVars, setQueryVars: setItemQueryVars, } = useRemovalConnectedSearchVars<UsageMethodItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, setQueryVars: setMoveQueryVars, } = useRemovalConnectedSearchVars<UsageMethodMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: usageMethodName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<UsageMethodPageQuery, UsageMethodPageQueryVars>(
  USAGEMETHOD_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: filters.genFilter.gen,
        name: usageMethodName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      }
    })
  }, [filters.genFilter, usageMethodName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('usageMethodByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: usageMethodName,
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

  if (!data_introduced || !data_introduced.usageMethodByName || (data_introduced.usageMethodByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{usageMethodName}'.
    </div>
    );
  }

  const debutGen = data_introduced.usageMethodByName[0].introduced.edges[0].node.number;

  if (debutGen > filters.genFilter.gen) return (
    <div>
      {usageMethodName} doesn't exist in Generation {filters.genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the usageMethod exists in this gen, we check the actual data
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
  else if (!data) {
    console.log('data not found');
    return (
      <div>
        Data not found for '{usageMethodName}'.
      </div>
    );
  }
  else if (!data.usageMethodByName) {
    console.log('invalid query');
    return (
      <div>
        'usageMethodByName' is not a valid query for '{usageMethodName}'.
      </div>
    );
  }
  else if (data.usageMethodByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

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
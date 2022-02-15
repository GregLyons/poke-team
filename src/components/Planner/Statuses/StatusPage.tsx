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
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../utils/constants';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import {
  listRenderStatusAbility,
  listRenderStatusFieldState,
  listRenderStatusItem,
  listRenderStatusMove
} from './StatusConnections';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';

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
  
  const [abilityQueryVars, setAbilityQueryVars] = useRemovalConnectedSearchVars<StatusAbilityQueryVars>({
    gen: filters.genFilter.gen,
    name: statusName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, filters.genFilter);

  const [effectQueryVars, setEffectQueryVars] = useGenConnectedSearchVars<StatusFieldStateQueryVars>({
    gen: filters.genFilter.gen,
    name: statusName,
  }, filters.genFilter);

  const [itemQueryVars, setItemQueryVars] = useRemovalConnectedSearchVars<StatusItemQueryVars>({
    gen: filters.genFilter.gen,
    name: statusName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, filters.genFilter);

  const [moveQueryVars, setMoveQueryVars] = useRemovalConnectedSearchVars<StatusMoveQueryVars>({
    gen: filters.genFilter.gen,
    name: statusName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, filters.genFilter);

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<StatusPageQuery, StatusPageQueryVars>(
  STATUS_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: filters.genFilter.gen,
        name: statusName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      }
    })
  }, [filters.genFilter, statusName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('statusByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: statusName,
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

  if (!data_introduced || !data_introduced.statusByName || (data_introduced.statusByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{statusName}'.
    </div>
    );
  }

  const debutGen = data_introduced.statusByName[0].introduced.edges[0].node.number;

  if (debutGen > filters.genFilter.gen) return (
    <div>
      {statusName} doesn't exist in Generation {filters.genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the status exists in this gen, we check the actual data
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
        Data not found for '{statusName}'.
      </div>
    );
  }
  else if (!data.statusByName) {
    console.log('invalid query');
    return (
      <div>
        'statusByName' is not a valid query for '{statusName}'.
      </div>
    );
  }
  else if (data.statusByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const statusResult = new StatusOnPage(data.statusByName[0]);

  return (
    <div className="planner-page__wrapper">
      <div className="planner-page__padder">
        <h1 className="planner-page__header">{statusResult.formattedName}</h1>
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
                  queryVars={effectQueryVars}
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
        <Outlet />
      </div>
    </div>
  );
}

export default StatusPage;
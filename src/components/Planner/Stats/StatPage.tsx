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
import { listRenderStatAbility, listRenderStatFieldState, listRenderStatItem, listRenderStatMove } from './StatConnections';
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../hooks/Searches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';

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
  
  const { queryVars: abilityQueryVars, setQueryVars: setAbilityQueryVars, } = useRemovalConnectedSearchVars<StatAbilityQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: fieldStateQueryVars, setQueryVars: setFieldStateQueryVars, } = useGenConnectedSearchVars<StatFieldStateQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
  }, genFilter: filters.genFilter});

  const { queryVars: itemQueryVars, setQueryVars: setItemQueryVars, } = useRemovalConnectedSearchVars<StatItemQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  const { queryVars: moveQueryVars, setQueryVars: setMoveQueryVars, } = useRemovalConnectedSearchVars<StatMoveQueryVars>({ defaultSearchVars: {
    gen: filters.genFilter.gen,
    name: statName,
    removedFromSwSh: removedFromSwSh(filters.genFilter),
    removedFromBDSP: removedFromBDSP(filters.genFilter),
  }, genFilter: filters.genFilter});

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<StatPageQuery, StatPageQueryVars>(
  STAT_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: filters.genFilter.gen,
        name: statName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      }
    })
  }, [filters.genFilter, statName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('statByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: statName,
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

  if (!data_introduced || !data_introduced.statByName || (data_introduced.statByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{statName}'.
    </div>
    );
  }

  const debutGen = data_introduced.statByName[0].introduced.edges[0].node.number;

  if (debutGen > filters.genFilter.gen) return (
    <div>
      {statName} doesn't exist in Generation {filters.genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the stat exists in this gen, we check the actual data
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
        Data not found for '{statName}'.
      </div>
    );
  }
  else if (!data.statByName) {
    console.log('invalid query');
    return (
      <div>
        'statByName' is not a valid query for '{statName}'.
      </div>
    );
  }
  else if (data.statByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

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
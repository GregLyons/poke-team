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
  MOVE_PAGE_QUERY,
  MovePageQuery,
  MovePageQueryVars,
  MoveOnPage,
  
  MOVE_EFFECT_QUERY,
  MoveEffectQueryVars,

  MOVE_FIELDSTATE_QUERY,
  MoveFieldStateQueryVars,

  MOVE_STAT_QUERY,
  MoveStatQueryVars,

  MOVE_STATUS_QUERY,
  MoveStatusQueryVars,

  MOVE_TYPE_QUERY,
  MoveTypeQueryVars,

  MOVE_USAGEMETHOD_QUERY,
  MoveUsageMethodQueryVars,
} from '../../../types-queries/Planner/Move';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../types-queries/Planner/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../utils/constants';
import {
  listRenderMoveEffect,
  listRenderMoveFieldState,
  listRenderMoveStat,
  listRenderMoveStatus,
  listRenderMoveType,
  listRenderMoveUsageMethod,
} from './MoveConnections';

import EntityConnectionSearch from '../Pages/EntityConnectionSearch';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import Accordion from '../../Reusables/Accordion/Accordion';
import ConnectionAccordionTitle from '../Pages/ConnectionAccordionTitle';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { Dispatches, Filters } from '../../App';
import EntityConnectionSearchIcons from '../Pages/EntityConnectionSearchIcons';

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
  
  const [effectQueryVars, setEffectQueryVars] = useGenConnectedSearchVars<MoveEffectQueryVars>({
    gen: filters.genFilter.gen,
    name: moveName,
  }, filters.genFilter);

  const [fieldStateQueryVars, setFieldStateQueryVars] = useGenConnectedSearchVars<MoveFieldStateQueryVars>({
    gen: filters.genFilter.gen,
    name: moveName,
  }, filters.genFilter);

  const [statQueryVars, setStatQueryVars] = useGenConnectedSearchVars<MoveStatQueryVars>({
    gen: filters.genFilter.gen,
    name: moveName,
  }, filters.genFilter);

  const [statusQueryVars, setStatusQueryVars] = useGenConnectedSearchVars<MoveStatusQueryVars>({
    gen: filters.genFilter.gen,
    name: moveName,
  }, filters.genFilter);

  const [typeQueryVars, setTypeQueryVars] = useGenConnectedSearchVars<MoveTypeQueryVars>({
    gen: filters.genFilter.gen,
    name: moveName,
  }, filters.genFilter);

  const [usageMethodQueryVars, setUsageMethodQueryVars] = useGenConnectedSearchVars<MoveUsageMethodQueryVars>({
    gen: filters.genFilter.gen,
    name: moveName,
  }, filters.genFilter);

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<MovePageQuery, MovePageQueryVars>(
  MOVE_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: filters.genFilter.gen,
        name: moveName,
        removedFromSwSh: removedFromSwSh(filters.genFilter),
        removedFromBDSP: removedFromBDSP(filters.genFilter),
      }
    })
  }, [filters.genFilter, moveName, executeSearch]);
    
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('moveByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: moveName,
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

  if (!data_introduced || !data_introduced.moveByName || (data_introduced.moveByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{moveName}'.
    </div>
    );
  }

  const debutGen = data_introduced.moveByName[0].introduced.edges[0].node.number;

  if (debutGen > filters.genFilter.gen) return (
    <div>
      {moveName} doesn't exist in Generation {filters.genFilter.gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the move exists in this gen, we check the actual data
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
        Data not found for '{moveName}'.
      </div>
    );
  }
  else if (!data.moveByName) {
    console.log('invalid query');
    return (
      <div>
        'moveByName' is not a valid query for '{moveName}'.
      </div>
    );
  }
  else if (data.moveByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const moveResult = new MoveOnPage(data.moveByName[0]);
  
  return (
    <div className="planner-page__wrapper">
      <div className="planner-page__padder">
        <h1 className="planner-page__header">{moveResult.formattedName}</h1>
        <Accordion
          accordionContext='planner'
          accordionData={[
            {
              title: <ConnectionAccordionTitle
                titleText={`Effects of ${moveResult.formattedName}`}
              />,
              content: moveResult.effectCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveEffect}
                  query={MOVE_EFFECT_QUERY}
                  queryVars={effectQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Field state interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.fieldStateCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveFieldState}
                  query={MOVE_FIELDSTATE_QUERY}
                  queryVars={fieldStateQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Stat interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.modifiesStatCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveStat}
                  query={MOVE_STAT_QUERY}
                  queryVars={statQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Status interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.statusCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveStatus}
                  query={MOVE_STATUS_QUERY}
                  queryVars={statusQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Type interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.typeCount > 0 && <>
                <EntityConnectionSearchIcons
                  dispatches={dispatches}
                  filters={filters}
                  listRender={listRenderMoveType}
                  query={MOVE_TYPE_QUERY}
                  queryVars={typeQueryVars}
                />
              </>,
            },
            {
              title: <ConnectionAccordionTitle
                titleText={`Usage method interactions with ${moveResult.formattedName}`}
              />,
              content: moveResult.usageMethodCount > 0 && <>
                <EntityConnectionSearch
                  genFilter={filters.genFilter}
                  listRender={listRenderMoveUsageMethod}
                  query={MOVE_USAGEMETHOD_QUERY}
                  queryVars={usageMethodQueryVars}
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

export default MovePage;
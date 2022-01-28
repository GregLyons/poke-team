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
} from '../../../../types-queries/Planner/Move';
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
  listRenderMoveEffect,
  listRenderMoveFieldState,
  listRenderMoveStat,
  listRenderMoveStatus,
  listRenderMoveType,
  listRenderMoveUsageMethod,
} from './MoveConnections';

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

type MovePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
}

const MovePage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: MovePageProps) => {
  const params = useParams();
  
  const moveName = params.moveId || '';

  // Connections
  // #region
  
  const [effectQueryVars, setEffectQueryVars] = useGenConnectedSearchVars<MoveEffectQueryVars>({
    gen: genFilter.gen,
    name: moveName,
  }, genFilter);

  const [fieldStateQueryVars, setFieldStateQueryVars] = useGenConnectedSearchVars<MoveFieldStateQueryVars>({
    gen: genFilter.gen,
    name: moveName,
  }, genFilter);

  const [statQueryVars, setStatQueryVars] = useGenConnectedSearchVars<MoveStatQueryVars>({
    gen: genFilter.gen,
    name: moveName,
  }, genFilter);

  const [statusQueryVars, setStatusQueryVars] = useGenConnectedSearchVars<MoveStatusQueryVars>({
    gen: genFilter.gen,
    name: moveName,
  }, genFilter);

  const [typeQueryVars, setTypeQueryVars] = useGenConnectedSearchVars<MoveTypeQueryVars>({
    gen: genFilter.gen,
    name: moveName,
  }, genFilter);

  const [usageMethodQueryVars, setUsageMethodQueryVars] = useGenConnectedSearchVars<MoveUsageMethodQueryVars>({
    gen: genFilter.gen,
    name: moveName,
  }, genFilter);

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<MovePageQuery, MovePageQueryVars>(
  MOVE_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: genFilter.gen,
        name: moveName,
        removedFromSwSh: removedFromSwSh(genFilter),
        removedFromBDSP: removedFromBDSP(genFilter),
      }
    })
  }, [genFilter, moveName, executeSearch]);
    
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

  if (debutGen > genFilter.gen) return (
    <div>
      {moveName} doesn't exist in Generation {genFilter.gen}.
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
    <div className="planner__page">
      <h1 className="planner__page-header">{moveResult.formattedName}</h1>

      <MainEntityDescriptionTable
        descriptions={moveResult.descriptions}
      />

      <ConnectionAccordion
        accordionData={[
          {
            title: `Effects of ${moveResult.formattedName}`,
            content: moveResult.effectCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderMoveEffect}
                query={MOVE_EFFECT_QUERY}
                queryVars={effectQueryVars}
              />
            </>,
          },
          {
            title: `Field state interactions with ${moveResult.formattedName}`,
            content: moveResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderMoveFieldState}
                query={MOVE_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: `Stat interactions with ${moveResult.formattedName}`,
            content: moveResult.modifiesStatCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderMoveStat}
                query={MOVE_STAT_QUERY}
                queryVars={statQueryVars}
              />
            </>,
          },
          {
            title: `Status interactions with ${moveResult.formattedName}`,
            content: moveResult.statusCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderMoveStatus}
                query={MOVE_STATUS_QUERY}
                queryVars={statusQueryVars}
              />
            </>,
          },
          {
            title: `Type interactions with ${moveResult.formattedName}`,
            content: moveResult.typeCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
                listRender={listRenderMoveType}
                query={MOVE_TYPE_QUERY}
                queryVars={typeQueryVars}
              />
            </>,
          },
          {
            title: `Usage method interactions with ${moveResult.formattedName}`,
            content: moveResult.usageMethodCount > 0 && <>
              <EntityConnectionSearch
                genFilter={genFilter}
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
  );
}

export default MovePage;
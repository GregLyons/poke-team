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
} from '../../../../types-queries/Move';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
} from '../../../../utils/constants';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';
import {
  useEntityConnectionChangeHandler,
} from '../helpers';
import {
  listRenderMoveEffect,
  listRenderMoveFieldState,
} from './MoveConnections';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntityConnectionSearch from '../EntityConnectionSearch';
import EntityConnectionAccordion from '../EntityConnectionAccordion';
import MainEntityDescriptionTable from '../MainEntityDescriptionTable';

type MovePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const MovePage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: MovePageProps) => {
  const params = useParams();
  
  const moveName = params.moveId || '';

  // Connections
  // #region
  
  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<MoveEffectQueryVars>({
    gen: gen,
    name: moveName,
    startsWith: '',
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<MoveFieldStateQueryVars>({
    gen: gen,
    name: moveName,
    startsWith: '',
  });

  // #endregion
  
  const [executeSearch, { loading, error, data }] = useLazyQuery<MovePageQuery, MovePageQueryVars>(
  MOVE_PAGE_QUERY);

  useEffect(() => {
    console.log('queried');
    executeSearch({
      variables: {
        gen: gen,
        name: moveName,
      }
    })
  }, [gen, moveName, executeSearch]);
    
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

  if (debutGen > gen) return (
    <div>
      {moveName} doesn't exist in Generation {gen}.
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
    <>
      <h1 className="planner__page-header">{moveResult.formattedName}</h1>

      <MainEntityDescriptionTable
        descriptions={moveResult.descriptions}
      />

      <EntityConnectionAccordion
        accordionData={[
          {
            title: `Effects of ${moveResult.formattedName}`,
            content: moveResult.effectCount > 0 && <>
              <EntityConnectionSearch
                gen={gen}
                handleChange={handleChangeEffect}
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
                gen={gen}
                handleChange={handleChangeFieldState}
                listRender={listRenderMoveFieldState}
                query={MOVE_FIELDSTATE_QUERY}
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

export default MovePage;
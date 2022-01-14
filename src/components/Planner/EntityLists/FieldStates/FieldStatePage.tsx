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
  ListRenderArgs,
  useEntityConnectionChangeHandler,
} from '../helpers';
import {
  FIELDSTATE_PAGE_QUERY,
  FieldStatePageQuery,
  FieldStatePageQueryVars,

  FIELDSTATE_ABILITY_QUERY,
  FieldStateAbilityQuery,
  FieldStateAbilityQueryVars,
  FieldStateAbilityEdge,

  FIELDSTATE_ITEM_QUERY,
  FieldStateItemQuery,
  FieldStateItemQueryVars,
  FieldStateItemEdge,

  FIELDSTATE_MOVE_QUERY,
  FieldStateMoveQuery,
  FieldStateMoveQueryVars,
  FieldStateMoveEdge,
  FieldStateOnPage,
  FieldStateEffectQuery,
  FieldStateEffectEdge,
  FieldStateEffectQueryVars,
  FIELDSTATE_EFFECT_QUERY,
} from '../../../../types-queries/FieldState';
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
  CartAction,
  TeamAction,
} from "../../../App";

import EntityConnectionSearch from '../EntityConnectionSearch';

const listRenderFieldStateAbility = ({ data, }: ListRenderArgs<FieldStateAbilityQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const abilityEdges = data.fieldStateByName[0].activatesAbility.edges
    .concat(data.fieldStateByName[0].createdByAbility.edges)
    .concat(data.fieldStateByName[0].ignoredByAbility.edges)
    .concat(data.fieldStateByName[0].preventedByAbility.edges)
    .concat(data.fieldStateByName[0].removedByAbility.edges)
    .concat(data.fieldStateByName[0].suppressedByAbility.edges);

  return (
    <>
      {abilityEdges.map((abilityEdge: FieldStateAbilityEdge) => (
        <div>
          <Link to={`../abilities/${abilityEdge.node.name}`}>{abilityEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}

const listRenderFieldStateEffect = ({ data, }: ListRenderArgs<FieldStateEffectQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  return (
    <>
      {data.fieldStateByName[0].effects.edges.map((effectEdge: FieldStateEffectEdge) => (
        <div>
          <Link to={`../effects/${effectEdge.node.name}`}>{effectEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  )
}

const listRenderFieldStateItem = ({ data, }: ListRenderArgs<FieldStateItemQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const itemEdges = data.fieldStateByName[0].activatesItem.edges
    .concat(data.fieldStateByName[0].extendedByItem.edges)
    .concat(data.fieldStateByName[0].ignoredByItem.edges)
    .concat(data.fieldStateByName[0].resistedByItem.edges);

  return (
    <>
      {itemEdges.map((itemEdge: FieldStateItemEdge) => (
        <div>
          <Link to={`../items/${itemEdge.node.name}`}>{itemEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}

const listRenderFieldStateMove = ({ data, }: ListRenderArgs<FieldStateMoveQuery>) => {
  if (!data || !data.fieldStateByName) return (<div>Data not found for the query 'fieldStateByName'.</div>);

  const moveEdges = data.fieldStateByName[0].createdByMove.edges
    .concat(data.fieldStateByName[0].enhancesMove.edges)
    .concat(data.fieldStateByName[0].hindersMove.edges)
    .concat(data.fieldStateByName[0].removedByMove.edges);

  return (
    <>
      {moveEdges.map((moveEdge: FieldStateMoveEdge) => (
        <div>
          <Link to={`../moves/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
        </div>
      ))}
    </>
  );
}

type FieldStatePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const FieldStatePage = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: FieldStatePageProps) => {
  const params = useParams();
  
  const fieldStateName = params.fieldStateId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, handleChangeAbility] = useEntityConnectionChangeHandler<FieldStateAbilityQueryVars>({
    gen: gen,
    name: fieldStateName,
    startsWith: '',
  });

  const [effectQueryVars, handleChangeEffect] = useEntityConnectionChangeHandler<FieldStateEffectQueryVars>({
    gen: gen,
    name: fieldStateName,
    startsWith: '',
  });

  const [itemQueryVars, handleChangeItem] = useEntityConnectionChangeHandler<FieldStateItemQueryVars>({
    gen: gen,
    name: fieldStateName,
    startsWith: '',
  });

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<FieldStateMoveQueryVars>({
    gen: gen,
    name: fieldStateName,
    startsWith: '',
  });

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<FieldStatePageQuery, FieldStatePageQueryVars>(
  FIELDSTATE_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: gen,
        name: fieldStateName,
      }
    })
  }, [gen, fieldStateName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('fieldStateByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: fieldStateName,
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

  if (!data_introduced || !data_introduced.fieldStateByName || (data_introduced.fieldStateByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{fieldStateName}'.
    </div>
    );
  }

  const debutGen = data_introduced.fieldStateByName[0].introduced.edges[0].node.number;

  if (debutGen > gen) return (
    <div>
      {fieldStateName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the fieldState exists in this gen, we check the actual data
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
    console.log()
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
        Data not found for '{fieldStateName}'.
      </div>
    );
  }
  else if (!data.fieldStateByName) {
    console.log('invalid query');
    return (
      <div>
        'fieldStateByName' is not a valid query for '{fieldStateName}'.
      </div>
    );
  }
  else if (data.fieldStateByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const fieldStateResult = new FieldStateOnPage(data.fieldStateByName[0]);

  return (
    <>
      <h1>{fieldStateResult.formattedName}</h1>

      {fieldStateResult.abilityCount > 0 && <>
        <h2>Abilities</h2>
        <EntityConnectionSearch
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
          handleChange={handleChangeAbility}
          listRender={listRenderFieldStateAbility}
          query={FIELDSTATE_ABILITY_QUERY}
          queryVars={abilityQueryVars}
        />
      </>}
      
      {fieldStateResult.effectCount > 0 && <>
        <h2>Items</h2>
        <EntityConnectionSearch
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
          handleChange={handleChangeEffect}
          listRender={listRenderFieldStateEffect}
          query={FIELDSTATE_EFFECT_QUERY}
          queryVars={itemQueryVars}
        />
      </>}

      {fieldStateResult.itemCount > 0 && <>
        <h2>Items</h2>
        <EntityConnectionSearch
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
          handleChange={handleChangeItem}
          listRender={listRenderFieldStateItem}
          query={FIELDSTATE_ITEM_QUERY}
          queryVars={itemQueryVars}
        />
      </>}
      
      {fieldStateResult.moveCount > 0 && <>
        <h2>Moves</h2>
        <EntityConnectionSearch
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
          handleChange={handleChangeMove}
          listRender={listRenderFieldStateMove}
          query={FIELDSTATE_MOVE_QUERY}
          queryVars={moveQueryVars}
        />
      </>}
      <Outlet />
      
      {/* <EntityAccordion
        accordionData={accordionData}
      /> */}

      {/* Descriptions */}      
      {/* <h2>Descriptions</h2>

      {result.descriptions.edges.map((edge: any) => {
        return (
          <div key={edge.versionGroupCode}>
            {edge.versionGroupCode}: {edge.node.text}
          </div>
        );
      })} */}

      {/* Abilities */}
      {/* {result.abilities.count > 0 && (<h2>Abilities</h2>)} */}
      {/* {result.abilities.edges && result.abilities.edges.length > 0
        && result.abilities.edges.map((ability: any) => {
          return (
            <div key={'abilities_' + ability.node.id}>
              {ability.node.name}
            </div>
          )
        })
      } */}

      {/* Field States */}
      {/* {result.fieldStates.count > 0 
        && (<h2>Field States</h2>)} */}
      {/* {result.fieldStates.edges && result.fieldStates.edges.length > 0
        && result.fieldStates.edges.map((fieldState: any) => {
          return (
            <div key={'fieldState_' + fieldState.node.id}>
              {fieldState.node.name}
            </div>
          )
        })
      } */}

      {/* Items */}
      {/* {result.items.count > 0
        && (<h2>Items</h2>)} */}
      {/* {result.items.edges && result.items.edges.length > 0
        && result.items.edges.map((items: any) => {
          return (
            <div key={'items_' + items.node.id}>
              {items.node.name}
            </div>
          )
        })
      } */}

      {/* Moves */}
      {/* {result.moves.count > 0 
        && (<h2>Moves</h2>)}
      {result.moves.edges && result.moves.edges.length > 0
        && result.moves.edges.map((edge: any) => {
          return (
            <Link
              to={`../moves/${edge.node.name}`}
              key={'move_' + edge.node.id}
            >
              {edge.node.name}
            </Link>
          )
        })
      } */}
    </>
  );
}

export default FieldStatePage;
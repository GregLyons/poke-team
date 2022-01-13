import {
  useContext,
} from 'react';

import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';

import {
  useQuery
} from '@apollo/client';

import {
  GenContext,
} from '../../../../contexts';

import EntityConnectionSearch, { useEntityConnectionChangeHandler, } from '../EntityConnectionSearch';

import {
  EFFECT_PAGE_QUERY,
  EFFECT_MOVE_QUERY,

  EffectPageResult,
  EffectPageQuery,
  EffectPageQueryVars,
  EffectMoveQuery,
  EffectMoveQueryVars,
  EffectMoveResult,
  EffectMoveEdge,
} from '../../../../types-queries/Effect';

const listRenderEffectMove = (data: EffectMoveQuery) => {
  if (!data || !data.effectByName) return (<div>Data not found for the query 'effectByName'.</div>);
  return (
    <>
      {data.effectByName[0].moves.edges.map((moveEdge: EffectMoveEdge) => (
        <>
        <Link to={`../effects/${moveEdge.node.name}`}>{moveEdge.node.formattedName}</Link>
      </>
      ))}
    </>
  )
}

const EffectPage = () => {
  const params = useParams();

  const { gen } = useContext(GenContext);
  
  const effectName = params.effectId || '';

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<EffectMoveQueryVars>({
    gen: gen,
    name: effectName,
    startsWith: '',
  })

  const { loading, error, data } = useQuery<EffectPageQuery, EffectPageQueryVars>(
    EFFECT_PAGE_QUERY,
    {
      variables: {
        gen: gen,
        name: effectName,
      }
    }
  );

  if (!data || !data.effectByName) return (
    <div>
      Data not found for '{effectName}'.
    </div>
  );
  if (!data.effectByName) return (
    <div>
      'effectByName' is not a valid query for '{effectName}'.
    </div>
  )
  if (loading) return (
    <div>
      Loading...
    </div>
  );
  if (error) return (
    <div>
      Error! {error.message}
    </div>
  ); 

  const effectResult = data.effectByName[0];

  // Happens when gen counter is brought below when the move was introduced.
  if (effectResult.introduced.edges[0].node.number > gen) return (
    <div>
      {effectResult.formattedName} doesn't exist in Generation {gen}.
    </div>
  )

  return (
    <>
      <h1>{effectResult.formattedName}</h1>

      <h2>Moves</h2>
      <EntityConnectionSearch
        handleChange={handleChangeMove}
        listRender={listRenderEffectMove}
        query={EFFECT_MOVE_QUERY}
        queryVars={moveQueryVars}
      />
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

export default EffectPage;
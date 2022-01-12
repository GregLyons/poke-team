import {
  useContext,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  useQuery
} from '@apollo/client';

import { EFFECT_PAGE_QUERY } from './effectQueries';

import { GenContext } from '../../../../contexts';

const EffectPage = () => {
  const params = useParams();

  const { gen, setGen } = useContext(GenContext);
  
  const effectName = params.effectId;

  const { loading, error, data } = useQuery(
    EFFECT_PAGE_QUERY,
    {
      variables: {
        gen: gen,
        name: effectName,
      }
    }
  );

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
  // Happens when gen counter is brought below when the move was introduced.
  if (data.effectByName.length === 0) return (
    <div>
      This effect doesn't exist in Generation {gen}.
    </div>
  )
  
  const result = data.effectByName[0];

  return (
    <div>
      <h1>{result.formattedName}</h1>

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
      {result.abilities.edges && result.abilities.edges.length > 0 
        && (<h2>Abilities</h2>)}
      {result.abilities.edges && result.abilities.edges.length > 0
        && result.abilities.edges.map((ability: any) => {
          return (
            <div key={'abilities_' + ability.node.id}>
              {ability.node.name}
            </div>
          )
        })
      }

      {/* Field States */}
      {result.fieldStates.edges && result.fieldStates.edges.length > 0 
        && (<h2>Field States</h2>)}
      {result.fieldStates.edges && result.fieldStates.edges.length > 0
        && result.fieldStates.edges.map((fieldState: any) => {
          return (
            <div key={'fieldState_' + fieldState.node.id}>
              {fieldState.node.name}
            </div>
          )
        })
      }

      {/* Items */}
      {result.items.edges && result.items.edges.length > 0 
        && (<h2>Items</h2>)}
      {result.items.edges && result.items.edges.length > 0
        && result.items.edges.map((items: any) => {
          return (
            <div key={'items_' + items.node.id}>
              {items.node.name}
            </div>
          )
        })
      }

      {/* Moves */}
      {result.moves.edges && result.moves.edges.length > 0 
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
      }
    </div>
  );
}

export default EffectPage;
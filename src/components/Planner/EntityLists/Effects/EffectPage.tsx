import {
  useContext,
} from 'react';

import {
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

      {/* Moves */}
      {result.moves.edges && result.moves.edges.length > 0
        && result.moves.edges.map((move: any) => {
          return (
            <div key={'move_' + move.node.id}>
              {move.node.name}
            </div>
          )
        })
      }
    </div>
  );
}

export default EffectPage;
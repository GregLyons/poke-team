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

import { MOVE_PAGE_QUERY } from './moveQueries';

import { GenContext } from '../../../../contexts';

const MovePage = () => {
  const params = useParams();

  const { gen, setGen } = useContext(GenContext);
  
  const moveName = params.moveId;

  const { loading, error, data } = useQuery(
    MOVE_PAGE_QUERY,
    {
      variables: {
        gen: gen,
        name: moveName,
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
  if (data.moveByName.length === 0) return (
    <div>
      This move doesn't exist in Generation {gen}.
    </div>
  )
  
  const result = data.moveByName[0];

  return (
    <div>
      <h1>{result.formattedName}</h1>

      {/* Descriptions */}      
      <h2>Descriptions</h2>

      {result.descriptions.edges.map((edge: any) => {
        return (
          <div key={edge.versionGroupCode}>
            {edge.versionGroupCode}: {edge.node.text}
          </div>
        );
      })}

      {/* Effects */}
      {result.effects.edges && result.effects.edges.length > 0 
        && (<h2>Effects</h2>)}
      {result.effects.edges.length > 0
        && result.effects.edges.map((edge: any) => {
          return (
            <Link 
              to={`../effects/${edge.node.name}`}
              key={'effect_' + edge.node.id}
            >
              {edge.node.name}
            </Link>
          )
        })
      }
    </div>
  );
}

export default MovePage;
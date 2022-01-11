import { useContext } from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  useQuery
} from '@apollo/client';

import { MOVE_PAGE_QUERY } from './queries';

import { GenContext } from '../../../../contexts';

const MovePage = () => {
  const params = useParams();
  const moveName = params.moveId;

  const { gen } = useContext(GenContext);
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

      {/* Basic stats */}
      <h2>Stats</h2>
      <h2></h2>
    </div>
  );
}

export default MovePage;
import {
  useState
} from 'react';

import {
  DocumentNode,
  gql,
  useLazyQuery,
} from '@apollo/client';
import { MoveGQLResult } from '../typeDefs/Move';

type EntitySearchProps = {
  gqlQuery: DocumentNode
  setData: (data: MoveGQLResult[]) => void,
}

const EntitySearch = ({ gqlQuery, setData }: EntitySearchProps) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data, error, loading }] = useLazyQuery(
    gqlQuery
  );

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
          }
      >
        OK
      </button>
    </>
  )
}
// React and contexts
// #region

import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Link,
  Outlet,
  useSearchParams,
} from 'react-router-dom';

import {
  GenContext,
  TeamContext,
} from '../../../../contexts';

// #endregion

// Apollo
// #region

import {
  gql,
  useLazyQuery,
} from '@apollo/client';

// #endregion

// Types
// #region

import { Pokemon } from '../../../../typeDefs/Pokemon';
import {
  Move,
  MoveGQLResult,
} from '../../../../typeDefs/Move';

// #endregion

// Components
// #region

import MoveEntry from './MoveEntry';

// #endregion

const MOVE_SEARCH_QUERY = gql`
  query MoveSearchQuery(
    $gen: Int!
    $startsWith: String!
  ) {
    moves(
      generation: $gen
      filter: {startsWith: $startsWith}
    ) {
      id
      name
      formattedName
      accuracy
      category
      contact
      power
      pp
      priority
      target

      introduced {
        edges {
          node {
            number
          }
        }
      }

      type {
        edges {
          node {
            name
          }
        }
      }

      pokemon {
        edges {
          node {
            name
            formattedName
            speciesName
            introduced {
              edges {
                node {
                  number
                }
              }
            }
          }
        }
      }
    }
  }
`;

const MoveSearch = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executedSearch, setExecutedSearch] = useState<boolean>(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const [executeSearch, { data, loading, error }] = useLazyQuery(
    MOVE_SEARCH_QUERY
  );

  const { gen } = useContext(GenContext);
  const { addToTeam } = useContext(TeamContext);

  useEffect(() => {
    if (executedSearch) {
      executeSearch({
        variables: {
          gen: gen,
          startsWith: searchFilter,
        }
      })
    }

    const genString = gen + '';
    setSearchParams({
      gen: genString,
    });
    
  }, [gen])

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() => {
            const genString = gen + '';
            setSearchParams({
              gen: genString,
            })
            executeSearch({
              variables: {
                gen: gen,
                startsWith: searchFilter,
              }
            })
            setExecutedSearch(true);
          }
          }
        >
          OK
        </button>
      </div>
      <div className="planner__table planner__table--move">
        {data && 
          data.moves.map((move: MoveGQLResult) => (
            <>
              <MoveEntry 
                key={move.id} 
                addToTeam={addToTeam}
                move={new Move(move)} 
              />
            </>
            ))
        }
      </div>
      <Outlet />
    </>
  );
};

export default MoveSearch;
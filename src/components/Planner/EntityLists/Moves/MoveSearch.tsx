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
  useLazyQuery,
} from '@apollo/client';
import {
  MOVE_SEARCH_QUERY,
} from './queries';

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
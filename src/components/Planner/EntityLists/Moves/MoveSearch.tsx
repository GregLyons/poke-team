// React and contexts
// #region

import {
  useContext,
  useEffect,
  useRef,
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
import { stringToGenNumber } from '../../../../typeDefs/Generation';
import { exec } from 'child_process';

// #endregion



const MoveSearch = () => {
  const { gen, setGen } = useContext(GenContext);
  const { addToTeam } = useContext(TeamContext);

  const [searchBox, setSearchBox] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [executeSearch, { data, loading, error }] = useLazyQuery(MOVE_SEARCH_QUERY);

  // When search button is clicked, update searchParams based on searchBox.
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const genString = gen + '';

    setSearchParams({
      ...searchParams,
      gen: genString,
      startsWith: searchBox,
    });
  };

  // Initial render according to searchParams, if present
  useEffect(() => {
    if (searchParams) {
      // Set gen
      setGen(stringToGenNumber(searchParams.get('gen')));

      // Set search box
      setSearchBox(searchParams.get('startsWith') || '');
    } 
  }, []);

  // When gen changes, synthetically click search button to update search params
  useEffect(() => {
    if (searchButtonRef.current) searchButtonRef.current.click();
  }, [gen]);

  // Execute search when searchParams change
  useEffect(() => {
    // Unpack searchParams 
    let searchVariables: {[key: string]: string | number} = {}
    searchParams.forEach((value, key) => {
      if (key === 'gen') searchVariables.gen = stringToGenNumber(value);
      else searchVariables[key] = value;
      console.log(key, value);
    });

    // Execute search
    executeSearch({
      variables: {
        ...searchVariables
      }
    })
  }, [searchParams, executeSearch]);

  // Ref so that we can programatically click search button.
  const searchButtonRef = useRef<HTMLButtonElement|null>(null);

  if (loading) { return (<div>Loading...</div>)}
  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      <div>
        Search
        <input
          type="text"
          value={searchBox}
          onChange={(e) => setSearchBox(e.target.value)}
        />
        <button
          ref={searchButtonRef}
          onClick={e => handleClick(e)}
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
// React and contexts
// #region

import {
  FC,
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
} from '../contexts';

// #endregion

// GraphQL and Apollo
// #region

import { DocumentNode } from 'graphql';
import {
  useLazyQuery,
} from '@apollo/client';

// #endregion

// Types
// #region

import {
  Pokemon,
  PokemonGQLResult,
} from '../typeDefs/Pokemon';
import {
  Move,
  MoveGQLResult,
} from '../typeDefs/Move';

// #endregion

// Components
// #region

import { stringToGenNumber } from '../typeDefs/Generation';

// #endregion

type MoveListRender = (move: MoveGQLResult) => JSX.Element
type PokemonListRender = (pokemon: PokemonGQLResult) => JSX.Element

type ListRender = MoveListRender | PokemonListRender;

type EntitySearchProps = {
  query: DocumentNode,
  keyName: string,
  listRender: ListRender,
}

const EntitySearch = ({
  query,
  keyName,
  listRender,
}: EntitySearchProps) => {

  // Hooks
  const { gen, setGen } = useContext(GenContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBox, setSearchBox] = useState<string>(searchParams.get('startsWith') || '');
  const [executeSearch, { data, loading, error }] = useLazyQuery(query);

  const firstSearch = useRef(false);

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
    } 
  }, []);

  // When gen changes, synthetically click search button to update search params
  useEffect(() => {
    if (!firstSearch.current) return;
    if (searchButtonRef.current) searchButtonRef.current.click();
  }, [gen]);

  // Execute search when searchParams change
  useEffect(() => {
    // user has gone to /planner/[entity name] with no search parameters; so don't search
    if (!searchParams.get('gen')) return;

    // first search will have executed, now gen slider updates search
    firstSearch.current = true;

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
          data[keyName].map(listRender)
        }
      </div>
    </>
  );
};

export default EntitySearch;
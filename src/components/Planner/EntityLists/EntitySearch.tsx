// React and contexts
// #region

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useSearchParams,
} from 'react-router-dom';

import {
  GenContext,
} from '../../../contexts';

// #endregion

// GraphQL and Apollo
// #region

import { DocumentNode } from 'graphql';
import {
  useLazyQuery, useQuery,
} from '@apollo/client';

// #endregion

// Types
// #region

import {
  EffectGQLResult,
} from '../../../typeDefs/Effect';
import {
  PokemonGQLResult,
} from '../../../typeDefs/Pokemon';
import {
  MovePageResult, MoveSearchResult,
} from '../../../typeDefs/Move';
import { Edge } from '../../../typeDefs/helpers';

// #endregion

type EffectListRender = (effect: EffectGQLResult) => JSX.Element
type MoveListRender = (move: MoveSearchResult) => JSX.Element
type PokemonListRender = (pokemon: PokemonGQLResult) => JSX.Element

type ListRender = EffectListRender | MoveListRender | PokemonListRender;

type EntitySearchProps = {
  query: DocumentNode,
  keyName: string,
  listRender: ListRender,
}

const EntitySearchWithSearchParams = ({
  query,
  keyName,
  listRender,
}: EntitySearchProps) => {

  // Hooks
  const { gen, setGen } = useContext(GenContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // searchBox.ready = false means that we have just navigated to the page. If the URL contains search parameters, then a search will execute based on the searchParams.
  // searchBox.ready = true means that we have modified the search box on the page. The next search will take place based on the search box, rather than the searchParams.
  const [searchBox, setSearchBox] = useState({
    value: searchParams.get('startsWith') || '',
    ready: false,
  })
  const [executeSearch, { data, loading, error }] = useLazyQuery(query);

  // Update search on gen change
  const searched = useRef(false);
  useEffect(() => {
    // If we haven't started a search yet, return to avoid doing it automatically
    if (!searched.current) return;

    // If search button is present, execute search
    if (searchButtonRef.current) searchButtonRef.current.click();
  }, [gen]);

  useEffect(() => {
    // If search button is present and searchBox.ready is false, execute search using searchParams
    if (searchButtonRef.current && searchBox.ready === false) 
    searchButtonRef.current.click();
    setSearchBox({
      ...searchBox,
      ready: false,
    })
  }, [searchParams]);

  // When search button is clicked, execute search based on searchParams and gen.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // We've completed a search, so now we can update search based on gen
    searched.current = true;
    
    // Initialize variables for query
    let queryVariables: {[key: string]: string | number} = {gen: gen}

    // Execute search using value in searchBox
    if (searchBox.ready) {
      setSearchParams({
        ...searchParams,
        startsWith: searchBox.value,
      });

      queryVariables.startsWith = searchBox.value;
      
      // Execute search
      executeSearch({
        variables: {
          ...queryVariables
        }
      })
      
    }
    // Execute search using searchParams
    else {
      searchParams.forEach((value, key) => {
        queryVariables[key] = value;
      });
      
      // Execute search
      executeSearch({
        variables: {
          ...queryVariables
        }
      })
    }
  };


  // Ref so that we can programatically click search button.
  const searchButtonRef = useRef<HTMLButtonElement|null>(null);

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      <div>
        Search
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchBox.value}
            onChange={(e) => {
              setSearchBox({
                value: e.target.value,
                ready: true,
              });
            }}
          />
          <button
            ref={searchButtonRef}
            type="submit"
          >
            OK
          </button>
        </form>
      </div>
      <div className="planner__table planner__table--move">
        {loading 
          ? (<div>Loading...</div>)
          : data && 
            data[keyName].map(listRender)
        }
      </div>
    </>
  );
};

interface EntitySearchOnEntityPageProps {
  listRender: ListRender,
  pageEntityName: string
  query: DocumentNode,
  queryName: string
  searchKeyName: string
}

export const EntitySearchOnEntityPage = ({
  listRender,
  pageEntityName,
  query,
  queryName,
  searchKeyName,
}: EntitySearchOnEntityPageProps) => {

  // Hooks
  const { gen, setGen } = useContext(GenContext);

  // searchBox.ready = false means that we have just navigated to the page. If the URL contains search parameters, then a search will execute based on the searchParams.
  // searchBox.ready = true means that we have modified the search box on the page. The next search will take place based on the search box, rather than the searchParams.
  const [searchBox, setSearchBox] = useState('')
  const { data, loading, error } = useQuery(
    query,
    {
      variables: {
        gen: gen,
        name: pageEntityName,
        startsWith: searchBox,
      }
    }
  );

  if (error) { return (<div>{error.message}</div>)}
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div>
        Search
        <form>
          <input
            type="text"
            value={searchBox}
            onChange={(e) => {
              setSearchBox(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="planner__table planner__table--move">
        {loading 
          ? (<div>Loading...</div>)
          : data && data[queryName][0][searchKeyName].edges &&
            data[queryName][0][searchKeyName].edges.map((edge: any) => {
              return listRender(edge.node);
            })
        }
      </div>
    </>
  );
};

export default EntitySearchWithSearchParams;
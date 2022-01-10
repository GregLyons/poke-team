import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  useLazyQuery,
  gql,
} from '@apollo/client';

import {
  Pokemon,
  PokemonGQLResult,
} from '../../typeDefs/Pokemon';

import { GenContext } from '../../contexts';

const POKEMON_SEARCH_QUERY = gql`
  query PokemonSearchQuery(
    $gen: Int!
    $startsWith: String!
  ) {
    pokemon(
      generation: $gen
      filter: {startsWith: $startsWith}
    ) {
      id

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

      baseStats {
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
      }

      typing {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

type PokemonSearchProps = {
  addToTeam: (pokemon: Pokemon) => void
}

const PokemonSearch = (props: PokemonSearchProps) => {
  const [searchFilter, setSearchFilter] = useState({});
  const [executedSearch, setExecutedSearch] = useState<boolean>(false);

  const [executeSearch, { data }] = useLazyQuery(
    POKEMON_SEARCH_QUERY
  );

  const { gen } = useContext(GenContext);

  useEffect(() => {
    console.log(searchFilter);
    if (executedSearch) {
      executeSearch({
        variables: {
          gen: gen,
          ...searchFilter,
        }
      })
    } 
  }, [gen]);

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter({
            ...searchFilter,
            startsWith: e.target.value,
          })}
        />
        <button
          onClick={() => {
            setExecutedSearch(true); 
            executeSearch({
              variables: {
                gen: gen,
                ...searchFilter,
              }
            })
          }}
        >
          OK
        </button>
      </div>
      {data && 
        data.pokemon.map((pokemon: PokemonGQLResult, idx: number) => (
            <div 
              key={pokemon.id}
              onClick={(e) => {
                e.preventDefault();
                props.addToTeam(new Pokemon(pokemon));
              }}
            >
              {pokemon.name}
            </div>
          )
        )
      }
    </>
  );
};

export default PokemonSearch;
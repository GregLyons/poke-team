import {
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
} from '../../types-queries/Pokemon';
import {
  GenerationNum,
} from '../../types-queries/Generation';

import { CartAction, TeamAction } from '../App';

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
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const PokemonSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: PokemonSearchProps) => {
  const [searchFilter, setSearchFilter] = useState({});
  const [executedSearch, setExecutedSearch] = useState<boolean>(false);

  const [executeSearch, { data }] = useLazyQuery(
    POKEMON_SEARCH_QUERY
  );

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
                dispatchTeam({ type: 'add', payload: new Pokemon(pokemon)});
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
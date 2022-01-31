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
} from '../../types-queries/Planner/Pokemon';
import {
  GenerationNum,
} from '../../types-queries/helpers';
import { CartAction } from '../../hooks/App/Cart';
import { TeamAction } from '../../hooks/App/Team';
import { TierFilter } from '../../hooks/App/TierFilter';

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
      pokemonShowdownID

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
  tierFilter: TierFilter
}

const PokemonSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: PokemonSearchProps) => {
  const [searchFilter, setSearchFilter] = useState({});
  const [executedSearch, setExecutedSearch] = useState<boolean>(false);

  const [executeSearch, { data }] = useLazyQuery(
    POKEMON_SEARCH_QUERY
  );

  useEffect(() => {
    if (executedSearch) {
      executeSearch({
        variables: {
          gen: gen,
          ...searchFilter,
        }
      })
    } 
  }, [gen, executeSearch, executedSearch, searchFilter]);

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
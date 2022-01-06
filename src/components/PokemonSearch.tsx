import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { PokemonGQLResult, Pokemon } from '../typeDefs/Pokemon';

const POKEMON_SEARCH_QUERY = gql`
  query PokemonSearchQuery($filter: String!) {
    pokemon(filter: {startsWith: $filter}) {
      id
      name
      formattedName
      speciesName
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
  addPokemonToTeam: (pokemon: Pokemon) => void
}

const PokemonSearch = (props: PokemonSearchProps) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    POKEMON_SEARCH_QUERY
  );

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
          }
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
                props.addPokemonToTeam(new Pokemon(pokemon));
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
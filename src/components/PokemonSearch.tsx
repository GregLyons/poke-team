import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const POKEMON_SEARCH_QUERY = gql`
  query PokemonSearchQuery($filter: String!) {
    pokemon(filter: {startsWith: $filter}) {
      id
      name
    }
  }
`;

const PokemonSearch = (props) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    POKEMON_SEARCH_QUERY
  );

  const { addPokemonToTeam } = props;

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
        data.pokemon.map(pokemon => (
            <div 
              key={pokemon.id}
              onClick={(e) => {
                e.preventDefault();
                addPokemonToTeam(pokemon);
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
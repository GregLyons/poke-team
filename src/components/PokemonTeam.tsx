import React, { useState } from 'react';

const PokemonTeam = (props) => {
  const { pokemonList } = props;

  return (
    <>
      {
        pokemonList && pokemonList.length > 0 && 
          pokemonList.map(pokemon => (
            <div key={pokemon.id}>
              {pokemon.name}
            </div>
          )
        )
      }
    </>
  );
};

export default PokemonTeam;
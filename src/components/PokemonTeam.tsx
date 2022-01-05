import React, { useState } from 'react';
import { Pokemon } from '../typeDefs/Pokemon';

type props = {
  pokemonList: Pokemon[]
}

const PokemonTeam = (props: props) => {
  const { pokemonList } = props;

  return (
    <>
      {
        pokemonList && pokemonList.length > 0 && 
          pokemonList.map((pokemon: Pokemon, idx: number) => (
            <div key={pokemon.id + '_' + idx}>
              {pokemon.name}
            </div>
          )
        )
      }
    </>
  );
};

export default PokemonTeam;
import React, { useState } from 'react';
import PokemonSearch from './PokemonSearch';
import PokemonTeam from './PokemonTeam';
import { Pokemon } from '../typeDefs/Pokemon';

import './../styles/App.css';

function App() {
  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([]);

  const addPokemonToTeam = (pokemon: Pokemon) => {
    console.log(pokemonTeam);
    if (pokemonTeam.length < 6) setPokemonTeam(
      pokemonTeam.concat(pokemon)
    );
  }

  return (
    <>
      <PokemonSearch 
        addPokemonToTeam={addPokemonToTeam}
      />
      <PokemonTeam 
        pokemonList={pokemonTeam}
      />
    </>
  );
}

export default App;

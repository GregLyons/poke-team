import React, { useState } from 'react';
import PokemonSearch from './PokemonSearch';
import PokemonTeam from './PokemonTeam';

import './../styles/App.css';

function App() {
  const [pokemonTeam, setPokemonTeam] = useState([]);

  const addPokemonToTeam = (pokemon) => {
    console.log(pokemonTeam);
    if (pokemonTeam.length < 6) setPokemonTeam(
      pokemonTeam.concat([{
        id: pokemon.id,
        name: pokemon.name,
      }])
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
